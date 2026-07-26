/**
 * Enregistrement vidéo mobile — simulation d'inscription aux présélections.
 *
 * SÉCURITÉ (non négociable) :
 *  - la requête finale POST /api/preselections est INTERCEPTÉE et n'atteint
 *    JAMAIS le serveur ; une réponse 201 simulée est renvoyée au frontend ;
 *  - toute autre requête mutante (POST/PUT/PATCH/DELETE) est ABORTÉE ;
 *  - seules les requêtes GET/HEAD (consultation, assets) passent ;
 *  - aucune donnée réelle, aucun SMS, aucun e-mail, aucune écriture en base.
 *
 * Usage :
 *   node scripts/video-preselections/record-mobile-registration.mjs
 *   FT_VIDEO_BASE_URL=http://localhost:3000 node scripts/...mjs
 */

import { chromium } from "@playwright/test";
import { mkdirSync, writeFileSync, renameSync } from "node:fs";
import { join } from "node:path";

const BASE = process.env.FT_VIDEO_BASE_URL ?? "https://festivaltalentofficial.com";
const OUT = join("artifacts", "preselections-video");
const SHOTS = join(OUT, "screenshots");
const RAW = join(OUT, "raw");

mkdirSync(SHOTS, { recursive: true });
mkdirSync(RAW, { recursive: true });

// ---------------------------------------------------------------- données de démo
// Données 100 % fictives. Ne doivent jamais servir à créer un vrai candidat.
const DEMO = {
  fullName: "Awa Démonstration",
  phone: "770000000",
  email: "demo-preselection@example.com",
  city: "Dakar",
  dateOfBirth: "2002-05-15",
  discipline: "Danse",
  // Le formulaire réel n'a pas de champ « Niveau » : il est intégré ici.
  experience:
    "Niveau : Intermédiaire. Je participe à cette simulation pour présenter le parcours d'inscription au Festival Talent 2027.",
};

// ---------------------------------------------------------------- utilitaires
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const rand = (a, b) => Math.round(a + Math.random() * (b - a));
const log = (...a) => console.log("[video]", ...a);

let shotIndex = 0;
async function shot(page, name) {
  shotIndex += 1;
  const file = join(SHOTS, `${String(shotIndex).padStart(2, "0")}-${name}.png`);
  await page.screenshot({ path: file });
  return file;
}

/** Défilement progressif, d'aspect humain. */
async function smoothScroll(page, distance, steps = 14, delay = 50) {
  const step = Math.round(distance / steps);
  for (let i = 0; i < steps; i += 1) {
    await page.mouse.wheel(0, step);
    await sleep(delay);
  }
}

/** Saisie caractère par caractère, avec mise en évidence du champ. */
async function typeInto(locator, text, delay = 45) {
  await locator.scrollIntoViewIfNeeded();
  await sleep(rand(250, 450));
  await locator.click();
  await sleep(rand(150, 300));
  await locator.pressSequentially(text, { delay });
  await sleep(rand(300, 550));
}

// ---------------------------------------------------------------- exécution
const blockedRequests = [];
const consoleErrors = [];
let simulatedSubmission = false;

const browser = await chromium.launch({ headless: true });

const context = await browser.newContext({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
  isMobile: true,
  hasTouch: true,
  reducedMotion: "no-preference",
  locale: "fr-FR",
  timezoneId: "Africa/Dakar",
  userAgent:
    "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1",
  // IMPORTANT : la taille vidéo doit être égale au viewport CSS. Playwright
  // capture l'écran en pixels CSS et ne redimensionne pas la page : une taille
  // supérieure produirait une page collée en haut à gauche sur fond gris.
  // La montée en 1080x1920 est faite ensuite par FFmpeg.
  recordVideo: { dir: RAW, size: { width: 390, height: 844 } },
});

// ------------------------------------------------- filet de sécurité réseau
await context.route("**/*", async (route) => {
  const request = route.request();
  const method = request.method();
  const url = request.url();

  // Lecture seule : les GET/HEAD (pages, assets, polices) passent normalement.
  if (method === "GET" || method === "HEAD") {
    return route.continue();
  }

  // Requête finale d'inscription : simulée, JAMAIS transmise au serveur.
  if (method === "POST" && /\/api\/preselections\b/.test(url)) {
    simulatedSubmission = true;
    blockedRequests.push({
      outcome: "SIMULATED_201_NOT_SENT",
      method,
      url,
      at: new Date().toISOString(),
    });
    return route.fulfill({
      status: 201,
      contentType: "application/json",
      body: JSON.stringify({
        ok: true,
        simulated: true,
        message: "Inscription simulée — aucune donnée enregistrée.",
      }),
    });
  }

  // Toute autre requête mutante est bloquée par précaution.
  blockedRequests.push({
    outcome: "ABORTED",
    method,
    url,
    at: new Date().toISOString(),
  });
  return route.abort();
});

// ------------------------------------------------- curseur tactile (ripple)
await context.addInitScript(() => {
  const draw = (x, y) => {
    const dot = document.createElement("div");
    dot.style.cssText = [
      "position:fixed",
      `left:${x}px`,
      `top:${y}px`,
      "width:46px",
      "height:46px",
      "margin:-23px 0 0 -23px",
      "border-radius:50%",
      "background:rgba(255,255,255,0.28)",
      "border:2px solid rgba(255,206,64,0.95)",
      "box-shadow:0 0 14px rgba(255,206,64,0.55)",
      "pointer-events:none",
      "z-index:2147483647",
      "transform:scale(0.35)",
      "opacity:1",
      "transition:transform .45s ease-out,opacity .45s ease-out",
    ].join(";");
    document.documentElement.appendChild(dot);
    requestAnimationFrame(() => {
      dot.style.transform = "scale(1.3)";
      dot.style.opacity = "0";
    });
    setTimeout(() => dot.remove(), 520);
  };
  window.addEventListener("pointerdown", (e) => draw(e.clientX, e.clientY), true);
});

const page = await context.newPage();
page.on("console", (m) => {
  if (m.type() === "error") consoleErrors.push(m.text());
});
page.on("pageerror", (e) => consoleErrors.push(String(e)));

const video = page.video();

try {
  // 1 — Accueil
  log("ouverture de l'accueil");
  await page.goto(`${BASE}/fr`, { waitUntil: "domcontentloaded", timeout: 60000 });
  // Laisse le loader d'intro se terminer (ouverture cinématique).
  await page
    .waitForFunction(() => !/Loading Experience/i.test(document.body.innerText), { timeout: 15000 })
    .catch(() => log("loader d'intro : délai dépassé, on continue"));
  await sleep(1600);
  await shot(page, "accueil");

  // 2 — Petit défilement de découverte
  await smoothScroll(page, 750);
  await sleep(650);
  await smoothScroll(page, -750, 8, 35);
  await sleep(450);

  // 3 — Ouverture du menu mobile puis navigation vers les présélections
  log("ouverture du menu mobile");
  const burger = page.getByRole("button", { name: /ouvrir le menu/i }).first();
  if (await burger.isVisible().catch(() => false)) {
    await burger.click();
    await sleep(rand(800, 1100));
    await shot(page, "menu-mobile");
  }

  const preselLink = page.locator('a[href="/preselections"]:visible').first();
  await preselLink.scrollIntoViewIfNeeded().catch(() => {});
  await sleep(rand(400, 700));
  await preselLink.click();

  await page.waitForURL(/\/preselections/, { timeout: 30000 });
  await page.waitForLoadState("domcontentloaded");
  await sleep(rand(1200, 1600));
  await shot(page, "page-preselections");

  // 4 — Pause sur le titre, puis appel à l'action
  await smoothScroll(page, 700);
  await sleep(1100);

  const cta = page.locator('a[href="#formulaire-preselections"]').first();
  await cta.scrollIntoViewIfNeeded();
  await sleep(rand(500, 800));
  await cta.click();
  await sleep(1400);
  await shot(page, "formulaire");

  // 5 — Remplissage progressif
  log("remplissage du formulaire");
  await typeInto(page.locator("#ft-full_name"), DEMO.fullName);
  await typeInto(page.locator("#ft-phone"), DEMO.phone);
  await typeInto(page.locator("#ft-email"), DEMO.email);

  // Champ date : remplissage direct (la frappe caractère par caractère
  // n'est pas fiable sur un input[type=date]).
  const dob = page.locator("#ft-dateOfBirth");
  await dob.scrollIntoViewIfNeeded();
  await sleep(rand(300, 500));
  await dob.click();
  await dob.fill(DEMO.dateOfBirth);
  await sleep(rand(500, 800));

  await typeInto(page.locator("#ft-city"), DEMO.city);

  // Discipline
  const discipline = page.locator("#ft-discipline");
  await discipline.scrollIntoViewIfNeeded();
  await sleep(rand(400, 650));
  await discipline.selectOption(DEMO.discipline);
  await sleep(rand(600, 900));
  await shot(page, "discipline");

  await typeInto(page.locator("#ft-experience"), DEMO.experience, 22);

  // 6 — Consentements
  log("consentements");
  const consentMarketing = page.locator("#ft-message-consent");
  await consentMarketing.scrollIntoViewIfNeeded();
  await sleep(rand(500, 800));
  await consentMarketing.check();
  await sleep(rand(450, 700));

  const consentData = page.locator("#ft-privacy-consent");
  await consentData.scrollIntoViewIfNeeded();
  await sleep(rand(350, 600));
  await consentData.check();
  await sleep(rand(700, 1000));
  await shot(page, "consentements");

  // 7 — Garde-fous avant envoi
  const honeypot = await page.locator("#ft-website").inputValue();
  if (honeypot !== "") throw new Error("Honeypot non vide — envoi annulé.");

  // 8 — Envoi (intercepté)
  log("clic sur envoyer (requête interceptée)");
  const submit = page.locator('form button[type="submit"]');
  await submit.scrollIntoViewIfNeeded();
  await sleep(rand(700, 1000));
  await submit.click();

  // 9 — Confirmation simulée
  const success = page.locator('p[role="status"]');
  await success.waitFor({ state: "visible", timeout: 20000 });
  await success.scrollIntoViewIfNeeded();
  await sleep(400);
  await shot(page, "confirmation");
  const successText = (await success.textContent())?.trim() ?? "";
  log("confirmation affichée :", successText);

  // 10 — Pause finale
  await sleep(3000);

  writeFileSync(
    join(OUT, "run-report.json"),
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        baseUrl: BASE,
        simulationOnly: true,
        realSubmissionSent: false,
        simulatedSubmissionIntercepted: simulatedSubmission,
        confirmationText: successText,
        demoDataIsFictional: true,
        blockedRequests,
        consoleErrors,
      },
      null,
      2,
    ),
  );
  writeFileSync(join(OUT, "blocked-requests.json"), JSON.stringify(blockedRequests, null, 2));
} finally {
  await page.close();
  await context.close();
  await browser.close();
}

// Renomme la vidéo brute avec un nom stable.
const rawPath = await video.path();
const stable = join(RAW, "mobile-registration-raw.webm");
try {
  renameSync(rawPath, stable);
} catch {
  /* déjà nommée */
}

log("vidéo brute :", stable);
log("requêtes mutantes interceptées :", blockedRequests.length);
log("envoi réel au serveur : NON");
