import "server-only";

import { and, asc, eq, inArray, isNull, lte, or, sql } from "drizzle-orm";

import { getDb } from "@/src/db";
import { auditLogs, candidates, messageLogs, preselectionRegistrations } from "@/src/db/schema";
import type { ConfirmationJob, MessageQueueRepository } from "./dispatcher";
import type { MessagingFailure, ProviderResult } from "./provider";

type AuditMetadata = Record<string, string | number>;

export class PostgresMessageQueueRepository implements MessageQueueRepository {
  async claimBatch(limit: number, now: Date): Promise<ConfirmationJob[]> {
    return getDb().transaction(async (tx) => {
      const rows = await tx.select({
        id: messageLogs.id,
        registrationId: messageLogs.registrationId,
        recipientNormalized: messageLogs.recipientNormalized,
        candidatePhone: candidates.phoneNormalized,
        candidateName: candidates.fullName,
        discipline: preselectionRegistrations.category,
        attemptCount: messageLogs.attemptCount,
      }).from(messageLogs)
        .innerJoin(candidates, eq(candidates.id, messageLogs.candidateId))
        .leftJoin(preselectionRegistrations, eq(preselectionRegistrations.id, messageLogs.registrationId))
        .where(or(
          inArray(messageLogs.status, ["pending", "queued"]),
          and(
            eq(messageLogs.status, "retry_scheduled"),
            or(isNull(messageLogs.nextAttemptAt), lte(messageLogs.nextAttemptAt, now)),
          ),
        ))
        .orderBy(asc(messageLogs.createdAt))
        .limit(limit)
        .for("update", { skipLocked: true });

      if (!rows.length) return [];
      await tx.update(messageLogs).set({
        status: "processing",
        attemptCount: sql`${messageLogs.attemptCount} + 1`,
        lastAttemptAt: now,
        nextAttemptAt: null,
        updatedAt: now,
      }).where(inArray(messageLogs.id, rows.map((row) => row.id)));

      return rows.flatMap((row) => row.registrationId ? [{
        id: row.id,
        registrationId: row.registrationId,
        recipientNormalized: row.recipientNormalized ?? row.candidatePhone,
        candidateName: row.candidateName,
        discipline: row.discipline,
        attemptCount: row.attemptCount + 1,
      }] : []);
    });
  }

  private async updateWithAudit(
    id: string,
    values: Partial<typeof messageLogs.$inferInsert>,
    action: string,
    metadata: AuditMetadata,
  ): Promise<void> {
    await getDb().transaction(async (tx) => {
      await tx.update(messageLogs).set(values).where(eq(messageLogs.id, id));
      await tx.insert(auditLogs).values({
        action,
        entityType: "message_log",
        entityId: id,
        metadata,
      });
    });
  }

  async markAccepted(job: ConfirmationJob, result: ProviderResult, now: Date) {
    await this.updateWithAudit(job.id, {
      status: "accepted", provider: result.provider, providerMessageId: result.messageId,
      failureCode: null, failureCategory: null, failedAt: null, updatedAt: now,
    }, "preselection_confirmation_dispatched", { status: "accepted", provider: result.provider, attemptCount: job.attemptCount });
  }

  async markSent(job: ConfirmationJob, result: ProviderResult, now: Date) {
    await this.updateWithAudit(job.id, {
      status: "sent", provider: result.provider, providerMessageId: result.messageId,
      sentAt: now, failureCode: null, failureCategory: null, failedAt: null, updatedAt: now,
    }, "preselection_confirmation_dispatched", { status: "sent", provider: result.provider, attemptCount: job.attemptCount });
  }

  async markDelivered(job: ConfirmationJob, result: ProviderResult, now: Date) {
    await this.updateWithAudit(job.id, {
      status: "delivered", provider: result.provider, providerMessageId: result.messageId,
      sentAt: now, deliveredAt: now, failureCode: null, failureCategory: null, failedAt: null, updatedAt: now,
    }, "preselection_confirmation_dispatched", { status: "delivered", provider: result.provider, attemptCount: job.attemptCount });
  }

  async markRetry(job: ConfirmationJob, failure: MessagingFailure, nextAttemptAt: Date, now: Date) {
    await this.updateWithAudit(job.id, {
      status: "retry_scheduled", nextAttemptAt, failureCode: failure.code,
      failureCategory: failure.category, failedAt: now, updatedAt: now,
    }, "preselection_confirmation_retried", { failureCategory: failure.category, attemptCount: job.attemptCount });
  }

  async markFailed(job: ConfirmationJob, failure: MessagingFailure, now: Date) {
    await this.updateWithAudit(job.id, {
      status: "failed", nextAttemptAt: null, failureCode: failure.code,
      failureCategory: failure.category, failedAt: now, updatedAt: now,
    }, "preselection_confirmation_failed", { failureCategory: failure.category, attemptCount: job.attemptCount });
  }

  async markSuppressed(job: ConfirmationJob, code: string, now: Date) {
    await this.updateWithAudit(job.id, {
      status: "suppressed", nextAttemptAt: null, failureCode: code,
      failureCategory: "permanent", failedAt: now, updatedAt: now,
    }, "preselection_confirmation_suppressed", { failureCategory: "permanent", attemptCount: job.attemptCount });
  }
}
