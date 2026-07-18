export function extractFirstName(fullName: unknown) {
  if (typeof fullName !== "string") return null;
  return fullName.trim().split(/\s+/)[0]?.slice(0, 50) || null;
}

export function buildPreselectionConfirmation(fullName: unknown) {
  const firstName = extractFirstName(fullName);
  const greeting = firstName ? `Bonjour ${firstName}` : "Bonjour";
  return `${greeting}, votre inscription aux présélections du Festival Talent 2027 a bien été enregistrée. Nous vous contacterons prochainement pour la suite. Festival Talent.`;
}
