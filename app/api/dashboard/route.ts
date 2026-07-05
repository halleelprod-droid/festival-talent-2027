import { createPlatformResponse } from "@/lib/platform/api";
import { getPlatformReadiness } from "@/services/platform";

export const dynamic = "force-static";

export function GET() {
  return createPlatformResponse(
    "dashboard",
    {
      readiness: getPlatformReadiness(),
      access: "future-auth-required",
      realData: "disabled-until-rbac",
    },
    {
      sensitivity: "protected",
      note: "Dashboard real data must remain behind authentication, RBAC and RLS.",
    }
  );
}
