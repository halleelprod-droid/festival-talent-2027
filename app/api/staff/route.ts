import { createPlatformResponse } from "@/lib/platform/api";
import { getStaffMembers } from "@/services/staff";

export const dynamic = "force-static";

export function GET() {
  return createPlatformResponse("staff", getStaffMembers());
}
