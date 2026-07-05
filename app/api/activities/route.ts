import { createPlatformResponse } from "@/lib/platform/api";
import { getFestivalActivities } from "@/services/activities";

export const dynamic = "force-static";

export function GET() {
  return createPlatformResponse("activities", getFestivalActivities());
}
