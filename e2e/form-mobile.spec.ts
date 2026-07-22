import { expect, test } from "@playwright/test";

// Inscription form at 320px with LONG SYNTHETIC strings (no real candidate data).
// Verifies that long labels, values, errors and consents never break out of the
// viewport. Injects synthetic content into every visible text field, then checks
// for horizontal overflow (page-level and non-decorative element-level).

const LONG_NAME = "Candidat International Extraordinairement Long de Démonstration Locale";
const LONG_EMAIL = "candidat-mobile-extremement-long@example.invalid";
const STABILISE_CSS = `*,*::before,*::after{animation-duration:0s!important;animation-delay:0s!important;transition-duration:0s!important;transition-delay:0s!important}`;

test.describe("inscription form @ 320px (synthetic long strings)", () => {
  test.describe.configure({ timeout: 90_000 });

  test("no overflow with long synthetic input", async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 568 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.addInitScript((css) => {
      const s = document.createElement("style");
      s.textContent = css;
      document.documentElement.appendChild(s);
    }, STABILISE_CSS);
    const response = await page.goto("/preselections", { waitUntil: "domcontentloaded" });
    expect(response).not.toBeNull();
    expect(response!.status()).toBeLessThan(400);
    await page.locator("body").waitFor({ state: "visible" });
    await page.evaluate(async () => {
      await document.fonts?.ready;
      await new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));
    });

    // Fill every visible text-like input / textarea with long synthetic content.
    const inputs = page.locator('input[type="text"], input[type="email"], input[type="tel"], input:not([type]), textarea');
    const count = await inputs.count();
    for (let i = 0; i < count; i++) {
      const el = inputs.nth(i);
      if (!(await el.isVisible().catch(() => false))) continue;
      const type = (await el.getAttribute("type")) ?? "";
      const value = type === "email" ? LONG_EMAIL : LONG_NAME;
      await el.fill(value).catch(() => {});
    }
    await page.evaluate(() => new Promise<void>((resolve) => requestAnimationFrame(() => resolve())));

    const m = await page.evaluate(() => {
      const de = document.documentElement;
      const vw = de.clientWidth;
      const clipped = (el: HTMLElement) => {
        let p = el.parentElement;
        while (p && p !== document.documentElement) {
          const ox = getComputedStyle(p).overflowX;
          if (ox === "hidden" || ox === "clip" || ox === "auto" || ox === "scroll") return true;
          p = p.parentElement;
        }
        return false;
      };
      const offenders: string[] = [];
      for (const el of Array.from(document.body.querySelectorAll<HTMLElement>("*"))) {
        const r = el.getBoundingClientRect();
        if (r.width === 0 || r.height === 0) continue;
        const st = getComputedStyle(el);
        if (st.visibility === "hidden" || st.display === "none") continue;
        if ((el.getAttribute("aria-hidden") === "true" && st.pointerEvents === "none") || clipped(el)) continue;
        if (r.right > vw + 1 || r.left < -1) offenders.push(`${el.tagName.toLowerCase()}.${(el.className || "").toString().slice(0, 50)}`);
      }
      return { scrollWidth: de.scrollWidth, clientWidth: vw, offenders: offenders.slice(0, 10) };
    });

    if (m.offenders.length) console.log("FORM OVERFLOW:", m.offenders.join(" | "));
    expect(m.scrollWidth, "form page horizontal scroll @ 320px").toBeLessThanOrEqual(m.clientWidth + 1);
    expect(m.offenders, "overflowing form elements @ 320px").toHaveLength(0);
  });
});
