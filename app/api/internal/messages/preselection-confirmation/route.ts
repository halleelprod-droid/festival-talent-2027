import { timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { and, count, eq, gt } from "drizzle-orm";
import { z } from "zod";

import { getDb } from "@/src/db";
import { rateLimitEvents } from "@/src/db/schema";
import { hashSensitiveValue } from "@/src/lib/security";
import { processConfirmation } from "@/src/services/messaging/confirmation";

const inputSchema = z.object({ messageId: z.string().uuid() });

function validSecret(received: string | null) {
  const expected = process.env.INTERNAL_API_SECRET;
  if (!expected || !received) return false;
  const actualBuffer = Buffer.from(received);
  const expectedBuffer = Buffer.from(expected);
  if (actualBuffer.length !== expectedBuffer.length) return false;
  return timingSafeEqual(actualBuffer, expectedBuffer);
}

export async function POST(request: Request) {
  if (!validSecret(request.headers.get("x-internal-secret"))) return NextResponse.json({ ok: false }, { status: 401 });
  const parsed = inputSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ ok: false }, { status: 400 });
  const keyHash = hashSensitiveValue(request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "internal");
  const since = new Date(Date.now() - 60_000);
  const db = getDb();
  const [attempts] = await db.select({ value: count() }).from(rateLimitEvents).where(and(eq(rateLimitEvents.scope, "internal-messaging"), eq(rateLimitEvents.keyHash, keyHash), gt(rateLimitEvents.createdAt, since)));
  if ((attempts?.value ?? 0) >= 30) return NextResponse.json({ ok: false }, { status: 429 });
  await db.insert(rateLimitEvents).values({ scope: "internal-messaging", keyHash });
  if (process.env.MESSAGING_ENABLED !== "true") return NextResponse.json({ ok: true, status: "disabled" });
  const result = await processConfirmation(parsed.data.messageId);
  return NextResponse.json({ ok: true, status: result.status });
}
