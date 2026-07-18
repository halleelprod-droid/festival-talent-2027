import "server-only";

import { auditLogs } from "@/src/db/schema";
import { getDb } from "@/src/db";

type AuditEvent = {
  adminUserId?: string | null;
  action: string;
  entityType: string;
  entityId?: string | null;
  metadata?: Record<string, unknown>;
  ipHash?: string | null;
};

export async function writeAuditLog(event: AuditEvent) {
  await getDb().insert(auditLogs).values({
    adminUserId: event.adminUserId,
    action: event.action,
    entityType: event.entityType,
    entityId: event.entityId,
    metadata: event.metadata ?? {},
    ipHash: event.ipHash,
  });
}
