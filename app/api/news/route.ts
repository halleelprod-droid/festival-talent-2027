import { createPlatformResponse } from "@/lib/platform/api";
import { getNewsArticles } from "@/services/news";

export const dynamic = "force-static";

export function GET() {
  return createPlatformResponse("news", getNewsArticles());
}
