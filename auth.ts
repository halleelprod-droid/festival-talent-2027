import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { getDb } from "@/src/db";
import { adminCredentials, adminUsers } from "@/src/db/schema";

const credentialsSchema = z.object({
  email: z.string().email().transform((value) => value.trim().toLowerCase()),
  password: z.string().min(12).max(200),
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  session: { strategy: "jwt", maxAge: 8 * 60 * 60 },
  pages: { signIn: "/admin/login" },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Mot de passe", type: "password" },
      },
      async authorize(rawCredentials) {
        const parsed = credentialsSchema.safeParse(rawCredentials);
        if (!parsed.success) return null;

        const [record] = await getDb()
          .select({
            id: adminUsers.id,
            email: adminUsers.email,
            name: adminUsers.fullName,
            role: adminUsers.role,
            active: adminUsers.active,
            passwordHash: adminCredentials.passwordHash,
          })
          .from(adminUsers)
          .innerJoin(adminCredentials, eq(adminCredentials.adminUserId, adminUsers.id))
          .where(eq(adminUsers.email, parsed.data.email))
          .limit(1);

        if (!record?.active || !(await compare(parsed.data.password, record.passwordHash))) return null;
        return { id: record.id, email: record.email, name: record.name, role: record.role };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
        session.user.role = token.role;
      }
      return session;
    },
    authorized({ auth: session, request }) {
      const pathname = request.nextUrl.pathname;
      if (pathname === "/admin/login") return true;
      return Boolean(session?.user);
    },
  },
});
