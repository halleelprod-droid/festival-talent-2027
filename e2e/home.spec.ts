import { expect, test } from "@playwright/test";

test("redirects the root to the French home page", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL(/\/fr$/);
});

test("home page renders the hero and primary navigation", async ({ page }) => {
  await page.goto("/fr");

  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Révélons"
  );
  // The page has multiple <nav> landmarks (header + footer); assert the primary
  // (header) navigation is visible rather than the ambiguous multi-match.
  await expect(page.getByRole("navigation").first()).toBeVisible();
  await expect(
    page.getByRole("link", { name: /réserver/i }).first()
  ).toBeVisible();
});
