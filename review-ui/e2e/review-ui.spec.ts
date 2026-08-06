import { expect, test } from "@playwright/test";

import { writeFixtures } from "./fixtures";

// Réinitialise l'état synthétique avant chaque test (le serveur relit le fichier
// à chaque requête). Aucune donnée réelle n'est utilisée.
test.beforeEach(async () => {
  writeFixtures();
});

async function noHorizontalOverflow(page: import("@playwright/test").Page) {
  return page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1);
}

test("dashboard loads and makes no external requests", async ({ page }) => {
  const external: string[] = [];
  page.on("request", (req) => {
    const url = req.url();
    if (!url.startsWith("http://127.0.0.1:4317") && !url.startsWith("data:") && !url.startsWith("blob:")) {
      external.push(url);
    }
  });
  await page.goto("/");
  await expect(page.locator("#stats")).toContainText("total");
  await expect(page.locator("#stats")).toContainText("4");
  expect(external).toEqual([]);
});

test("filter and open a fiche, DOB shows recomputed age, future date warns, mismatch warns", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "DOB manquante" }).click();
  await page.locator("tr.item, .card button").first().click();
  const dob = page.locator("#dobInput");
  await dob.fill("2000-05-15");
  await expect(page.locator('[id=" ageInfo"]')).toContainText("Âge recalculé");
  // Future date -> warning.
  await dob.fill("2040-01-01");
  await expect(page.locator("#dobWarn")).toContainText("future");
  // Age mismatch (legacy 26 vs recomputed ~2) -> warning.
  await dob.fill("2025-01-01");
  await expect(page.locator("#dobWarn")).toContainText("age_mismatch");
});

test("saving a DOB persists and updates the dashboard", async ({ page }) => {
  await page.goto("/");
  await page.locator("tr.item, .card button").first().click();
  await page.locator("#dobInput").fill("2000-05-15");
  await page.locator("#decision").selectOption("approved");
  await page.locator("#saveOnly").click();
  await expect(page.locator("#saveStatus")).toContainText("Sauvegarde réussie");
  // Reload and confirm the value persisted (validDob increased).
  await page.reload();
  await page.getByRole("tab", { name: "Validation" }).click();
  await page.locator("#btnValidate").click();
  await expect(page.locator("#validationOut")).toContainText('"validDob": 1');
});

test("duplicate group decision can be applied", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("tab", { name: "Doublons" }).click();
  await expect(page.locator(".dupgroup")).toHaveCount(1);
  await page.locator("#dupdec_DUP-0001").selectOption("distinct_people");
  await page.locator("#dupapply_DUP-0001").click();
  await expect(page.locator("#saveStatus")).toContainText("Sauvegarde réussie");
});

test("validation shows counters and import-ready stays disabled while blocked", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("tab", { name: "Validation" }).click();
  await page.locator("#btnValidate").click();
  await expect(page.locator("#validationOut")).toContainText("pendingDob");
  await expect(page.locator("#btnImportReady")).toBeDisabled();
});

test("no horizontal overflow at 320px and 1440px", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 720 });
  await page.goto("/");
  expect(await noHorizontalOverflow(page)).toBe(true);
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  expect(await noHorizontalOverflow(page)).toBe(true);
});
