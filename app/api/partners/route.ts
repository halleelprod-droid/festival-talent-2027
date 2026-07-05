import { createPlatformResponse } from "@/lib/platform/api";
import { getOfficialPartners } from "@/services/partners";

export const dynamic = "force-static";

export function GET() {
  return createPlatformResponse("partners", getOfficialPartners());
}
