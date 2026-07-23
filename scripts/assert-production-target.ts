// Garde-fou de cible PostgreSQL de production. LECTURE SEULE : refuse toute cible
// dangereuse AVANT migration/import. N'affiche jamais l'URL, le mot de passe, ni
// aucune donnée. Sortie = métadonnées masquées + compteurs uniquement.
//
//   PRODUCTION_DATABASE_URL="postgresql://...?sslmode=require" \
//     tsx scripts/assert-production-target.ts
//
// Codes de sortie : 0 = cible production valide ; 1 = refus (raison affichée).

import postgres from "postgres";

const FORBIDDEN_DB_NAMES = new Set([
  "festival_talent_test",
  "festival_talent_dev",
  "festival_talent_restore_test",
]);

function fail(reason: string): never {
  process.stderr.write(`[assert-prod] REFUSED: ${reason}\n`);
  process.exit(1);
}

function maskRef(ref: string): string {
  if (!ref) return "(none)";
  return ref.length <= 4 ? "****" : `${ref.slice(0, 3)}****`;
}

async function main() {
  const raw = (process.env.PRODUCTION_DATABASE_URL ?? "").trim();
  if (!raw) fail("PRODUCTION_DATABASE_URL is not set");

  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    fail("PRODUCTION_DATABASE_URL is not a valid URL");
  }

  const host = url.hostname.toLowerCase();
  const dbName = url.pathname.replace(/^\//, "") || "postgres";
  const sslmode = url.searchParams.get("sslmode");

  // Refus : cible locale.
  if (/^(localhost|127\.0\.0\.1|::1|\[::1\])$/.test(host)) fail("host is local (localhost/127.0.0.1) — not a production database");
  // Refus : bases de test/dev/restore.
  if (FORBIDDEN_DB_NAMES.has(dbName)) fail(`database "${dbName}" is a test/dev/restore database, not production`);
  // Refus : SSL non exigé.
  if (sslmode !== "require" && sslmode !== "verify-full" && sslmode !== "verify-ca") {
    fail("SSL is required for production (add ?sslmode=require to the connection string)");
  }

  // Connexion strictement lecture seule pour l'inspection.
  const sql = postgres(raw, { max: 1, prepare: false, idle_timeout: 5, connect_timeout: 20, onnotice: () => {} });
  try {
    await sql.unsafe("SET default_transaction_read_only = on");
    const [{ ok }] = await sql.unsafe("SELECT 1 AS ok");
    if (ok !== 1) fail("connectivity check failed");

    const [{ db }] = await sql.unsafe("SELECT current_database() AS db");
    const roRow = await sql.unsafe("SHOW default_transaction_read_only");
    const ro = roRow[0].default_transaction_read_only as string;
    const tables = await sql.unsafe(
      "SELECT count(*)::int AS n FROM information_schema.tables WHERE table_schema = 'public' AND table_type = 'BASE TABLE'",
    );
    // État des migrations Drizzle (peut ne pas exister avant la 1re migration).
    let migrations = 0;
    try {
      const m = await sql.unsafe("SELECT count(*)::int AS n FROM drizzle.__drizzle_migrations");
      migrations = m[0].n;
    } catch {
      try {
        const m2 = await sql.unsafe('SELECT count(*)::int AS n FROM "__drizzle_migrations"');
        migrations = m2[0].n;
      } catch {
        migrations = 0;
      }
    }
    const hasLegacy = (await sql.unsafe(
      "SELECT count(*)::int AS n FROM information_schema.tables WHERE table_schema='public' AND table_name='preselections'",
    ))[0].n > 0;

    // Domaine masqué + région déduite de l'hôte (aucune valeur sensible).
    const regionMatch = host.match(/aws-\d+-([a-z0-9-]+)\.pooler\.supabase\.com/);
    const provider = /supabase\.com/.test(host) ? "supabase-postgres" : host.split(".").slice(-2).join(".");

    process.stdout.write(
      JSON.stringify(
        {
          status: "PRODUCTION_TARGET_OK",
          provider,
          region: regionMatch ? regionMatch[1] : "(unknown)",
          database_masked: maskRef(db),
          ssl: sslmode,
          read_only_confirmed: ro === "on",
          public_base_tables: tables[0].n,
          drizzle_migrations_applied: migrations,
          historical_preselections_table_present: hasLegacy,
        },
        null,
        2,
      ) + "\n",
    );
  } finally {
    await sql.end({ timeout: 5 });
  }
}

main().catch((error) => {
  // Message générique : jamais d'URL ni de secret.
  const code = error instanceof Error && /password|authentication/i.test(error.message) ? "authentication_failed" : "connection_error";
  fail(code);
});
