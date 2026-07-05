import { createPlatformResponse } from "@/lib/platform/api";
import { getFestivalEventsCount } from "@/services/events";
import { getPublicPlatformStats } from "@/services/statistics";

export const dynamic = "force-static";

export function GET() {
  return createPlatformResponse("statistics", {
    ...getPublicPlatformStats(),
    eventsModeled: String(getFestivalEventsCount()),
  });
}
