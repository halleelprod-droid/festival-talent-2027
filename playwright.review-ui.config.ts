import { defineConfig, devices } from "@playwright/test";

import { REVIEW_FILE, SOURCE_FILE, writeFixtures } from "./review-ui/e2e/fixtures";

// Écrit les fixtures synthétiques avant le démarrage du serveur local.
writeFixtures();

// Configuration dédiée à l'interface locale de revue. Indépendante du site
// Next : elle démarre uniquement le serveur local privé sur 127.0.0.1:4317 avec
// des données SYNTHÉTIQUES. Le vrai CSV n'est jamais utilisé ici.
export default defineConfig({
  testDir: "./review-ui/e2e",
  fullyParallel: false,
  workers: 1,
  retries: 0,
  reporter: "list",
  use: {
    baseURL: "http://127.0.0.1:4317",
    trace: "retain-on-failure",
    navigationTimeout: 30_000,
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: "tsx scripts/preselection-review-server.ts",
    url: "http://127.0.0.1:4317",
    reuseExistingServer: true,
    timeout: 60_000,
    env: {
      PRESELECTION_REVIEW_FILE: REVIEW_FILE,
      PRESELECTION_SOURCE_FILE: SOURCE_FILE,
      NODE_ENV: "development",
    },
  },
});
