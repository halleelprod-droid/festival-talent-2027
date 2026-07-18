import { and, eq, inArray } from "drizzle-orm";
import { getDb } from "@/src/db/connection";
import { candidates, messageLogs } from "@/src/db/schema";
import { processConfirmation } from "@/src/services/messaging/confirmation";

async function main() {
const execute = process.argv.includes("--execute");
const limit = Math.min(100, Math.max(1, Number(process.argv.find((arg) => arg.startsWith("--limit="))?.slice(8) || 10)));
if (execute && !process.argv.includes("--confirm-send")) throw new Error("--execute requires --confirm-send");
if (execute && process.env.MESSAGING_ENABLED !== "true") throw new Error("MESSAGING_ENABLED must be true");
const rows = await getDb().select({ id: messageLogs.id, status: messageLogs.status }).from(messageLogs).innerJoin(candidates, eq(candidates.id, messageLogs.candidateId)).where(and(eq(candidates.phoneValid, true), inArray(messageLogs.status, ["queued", "failed"]), eq(messageLogs.messageType, "preselection_confirmation"))).limit(limit);
console.log(JSON.stringify({ mode: execute ? "execute" : "dry-run", eligible: rows.length, limit }, null, 2));
if (execute) {
  let sent = 0, failed = 0;
  for (const row of rows) {
    if (row.status === "failed") await getDb().update(messageLogs).set({ status: "queued", errorCode: null, errorMessage: null }).where(eq(messageLogs.id, row.id));
    const result = await processConfirmation(row.id);
    if (result.status === "sent") sent += 1; else if (result.status === "failed") failed += 1;
  }
  console.log(JSON.stringify({ completed: true, sent, failed }, null, 2));
}
}

main().catch((error) => { console.error(error instanceof Error ? error.message : "Batch failed"); process.exitCode = 1; });
