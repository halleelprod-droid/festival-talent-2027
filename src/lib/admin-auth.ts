import "server-only";

import { auth } from "@/auth";

export const exportRoles = new Set(["super_admin", "admin"]);
export const messagingRoles = new Set(["super_admin", "admin", "communications"]);

export async function requireAdmin(roles?: Set<string>) {
  const session = await auth();
  if (!session?.user || (roles && !roles.has(session.user.role))) return null;
  return session;
}
