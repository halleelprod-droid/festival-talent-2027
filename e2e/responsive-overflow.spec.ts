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

test.describe("preselection form internal containment", () => {
  test.describe.configure({ timeout: 60_000, retries: 1 });

  test("keeps consent text inside its cards on narrow mobile screens", async ({ page }) => {
    for (const vp of VIEWPORTS.filter(({ w }) => w <= 430 || w === 1440)) {
      await page.setViewportSize({ width: vp.w, height: vp.h });
      await page.goto("/preselections", { waitUntil: "load" });

      const marketingCard = page.getByTestId("consent-marketing-card");
      await marketingCard.waitFor({ state: "visible" });

      const result = await page.evaluate(() => {
        const tolerance = 2;
        const viewportWidth = document.documentElement.clientWidth;
        const inspectCard = (cardTestId: string, textTestId: string) => {
          const card = document.querySelector<HTMLElement>(`[data-testid="${cardTestId}"]`);
          const text = document.querySelector<HTMLElement>(`[data-testid="${textTestId}"]`);
          if (!card || !text) return null;
          const cardRect = card.getBoundingClientRect();
          const textRect = text.getBoundingClientRect();
          const visibleDescendantOutside = Array.from(card.querySelectorAll<HTMLElement>("*")).some((element) => {
            const style = getComputedStyle(element);
            const rect = element.getBoundingClientRect();
            if (style.display === "none" || style.visibility === "hidden" || rect.width === 0 || rect.height === 0) return false;
            return rect.left < cardRect.left - tolerance || rect.right > cardRect.right + tolerance;
          });
          return {
            cardLeft: cardRect.left,
            cardRight: cardRect.right,
            textLeft: textRect.left,
            textRight: textRect.right,
            cardScrollWidth: card.scrollWidth,
            cardClientWidth: card.clientWidth,
            visibleDescendantOutside,
          };
        };
        const portfolio = document.querySelector<HTMLElement>('[data-testid="portfolio-input"]');
        const submit = document.querySelector<HTMLElement>('button[type="submit"]');
        const portfolioRect = portfolio?.getBoundingClientRect();
        const submitRect = submit?.getBoundingClientRect();
        return {
          viewportWidth,
          marketing: inspectCard("consent-marketing-card", "consent-marketing-text"),
          data: inspectCard("consent-data-card", "consent-data-text"),
          portfolioLeft: portfolioRect?.left,
          portfolioRight: portfolioRect?.right,
          submitLeft: submitRect?.left,
          submitRight: submitRect?.right,
        };
      });

      for (const card of [result.marketing, result.data]) {
        expect(card, `consent card exists @ ${vp.w}px`).not.toBeNull();
        expect(card!.textLeft, `consent text left edge @ ${vp.w}px`).toBeGreaterThanOrEqual(card!.cardLeft - 2);
        expect(card!.textRight, `consent text right edge @ ${vp.w}px`).toBeLessThanOrEqual(card!.cardRight + 2);
        expect(card!.cardScrollWidth, `consent card internal scroll @ ${vp.w}px`).toBeLessThanOrEqual(card!.cardClientWidth + 2);
        expect(card!.visibleDescendantOutside, `consent descendant outside card @ ${vp.w}px`).toBe(false);
      }
      expect(result.portfolioLeft, `portfolio input left edge @ ${vp.w}px`).toBeGreaterThanOrEqual(-2);
      expect(result.portfolioRight, `portfolio input right edge @ ${vp.w}px`).toBeLessThanOrEqual(result.viewportWidth + 2);
      expect(result.submitLeft, `submit button left edge @ ${vp.w}px`).toBeGreaterThanOrEqual(-2);
      expect(result.submitRight, `submit button right edge @ ${vp.w}px`).toBeLessThanOrEqual(result.viewportWidth + 2);
    }
  });
});
