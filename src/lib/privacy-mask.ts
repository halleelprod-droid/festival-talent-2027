// Masquage cohérent des données personnelles pour les fichiers/rapports de revue.
// Objectif : distinguer les inscriptions sans permettre de reconstruire facilement
// une valeur complète. Ne jamais logguer les valeurs en clair.

import { createHmac } from "node:crypto";

export function maskPhoneNumber(value: string | null | undefined): string {
  const digits = String(value ?? "").replace(/\D/g, "");
  if (!digits) return "—";
  if (digits.length <= 4) return "*".repeat(digits.length);
  return `${"*".repeat(digits.length - 4)}${digits.slice(-4)}`;
}

export function maskEmailAddress(value: string | null | undefined): string {
  const email = String(value ?? "").trim();
  const at = email.indexOf("@");
  if (at <= 0) return email ? "***" : "—";
  const domain = email.slice(at + 1);
  const first = email[0] ?? "";
  return `${first}***@${domain}`;
}

export function maskFullName(value: string | null | undefined): string {
  const name = String(value ?? "").trim();
  if (!name) return "—";
  return name
    .split(/\s+/)
    .map((word) => (word.length <= 1 ? word : `${word[0]}${"*".repeat(word.length - 1)}`))
    .join(" ");
}

// Empreinte technique non réversible, stable, salée par un secret local (HMAC).
// Ne jamais utiliser la date de naissance dans l'empreinte, ni ce secret comme
// authentification. Retourne "" si aucun secret n'est configuré (l'empreinte est
// facultative : `review_id` + `source_row` suffisent à la correspondance locale).
export function createCandidateReviewFingerprint(
  parts: { normalizedPhone?: string | null; normalizedEmail?: string | null; sourceRow: number | string },
  secret: string | undefined = process.env.CANDIDATE_REVIEW_SECRET,
): string {
  if (!secret) return "";
  const payload = `${parts.normalizedPhone ?? ""}|${(parts.normalizedEmail ?? "").toLowerCase()}|${parts.sourceRow}`;
  return createHmac("sha256", secret).update(payload).digest("hex").slice(0, 24);
}
