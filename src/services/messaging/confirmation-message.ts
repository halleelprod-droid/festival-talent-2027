export function extractFirstName(fullName: unknown) {
  if (typeof fullName !== "string") return null;
  const first = fullName.trim().split(/\s+/)[0]?.replace(/[^\p{L}'’\-]/gu, "").slice(0, 40);
  return first || null;
}

function safeLabel(value: unknown, fallback: string): string {
  if (typeof value !== "string") return fallback;
  const normalized = value
    .replace(/[^\p{L}\p{N} '&’()\-]/gu, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 60);
  return normalized || fallback;
}

export function buildPreselectionConfirmation(input: {
  fullName: unknown;
  discipline: unknown;
  registrationReference: string;
}) {
  const firstName = extractFirstName(input.fullName);
  const greeting = firstName ? `Bonjour ${firstName}` : "Bonjour";
  const discipline = safeLabel(input.discipline, "votre catégorie");
  const reference = safeLabel(input.registrationReference, "FT-2027");
  return `Festival Talent 2027\n\n${greeting}, votre inscription aux présélections en catégorie ${discipline} a bien été enregistrée.\n\nRéférence : ${reference}\n\nNous vous contacterons prochainement pour les détails des présélections.\n\nFestival Talent 2027`;
}
