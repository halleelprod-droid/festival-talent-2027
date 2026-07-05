export { getStaffMembers } from "@/services/staff";
export { staffMembers } from "@/data/staff";
export type { StaffIconKey, StaffMember } from "@/data/staff";

export const staffModule = {
  name: "staff",
  sensitivity: "public",
  publicApi: true,
  status: "active",
} as const;
