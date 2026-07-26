/**
 * Génère l'écran final (1080x1920) de la version influenceurs.
 * Aucun réseau, aucun contenu protégé : rendu local en HTML puis capture.
 */
import { chromium } from "@playwright/test";
import { mkdirSync } from "node:fs";
import { join } from "node:path";

const OUT = join("artifacts", "preselections-video");
mkdirSync(OUT, { recursive: true });

const HANDLE = process.env.FT_INFLUENCER_HANDLE ?? "@nom_influenceur";

const html = `<!doctype html><html lang="fr"><head><meta charset="utf-8">
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body {
    width:1080px; height:1920px; background:#000; color:#fff;
    font-family:"Segoe UI",Inter,system-ui,-apple-system,sans-serif;
    display:flex; flex-direction:column; align-items:center; justify-content:center;
    text-align:center; padding:0 90px; position:relative; overflow:hidden;
  }
  .glow { position:absolute; inset:0;
    background:radial-gradient(circle at 50% 32%, rgba(212,175,55,.20), transparent 55%); }
  .wrap { position:relative; z-index:1; width:100%; }
  .dot { width:22px; height:22px; border-radius:50%; background:#C9A84C; margin:0 auto 34px; }
  .brand { font-size:40px; font-weight:900; letter-spacing:.34em; color:#fff; margin-bottom:70px; }
  .eyebrow { font-size:27px; font-weight:900; letter-spacing:.3em; color:#E8C766; margin-bottom:44px; }
  h1 { font-size:96px; line-height:1.08; font-weight:900; text-transform:uppercase; letter-spacing:.01em; }
  h1 .gold { background:linear-gradient(90deg,#F5D976,#C9A84C 60%,#9A7B2E);
    -webkit-background-clip:text; background-clip:text; color:transparent; display:block; }
  .rule { width:190px; height:5px; border-radius:99px;
    background:linear-gradient(90deg,#F5D976,#C9A84C); margin:66px auto 60px; }
  .site { font-size:44px; font-weight:800; color:#F0DFA6; letter-spacing:.03em; }
  .shared { position:absolute; bottom:150px; left:0; right:0; z-index:1;
    font-size:32px; color:rgba(255,255,255,.62); letter-spacing:.12em; }
  .shared b { color:#E8C766; font-weight:800; }
</style></head><body>
  <div class="glow"></div>
  <div class="wrap">
    <div class="dot"></div>
    <div class="brand">FT2027</div>
    <div class="eyebrow">FESTIVAL TALENT 2027</div>
    <h1>Inscris-toi aux<span class="gold">présélections</span></h1>
    <div class="rule"></div>
    <div class="site">festivaltalentofficial.com/fr</div>
  </div>
  <div class="shared">Partagé par <b>${HANDLE}</b></div>
</body></html>`;

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
await page.setContent(html, { waitUntil: "load" });
await page.screenshot({ path: join(OUT, "endcard.png") });
await browser.close();
console.log("[endcard] généré :", join(OUT, "endcard.png"));
