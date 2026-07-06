import { expect, test } from "@playwright/test";

const passNames = [
  "Pass Standard",
  "Pass Premium",
  "Pass VIP",
  "Pass Partenaire",
  "Pass Presse",
  "Pass Staff",
  "Pass Artiste",
  "Pass Backstage",
];

test("tickets page renders hero and the 8 passes", async ({ page }) => {
  await page.goto("/tickets");

  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    /tickets/i
  );

  for (const name of passNames) {
    await expect(page.getByText(name).first()).toBeVisible();
  }
});

test("tickets page clearly states no real payment is connected", async ({
  page,
}) => {
  await page.goto("/tickets");

  await expect(page.getByText(/aucun paiement/i).first()).toBeVisible();
  await expect(
    page.getByText(/QR Code officiel sera généré/i).first()
  ).toBeVisible();
});

test("/billetterie redirects to /tickets", async ({ page }) => {
  await page.goto("/billetterie");
  await expect(page).toHaveURL(/\/tickets$/);
});
