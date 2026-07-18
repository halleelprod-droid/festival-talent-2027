import { and, eq, inArray } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";

import { getDb } from "@/src/db";
import { auditLogs, messageLogs } from "@/src/db/schema";
import { messagingRoles, requireAdmin } from "@/src/lib/admin-auth";

const paramsSchema = z.object({ id: z.string().uuid() });

export async function POST(_request: Request, context: { params: Promise<{ id: string }> }) {
  const session = await requireAdmin(messagingRoles);
  if (!session) return NextResponse.json({ ok: false }, { status: 403 });
  const parsed = paramsSchema.safeParse(await context.params);
  if (!parsed.success) return NextResponse.json({ ok: false }, { status: 400 });

  const retried = await getDb().transaction(async (tx) => {
    const [eligible] = await tx.select({ id: messageLogs.id }).from(messageLogs)
      .where(and(
        eq(messageLogs.id, parsed.data.id),
        inArray(messageLogs.status, ["failed", "undelivered"]),
        eq(messageLogs.failureCategory, "temporary"),
      ))
      .limit(1)
      .for("update");
    if (!eligible) return false;
    const now = new Date();
    await tx.update(messageLogs).set({
      status: "pending",
      attemptCount: 0,
      nextAttemptAt: null,
      failureCode: null,
      failureCategory: null,
      failedAt: null,
      updatedAt: now,
    }).where(eq(messageLogs.id, eligible.id));
    await tx.insert(auditLogs).values({
      adminUserId: session.user.id,
      action: "preselection_confirmation_manual_retry",
      entityType: "message_log",
      entityId: eligible.id,
      metadata: { previousStatus: "failed_or_undelivered", reason: "eligible_temporary_failure" },
    });
    return true;
  });
  return retried
    ? NextResponse.json({ ok: true, status: "pending" })
    : NextResponse.json({ ok: false, error: "not_eligible" }, { status: 409 });
}
