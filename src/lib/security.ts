import { createHash, createHmac } from "node:crypto";

export function hashSensitiveValue(value: string) {
  const secret = process.env.AUTH_SECRET || "development-only-missing-auth-secret";
  return createHmac("sha256", secret).update(value).digest("hex");
}

export function maskPhone(value: string | null) {
  if (!value) return "—";
  const compact = value.replace(/\s+/g, "");
  if (compact.length < 6) return "••••";
  return `${compact.slice(0, 4)}••••${compact.slice(-2)}`;
}

export function stableFingerprint(parts: Array<string | null | undefined>) {
  return createHash("sha256").update(parts.map((part) => part?.trim().toLowerCase() || "").join("|")).digest("hex");
}
