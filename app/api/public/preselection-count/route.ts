import { count } from "drizzle-orm";
import { NextResponse } from "next/server";
import { getDb } from "@/src/db";
import { preselectionRegistrations } from "@/src/db/schema";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const [result] = await getDb().select({ count: count() }).from(preselectionRegistrations);
    return NextResponse.json({ count: result?.count ?? 0 }, { headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" } });
  } catch {
    return NextResponse.json({ count: null }, { status: 503 });
  }
}
