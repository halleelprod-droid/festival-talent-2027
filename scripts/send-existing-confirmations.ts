// Campagne historique séparée du flux temps réel.
// DRY-RUN par défaut ; aucun fournisseur sans --execute --confirm-send et
// MESSAGING_ENABLED=true. Les sorties contiennent uniquement des compteurs.

import { and, eq, inArray } from "drizzle-orm";

import { getDb } from "@/src/db/connection";
import { candidates, messageLogs } from "@/src/db/schema";
import { dispatchConfiguredConfirmations } from "@/src/services/messaging/confirmation";

async function main() {
  const execute = process.argv.includes("--execute");
  const confirmed = process.argv.includes("--confirm-send");
  const limit = Math.min(100, Math.max(1, Number(process.argv.find((value) => value.startsWith("--limit="))?.slice(8) || 10)));
  if (execute !== confirmed) throw new Error("both_flags_required");
  if (execute && process.env.MESSAGING_ENABLED !== "true") throw new Error("messaging_disabled");

  const rows = await getDb().select({ id: messageLogs.id }).from(messageLogs)
    .innerJoin(candidates, eq(candidates.id, messageLogs.candidateId))
    .where(and(
      eq(candidates.phoneValid, true),
      inArray(messageLogs.status, ["pending", "retry_scheduled"]),
      eq(messageLogs.messageType, "preselection_confirmation"),
    )).limit(limit);

  console.log(JSON.stringify({ mode: execute ? "execute" : "dry-run", eligible: rows.length, limit }, null, 2));
  if (!execute) return;
  const result = await dispatchConfiguredConfirmations(limit);
  console.log(JSON.stringify({ completed: result.status === "completed", summary: result.status === "completed" ? result.summary : null }, null, 2));
}

main().catch((error) => {
  const message = error instanceof Error ? error.message : "";
  const safeCode = ["both_flags_required", "messaging_disabled"].includes(message) ? message : "historical_confirmation_failed";
  console.error(safeCode);
  process.exitCode = 1;
});
