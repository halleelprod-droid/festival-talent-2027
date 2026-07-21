import { readFileSync } from "node:fs";
import { join } from "node:path";
import { expect, test } from "@playwright/test";

// Exhaustive horizontal-overflow detector across every public route (real paths,
// NOT the /fr-prefixed 404s) at the required mobile viewports + desktop controls.
// Uses ONLY public routes and synthetic checks — no candidate data. Animations
// are neutralised for stability (no false positives).

const ROUTES: string[] = JSON.parse(readFileSync(join(__dirname, "routes.public.json"), "utf8"));

const VIEWPORTS = [
  { w: 320, h: 568 },
  { w: 360, h: 640 },
  { w: 375, h: 667 },
  { w: 390, h: 844 },
  { w: 412, h: 915 },
  { w: 430, h: 932 },
  { w: 768, h: 1024 },
  { w: 1024, h: 768 },
  { w: 1440, h: 900 }, // desktop non-regression control
];

const STABILISE_CSS = `*,*::before,*::after{animation-duration:0s!important;animation-delay:0s!important;transition-duration:0s!important;transition-delay:0s!important;scroll-behavior:auto!important}`;

async function collect(page: import("@playwright/test").Page) {
  return page.evaluate(() => {
    const de = document.documentElement;
    const vw = de.clientWidth;
    const clippedByAncestor = (el: HTMLElement) => {
      let p = el.parentElement;
      while (p && p !== document.documentElement) {
        const ox = getComputedStyle(p).overflowX;
        if (ox === "hidden" || ox === "clip" || ox === "auto" || ox === "scroll") return true;
        p = p.parentElement;
      }
      return false;
    };
    const offenders: { tag: string; cls: string; right: number; left: number; scroll: boolean }[] = [];
    for (const el of Array.from(document.body.querySelectorAll<HTMLElement>("*"))) {
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) continue;
      const style = getComputedStyle(el);
      if (style.visibility === "hidden" || style.display === "none") continue;
      const decorative = el.getAttribute("aria-hidden") === "true" && style.pointerEvents === "none";
      if (decorative || clippedByAncestor(el)) continue;
      // Visible element extending beyond the viewport, or scrolling its own content.
      const overflowsViewport = r.right > vw + 1 || r.left < -1;
      const selfScroll = el.scrollWidth > el.clientWidth + 1 && (style.overflowX === "visible");
      if (overflowsViewport || selfScroll) {
        offenders.push({ tag: el.tagName.toLowerCase(), cls: (el.className || "").toString().slice(0, 90), right: Math.round(r.right), left: Math.round(r.left), scroll: selfScroll });
      }
    }
    return { scrollWidth: de.scrollWidth, clientWidth: vw, offenders: offenders.slice(0, 12) };
  });
}

test.describe("no horizontal overflow (all public routes)", () => {
  test.describe.configure({ timeout: 60_000, retries: 1 });
  for (const route of ROUTES) {
    for (const vp of VIEWPORTS) {
      test(`${route} @ ${vp.w}x${vp.h}`, async ({ page }) => {
        await page.setViewportSize({ width: vp.w, height: vp.h });
        await page.addInitScript((css) => {
          const s = document.createElement("style");
          s.textContent = css;
          document.documentElement.appendChild(s);
        }, STABILISE_CSS);
        await page.goto(route, { waitUntil: "load" });
        await page.waitForTimeout(250);

        const m = await collect(page);
        if (m.scrollWidth > m.clientWidth + 1 || m.offenders.length > 0) {
          console.log(`OVERFLOW ${route} @ ${vp.w}: scrollW=${m.scrollWidth} clientW=${m.clientWidth}`);
          for (const o of m.offenders) console.log(`   <${o.tag} class="${o.cls}"> right=${o.right} left=${o.left}${o.scroll ? " [self-scroll]" : ""}`);
        }
        expect(m.scrollWidth, `page horizontal scroll on ${route} @ ${vp.w}px`).toBeLessThanOrEqual(m.clientWidth + 1);
        expect(m.offenders, `overflowing non-decorative elements on ${route} @ ${vp.w}px`).toHaveLength(0);
      });
    }
  }
});
