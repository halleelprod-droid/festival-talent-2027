import { createPlatformResponse } from "@/lib/platform/api";
import { getConfirmedArtists } from "@/services/artists";

export const dynamic = "force-static";

export function GET() {
  return createPlatformResponse("artists", getConfirmedArtists());
}
