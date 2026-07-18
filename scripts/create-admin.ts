import { hash } from "bcryptjs";
import { getDb } from "@/src/db/connection";
import { adminCredentials, adminUsers } from "@/src/db/schema";

async function main() {
const readArg = (name: string) => process.argv.find((arg) => arg.startsWith(`--${name}=`))?.split("=").slice(1).join("=");
const email = readArg("email")?.trim().toLowerCase();
const fullName = readArg("name")?.trim();
const role = readArg("role") || "super_admin";
const password = process.env.ADMIN_PASSWORD;
const roles = ["super_admin", "admin", "communications", "jury", "viewer"] as const;
if (!email || !/^\S+@\S+\.\S+$/.test(email) || !fullName || !password || password.length < 12 || !roles.includes(role as typeof roles[number])) throw new Error("Provide --email, --name, a valid --role and ADMIN_PASSWORD (12+ characters)");
const passwordHash = await hash(password, 12);
await getDb().transaction(async (tx) => {
  const [admin] = await tx.insert(adminUsers).values({ email, fullName, role: role as typeof roles[number] }).onConflictDoUpdate({ target: adminUsers.email, set: { fullName, role: role as typeof roles[number], active: true, updatedAt: new Date() } }).returning({ id: adminUsers.id });
  await tx.insert(adminCredentials).values({ adminUserId: admin.id, passwordHash }).onConflictDoUpdate({ target: adminCredentials.adminUserId, set: { passwordHash, updatedAt: new Date() } });
});
console.log("Administrator created or updated.");
}

main().catch(() => { console.error("Administrator creation failed."); process.exitCode = 1; });
