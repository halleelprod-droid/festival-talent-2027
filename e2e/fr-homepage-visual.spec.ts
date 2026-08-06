import { mkdirSync } from "node:fs";
import { join } from "node:path";
import { expect, test, type Page } from "@playwright/test";

// Audit visuel de /fr : captures réelles (mode reduced-motion pour un rendu
// complet et stable) + contrôles d'intégrité. Deux passes : rendu réel visible
// et prefers-reduced-motion. Aucune donnée personnelle.

const OUT = join(process.cwd(), "test-results", "visual-audit", "fr");
mkdirSync(OUT, { recursive: true });

const VIEWPORTS = [
  { name: "mobile-320", w: 320, h: 568 },
  { name: "mobile-390", w: 390, h: 844 },
  { name: "mobile-430", w: 430, h: 932 },
  { name: "tablet-768", w: 768, h: 1024 },
  { name: "desktop-1440", w: 1440, h: 900 },
  { name: "desktop-1920", w: 1920, h: 1080 },
];

const SECTIONS: { id: string; label: string }[] = [
  { id: "featured-artist-title", label: "samba" },
  { id: "samba-journey-title", label: "parcours" },
  { id: "villa-title", label: "villa" },
  { id: "legacy-title", label: "dip" },
  { id: "editions-title", label: "editions" },
];

// Force le contenu animé (whileInView) à l'état visible pour des captures
// complètes fiables, sans dépendre du scroll. N'affecte que la capture.
const REVEAL_CSS = `*{animation:none!important;transition:none!important}
[style*="opacity"],[style*="transform"]{opacity:1!important;transform:none!important}`;

async function prepare(page: Page) {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.addStyleTag({ content: REVEAL_CSS });
  await page.evaluate(async () => {
    await (document as Document & { fonts?: FontFaceSet }).fonts?.ready;
    await new Promise<void>((r) => requestAnimationFrame(() => requestAnimationFrame(() => r())));
  });
}

test.describe("visual audit /fr", () => {
  test.describe.configure({ mode: "serial", timeout: 120_000 });

  for (const vp of VIEWPORTS) {
    test(`captures @ ${vp.name}`, async ({ page }) => {
      await page.setViewportSize({ width: vp.w, height: vp.h });
      await page.goto("/fr", { waitUntil: "load" });
      await prepare(page);

      // Capture pleine page.
      await page.screenshot({ path: join(OUT, `${vp.name}-full.png`), fullPage: true });

      // Pas de scroll horizontal.
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(overflow, `overflow horizontal @ ${vp.w}px`).toBeLessThanOrEqual(1);

      // Sections clés visibles + captures ciblées (au viewport le plus étroit et desktop).
      if (vp.name === "mobile-390" || vp.name === "desktop-1440") {
        for (const s of SECTIONS) {
          const el = page.locator(`[aria-labelledby="${s.id}"]`);
          await expect(el, `section ${s.label} présente`).toHaveCount(1);
          await el.scrollIntoViewIfNeeded();
          await el.screenshot({ path: join(OUT, `${vp.name}-${s.label}.png`) });
        }
      }
    });
  }

  test("reduced-motion : aucun contenu clé bloqué à l'état invisible", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/fr", { waitUntil: "load" });
    for (const s of SECTIONS) {
      const title = page.locator(`#${s.id}`);
      await title.scrollIntoViewIfNeeded();
      await expect(title, `titre ${s.label} visible`).toBeVisible();
      const opacity = await title.evaluate((n) => Number(getComputedStyle(n).opacity));
      expect(opacity, `opacité titre ${s.label}`).toBeGreaterThan(0.9);
    }
  });

  test("CTA programmation présent et cliquable", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/fr", { waitUntil: "load" });
    await prepare(page);
    const cta = page.locator('a[href="#programme"]').first();
    await expect(cta).toBeVisible();
    await cta.click();
    await expect(page.locator("#programme")).toBeVisible();
  });

  test("aucune image sans dimensions dans les nouvelles sections", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/fr", { waitUntil: "load" });
    await prepare(page);
    const bad = await page.evaluate(() =>
      [...document.querySelectorAll('section[aria-labelledby] img')]
        .filter((img) => { const r = img.getBoundingClientRect(); return r.width === 0 || r.height === 0; }).length,
    );
    expect(bad, "images à dimension nulle").toBe(0);
  });
});
