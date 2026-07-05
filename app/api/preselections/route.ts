import { createPlatformResponse } from "@/lib/platform/api";

export const dynamic = "force-static";

export function GET() {
  return createPlatformResponse(
    "preselections",
    {
      status: "protected",
      publicMessage:
        "Les donnees reelles de pre-selections seront disponibles uniquement via un acces admin securise.",
      exposedCandidateRecords: 0,
    },
    {
      sensitivity: "protected",
      note: "No Supabase candidate data is queried or exposed by this endpoint.",
    }
  );
}
