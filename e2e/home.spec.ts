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
  await expect(page.getByRole("navigation")).toBeVisible();
  await expect(
    page.getByRole("link", { name: /réserver/i }).first()
  ).toBeVisible();
});
