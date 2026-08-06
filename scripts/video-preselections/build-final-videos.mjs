/**
 * Chaîne de post-production : WebM brut -> MP4 finaux (1080x1920, H.264, 30 fps).
 *
 * - calcule automatiquement le tempo pour viser une durée cible (25-45 s) ;
 * - conserve les proportions du site (bandes noires latérales, aucun étirement) ;
 * - produit la version principale et la version influenceurs ;
 * - vérifie le résultat avec ffprobe et écrit un rapport.
 *
 * Usage :
 *   node scripts/video-preselections/build-final-videos.mjs
 *   FT_TARGET_SECONDS=38 node scripts/video-preselections/build-final-videos.mjs
 */

import { execFileSync } from "node:child_process";
import { existsSync, writeFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const OUT = join("artifacts", "preselections-video");
const RAW = join(OUT, "raw", "mobile-registration-raw.webm");
const MAIN = join(OUT, "festival-talent-inscription-mobile.mp4");
const INFLU = join(OUT, "festival-talent-inscription-influenceurs.mp4");
const ENDCARD = join(OUT, "endcard.png");

const TARGET = Number(process.env.FT_TARGET_SECONDS ?? 38);
const ENDCARD_SECONDS = 3;

// ------------------------------------------------------- localisation ffmpeg
function findBinary(name) {
  const local = process.env.LOCALAPPDATA;
  if (local) {
    const base = join(local, "Microsoft", "WinGet", "Packages");
    if (existsSync(base)) {
      for (const dir of readdirSync(base)) {
        if (!/ffmpeg/i.test(dir)) continue;
        const pkg = join(base, dir);
        for (const sub of readdirSync(pkg)) {
          const candidate = join(pkg, sub, "bin", `${name}.exe`);
          if (existsSync(candidate)) return candidate;
        }
      }
    }
  }
  return name; // suppose présent sur le PATH
}

const FFMPEG = process.env.FFMPEG_PATH ?? findBinary("ffmpeg");
const FFPROBE = process.env.FFPROBE_PATH ?? findBinary("ffprobe");

const run = (bin, args) => execFileSync(bin, args, { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });

function probe(file, entries) {
  return run(FFPROBE, [
    "-v", "error",
    "-select_streams", "v:0",
    "-show_entries", entries,
    "-of", "default=noprint_wrappers=1:nokey=0",
    file,
  ]).trim();
}

if (!existsSync(RAW)) {
  throw new Error(`Vidéo brute introuvable : ${RAW} — lancez d'abord record-mobile-registration.mjs`);
}

// ------------------------------------------------------- tempo automatique
const rawDuration = Number(
  run(FFPROBE, ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", RAW]).trim(),
);
let speed = rawDuration / TARGET;
speed = Math.min(2.0, Math.max(1.0, speed)); // garde un rendu naturel
const finalDuration = rawDuration / speed;

console.log(`[build] brut ${rawDuration.toFixed(2)}s -> tempo x${speed.toFixed(2)} -> ${finalDuration.toFixed(2)}s`);

// Mise à l'échelle sans déformation : hauteur 1920, largeur paire automatique,
// puis remplissage centré jusqu'à 1080x1920 (bandes noires latérales).
const SCALE_PAD = "scale=-2:1920:flags=lanczos,pad=1080:1920:(ow-iw)/2:(oh-ih)/2:black,setsar=1";
const X264 = [
  "-c:v", "libx264",
  "-profile:v", "high",
  "-level", "4.1",
  "-pix_fmt", "yuv420p",
  "-crf", "20",
  "-preset", "slow",
  "-movflags", "+faststart",
  "-an",
];

// ------------------------------------------------------- version principale
run(FFMPEG, [
  "-y", "-hide_banner", "-loglevel", "error",
  "-i", RAW,
  "-vf", `setpts=PTS/${speed.toFixed(4)},${SCALE_PAD},fps=30`,
  ...X264,
  MAIN,
]);
console.log("[build] version principale :", MAIN);

// ------------------------------------------------------- version influenceurs
if (existsSync(ENDCARD)) {
  run(FFMPEG, [
    "-y", "-hide_banner", "-loglevel", "error",
    "-i", MAIN,
    "-loop", "1", "-t", String(ENDCARD_SECONDS), "-i", ENDCARD,
    "-filter_complex",
    "[1:v]scale=1080:1920,fps=30,setsar=1,format=yuv420p[ec];" +
      "[0:v]setsar=1,format=yuv420p[mv];[mv][ec]concat=n=2:v=1:a=0[v]",
    "-map", "[v]",
    ...X264,
    INFLU,
  ]);
  console.log("[build] version influenceurs :", INFLU);
} else {
  console.warn("[build] endcard.png absent — version influenceurs ignorée (make-endcard.mjs)");
}

// ------------------------------------------------------- vérifications
const checks = {};
for (const [label, file] of [["principale", MAIN], ["influenceurs", INFLU]]) {
  if (!existsSync(file)) continue;
  const info = Object.fromEntries(
    probe(file, "stream=codec_name,profile,level,width,height,pix_fmt,r_frame_rate")
      .split(/\r?\n/)
      .filter(Boolean)
      .map((l) => l.split("=").map((part) => part.trim())),
  );
  const duration = Number(
    run(FFPROBE, ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", file]).trim(),
  );
  const audio = run(FFPROBE, ["-v", "error", "-select_streams", "a", "-show_entries", "stream=codec_name", "-of", "csv=p=0", file]).trim();
  checks[label] = {
    file,
    ...info,
    duration: Number(duration.toFixed(2)),
    hasAudio: audio.length > 0,
    conforme:
      info.codec_name === "h264" &&
      info.width === "1080" &&
      info.height === "1920" &&
      info.pix_fmt === "yuv420p" &&
      info.r_frame_rate === "30/1",
  };
}

writeFileSync(join(OUT, "video-verification.json"), JSON.stringify({ rawDuration, speed, checks }, null, 2));
console.log(JSON.stringify(checks, null, 2));
