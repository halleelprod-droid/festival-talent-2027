import { expect, test } from "@playwright/test";

test("museum page renders all exhibition sections", async ({ page }) => {
  await page.goto("/museum");

  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    /museum/i
  );

  for (const section of [
    "Frise chronologique",
    "Affiches officielles",
    "Galerie photos",
    /Trophees & distinctions/i,
    "Videos",
  ]) {
    await expect(page.getByText(section).first()).toBeAttached();
  }

  await expect(
    page.getByRole("link", { name: /hall of fame/i }).first()
  ).toBeAttached();
});
