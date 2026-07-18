// Utilitaires purs et déterministes autour de la date de naissance candidat.
// Aucune dépendance à l'interface, aucun `new Date(...)` pour l'analyse : on
// parse manuellement le format civil AAAA-MM-JJ afin d'éviter tout décalage de
// fuseau horaire (robuste même si le serveur change de région).

import { currentEdition } from "@/src/config/edition";

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

function daysInMonth(year: number, month: number): number {
  const table = [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  return table[month - 1] ?? 0;
}

// Analyse une date civile "AAAA-MM-JJ". Retourne null si le format est incorrect
// ou si la date n'existe pas au calendrier (mois hors 1..12, jour hors bornes,
// faux 29 février, 30 avril, etc.).
export function parseCivilDate(value: string): { year: number; month: number; day: number } | null {
  if (typeof value !== "string" || !ISO_DATE.test(value.trim())) return null;
  const [year, month, day] = value.trim().split("-").map(Number);
  if (month < 1 || month > 12) return null;
  if (day < 1 || day > daysInMonth(year, month)) return null;
  return { year, month, day };
}

export function isValidCivilDate(value: string): boolean {
  return parseCivilDate(value) !== null;
}

// Compare deux dates civiles "AAAA-MM-JJ" sans passer par des objets Date.
// Retourne -1 (a < b), 0 (a = b), 1 (a > b), ou null si l'une est invalide.
export function compareCivilDates(a: string, b: string): number | null {
  const left = parseCivilDate(a);
  const right = parseCivilDate(b);
  if (!left || !right) return null;
  if (left.year !== right.year) return left.year < right.year ? -1 : 1;
  if (left.month !== right.month) return left.month < right.month ? -1 : 1;
  if (left.day !== right.day) return left.day < right.day ? -1 : 1;
  return 0;
}

// Âge (nombre entier) à une date de référence, calculé au jour près.
// Retourne null si l'une des deux dates est invalide.
export function calculateAgeOnDate(dateOfBirth: string, referenceDate: string): number | null {
  const birth = parseCivilDate(dateOfBirth);
  const reference = parseCivilDate(referenceDate);
  if (!birth || !reference) return null;
  let age = reference.year - birth.year;
  // Convention 29 février : en année non bissextile, l'anniversaire est atteint
  // le 1er mars (comparaison numérique mois/jour → le 28 février reste « avant »).
  if (reference.month < birth.month || (reference.month === birth.month && reference.day < birth.day)) {
    age -= 1;
  }
  return age;
}

export function isDateOfBirthInFuture(dateOfBirth: string, referenceDate: string): boolean {
  return compareCivilDates(dateOfBirth, referenceDate) === 1;
}

export function currentCivilDateUtc(now: Date = new Date()): string {
  const year = now.getUTCFullYear();
  const month = String(now.getUTCMonth() + 1).padStart(2, "0");
  const day = String(now.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// Éligibilité métier : âge (à la date de référence) dans les bornes fournies.
// minimumAge / maximumAge à null => borne non appliquée.
export function isCandidateAgeEligible(params: {
  dateOfBirth: string;
  referenceDate?: string;
  minimumAge?: number | null;
  maximumAge?: number | null;
}): boolean {
  const {
    dateOfBirth,
    referenceDate = currentEdition.ageReferenceDate,
    minimumAge = currentEdition.minimumAge,
    maximumAge = currentEdition.maximumAge,
  } = params;
  if (isDateOfBirthInFuture(dateOfBirth, referenceDate)) return false;
  const age = calculateAgeOnDate(dateOfBirth, referenceDate);
  if (age === null) return false;
  if (minimumAge != null && age < minimumAge) return false;
  if (maximumAge != null && age > maximumAge) return false;
  return true;
}

// Validité complète d'une date de naissance pour une inscription : format, date
// réelle, année plausible (>= 1900) et jamais dans le futur (référence = aujourd'hui
// par défaut, exprimée en date civile UTC).
export function isValidDateOfBirthForRegistration(
  value: string,
  today: string = currentCivilDateUtc(),
): boolean {
  const parsed = parseCivilDate(value);
  if (!parsed) return false;
  if (parsed.year < 1900) return false;
  if (isDateOfBirthInFuture(value, today)) return false;
  return true;
}
