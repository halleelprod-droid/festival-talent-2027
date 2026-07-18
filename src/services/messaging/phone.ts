export type NormalizedPhone = { raw: string; normalized: string | null; valid: boolean; reason?: "empty" | "invalid_format" };

const SENEGAL_E164 = /^\+221[2378]\d{8}$/;

export function normalizeSenegalPhone(value: unknown): NormalizedPhone {
  const raw = typeof value === "string" ? value : "";
  let compact = raw.trim().replace(/[\s\u00a0\-().]/g, "");
  if (!compact) return { raw, normalized: null, valid: false, reason: "empty" };
  if (compact.startsWith("00")) compact = `+${compact.slice(2)}`;
  else if (/^221\d{9}$/.test(compact)) compact = `+${compact}`;
  else if (/^\d{9}$/.test(compact)) compact = `+221${compact}`;
  if (!SENEGAL_E164.test(compact)) return { raw, normalized: null, valid: false, reason: "invalid_format" };
  return { raw, normalized: compact, valid: true };
}

export function classifyPhoneForBatch(value: unknown, seen: Set<string>) {
  const result = normalizeSenegalPhone(value);
  if (!result.valid || !result.normalized) return { kind: "invalid" as const, normalized: null };
  if (seen.has(result.normalized)) return { kind: "duplicate" as const, normalized: result.normalized };
  seen.add(result.normalized);
  return { kind: "valid" as const, normalized: result.normalized };
}
