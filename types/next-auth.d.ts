import "next-auth";
import "next-auth/jwt";

type AdminRole = "super_admin" | "admin" | "communications" | "jury" | "viewer";

declare module "next-auth" {
  interface User { role: AdminRole }
  interface Session { user: { id: string; role: AdminRole; name?: string | null; email?: string | null; image?: string | null } }
}

declare module "next-auth/jwt" {
  interface JWT { role: AdminRole }
}
