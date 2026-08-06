import { expect, test } from "@playwright/test";

// Synthetic, unauthenticated checks only. No real administrator identity or
// credential is used, and the local database remains read-only from this test.
test.describe("local admin access", () => {
  test("redirects an unauthenticated dashboard request to the login page", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/admin", { waitUntil: "domcontentloaded" });
    await expect(page).toHaveURL(/\/admin\/login/);
    await expect(page.getByRole("heading", { name: "Administration" })).toBeVisible();
  });

  test("keeps the login form usable without horizontal overflow", async ({ page }) => {
    for (const viewport of [
      { width: 320, height: 568 },
      { width: 390, height: 844 },
      { width: 1440, height: 900 },
    ]) {
      await page.setViewportSize(viewport);
      const response = await page.goto("/admin/login", { waitUntil: "domcontentloaded" });
      expect(response?.status()).toBeLessThan(400);
      await expect(page.getByLabel("Email")).toBeVisible();
      await expect(page.getByLabel("Mot de passe")).toBeVisible();
      await expect(page.getByRole("button", { name: "Se connecter" })).toBeVisible();

      const metrics = await page.evaluate(() => ({
        clientWidth: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth,
      }));
      expect(metrics.scrollWidth).toBeLessThanOrEqual(metrics.clientWidth + 1);
    }
  });
});
