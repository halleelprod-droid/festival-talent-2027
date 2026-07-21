import { expect, test } from "@playwright/test";

// Horizontal-overflow detector across the required mobile viewports + a desktop
// non-regression control. Uses ONLY public French routes and synthetic checks —
// no candidate data. Animations are neutralised for stability (no false positives).

const VIEWPORTS = [
  { w: 320, h: 568 },
  { w: 360, h: 640 },
  { w: 375, h: 667 },
  { w: 390, h: 844 },
  { w: 412, h: 915 },
  { w: 430, h: 932 },
  { w: 768, h: 1024 },
  { w: 1440, h: 900 }, // desktop non-regression control
];

// Core public routes (French). Admin is checked separately with synthetic data.
const ROUTES = [
  "/fr",
  "/fr/candidat",
  "/fr/programme",
  "/fr/artists",
  "/fr/institution/partenaires",
  "/fr/institution/gouvernance",
  "/fr/billetterie",
  "/fr/contact",
  "/fr/media",
  "/fr/mentors",
];

const STABILISE_CSS = `*,*::before,*::after{animation-duration:0s!important;animation-delay:0s!important;transition-duration:0s!important;transition-delay:0s!important;scroll-behavior:auto!important}`;

test.describe("no horizontal overflow", () => {
  for (const route of ROUTES) {
    for (const vp of VIEWPORTS) {
      test(`${route} @ ${vp.w}x${vp.h}`, async ({ page }) => {
        await page.setViewportSize({ width: vp.w, height: vp.h });
        await page.addInitScript((css) => {
          const s = document.createElement("style");
          s.textContent = css;
          document.documentElement.appendChild(s);
        }, STABILISE_CSS);
        await page.goto(route, { waitUntil: "networkidle" });

        // Page-level horizontal scroll is the hard failure.
        const metrics = await page.evaluate(() => {
          const de = document.documentElement;
          const vw = de.clientWidth;
          // An element is not a *visible* overflow if an ancestor clips the x axis
          // (overflow-x hidden/clip/auto/scroll) — e.g. intentional marquees/carousels.
          const clippedByAncestor = (el: HTMLElement) => {
            let p = el.parentElement;
            while (p && p !== document.documentElement) {
              const ox = getComputedStyle(p).overflowX;
              if (ox === "hidden" || ox === "clip" || ox === "auto" || ox === "scroll") return true;
              p = p.parentElement;
            }
            return false;
          };
          const offenders: { tag: string; cls: string; right: number; left: number }[] = [];
          for (const el of Array.from(document.body.querySelectorAll<HTMLElement>("*"))) {
            const r = el.getBoundingClientRect();
            if (r.width === 0 || r.height === 0) continue;
            const style = getComputedStyle(el);
            if (style.visibility === "hidden" || style.display === "none") continue;
            // Ignore marked decorations and anything an ancestor actually clips.
            const decorative = el.getAttribute("aria-hidden") === "true" && style.pointerEvents === "none";
            if (decorative || clippedByAncestor(el)) continue;
            if (r.right > vw + 1 || r.left < -1) {
              offenders.push({ tag: el.tagName.toLowerCase(), cls: (el.className || "").toString().slice(0, 80), right: Math.round(r.right), left: Math.round(r.left) });
            }
          }
          return { scrollWidth: de.scrollWidth, clientWidth: vw, offenders: offenders.slice(0, 10) };
        });

        if (metrics.scrollWidth > metrics.clientWidth + 1 || metrics.offenders.length > 0) {
          console.log(`OVERFLOW ${route} @ ${vp.w}: scrollW=${metrics.scrollWidth} clientW=${metrics.clientWidth}`);
          for (const o of metrics.offenders) console.log(`   <${o.tag} class="${o.cls}"> right=${o.right} left=${o.left}`);
        }
        expect(metrics.scrollWidth, `horizontal scroll on ${route} @ ${vp.w}px`).toBeLessThanOrEqual(metrics.clientWidth + 1);
        expect(metrics.offenders, `overflowing non-decorative elements on ${route} @ ${vp.w}px`).toHaveLength(0);
      });
    }
  }
});
