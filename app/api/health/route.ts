import { NextResponse } from "next/server";
import { sql } from "drizzle-orm";

import { getDb } from "@/src/db";

// Contrôle de santé public et MINIMAL. N'expose jamais : URL de connexion,
// secret, utilisateur base, numéro ou donnée candidat. Uniquement des états.
export const dynamic = "force-dynamic";

export async function GET() {
  let database: "ok" | "unavailable" = "unavailable";
  try {
    await getDb().execute(sql`select 1`);
    database = "ok";
  } catch {
    database = "unavailable";
  }

  // La messagerie est facultative : le site doit fonctionner sans fournisseur SMS.
  const messagingEnabled = process.env.MESSAGING_ENABLED === "true";
  const messagingConfigured = Boolean(
    process.env.TWILIO_ACCOUNT_SID
      && process.env.TWILIO_AUTH_TOKEN
      && (process.env.TWILIO_MESSAGING_SERVICE_SID || process.env.TWILIO_FROM_NUMBER),
  );

  const healthy = database === "ok";

  return NextResponse.json(
    {
      status: healthy ? "ok" : "degraded",
      application: "ok",
      database,
      messaging: { enabled: messagingEnabled, configured: messagingConfigured },
      environment: process.env.VERCEL_ENV ?? "development",
      version: (process.env.VERCEL_GIT_COMMIT_SHA ?? "local").slice(0, 7),
    },
    { status: healthy ? 200 : 503, headers: { "cache-control": "no-store" } },
  );
}
