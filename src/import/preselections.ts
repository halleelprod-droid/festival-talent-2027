import { normalizeSenegalPhone } from "@/src/services/messaging/phone";
import {
  calculateAgeOnDate,
  currentCivilDateUtc,
  isDateOfBirthInFuture,
  isValidCivilDate,
} from "@/src/lib/candidate-date-of-birth";
import { currentEdition } from "@/src/config/edition";

export type CsvRow = Record<string, string>;
export type PreparedPreselection = {
  legacyId: string; fullName: string; phoneRaw: string; phoneNormalized: string | null; phoneValid: boolean;
  // date_of_birth = source de vérité. null quand la ligne historique ne fournit
  // pas de date valide : aucune date n'est jamais fabriquée à partir d'un âge.
  email: string | null; dateOfBirth: string | null; city: string; discipline: string; createdAt: Date;
  historicalAge: number | null;
  // Une ligne « bloquée » ne peut pas être importée en exécution tant que la date
  // de naissance n'a pas été complétée par une revue humaine.
  importable: boolean; reviewFlags: string[]; raw: CsvRow;
};

// Alias acceptés (normalisés en minuscules, espaces → underscore) pour les colonnes.
const DOB_ALIASES = ["date_of_birth", "dateofbirth", "birth_date", "birthdate", "date_naissance", "date_de_naissance"];
const AGE_ALIASES = ["age", "candidate_age", "âge"];

export function parseCsv(content: string): CsvRow[] {
  const records: string[][] = [];
  let row: string[] = [], cell = "", quoted = false;
  for (let i = 0; i < content.length; i += 1) {
    const char = content[i];
    if (char === '"' && quoted && content[i + 1] === '"') { cell += '"'; i += 1; }
    else if (char === '"') quoted = !quoted;
    else if (char === "," && !quoted) { row.push(cell); cell = ""; }
    else if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && content[i + 1] === "\n") i += 1;
      row.push(cell); if (row.some((value) => value.length)) records.push(row); row = []; cell = "";
    } else cell += char;
  }
  if (cell.length || row.length) { row.push(cell); records.push(row); }
  const [headers, ...values] = records;
  if (!headers) return [];
  return values.map((valuesRow) => Object.fromEntries(headers.map((header, index) => [header.replace(/^﻿/, "").trim(), valuesRow[index] ?? ""])));
}

export function normalizeCity(value: string) {
  const compact = value.trim().replace(/\s+/g, " ");
  const known: Record<string, string> = { dakar: "Dakar", thies: "Thiès", "thiès": "Thiès", "saint louis": "Saint-Louis", "lac rose": "Lac Rose", mbour: "Mbour", rufisque: "Rufisque", kaolack: "Kaolack", fatick: "Fatick", diourbel: "Diourbel" };
  return known[compact.toLowerCase()] ?? compact.replace(/\b\p{L}/gu, (letter) => letter.toUpperCase());
}

// Les exports locaux historiques utilisent la convention française JJ/MM/AAAA.
// Cette convention est explicite et limitée à l'import ; l'API publique reste
// strictement en AAAA-MM-JJ.
export function normalizeImportedDateOfBirth(rawValue: string | undefined): string {
  const value = (rawValue ?? "").trim();
  if (!value) return "";
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
  if (/^\d{4}\/\d{2}\/\d{2}$/.test(value)) return value.replaceAll("/", "-");
  const local = /^(\d{2})[\/-](\d{2})[\/-](\d{4})$/.exec(value);
  return local ? `${local[3]}-${local[2]}-${local[1]}` : value;
}

function normalizeHeader(header: string): string {
  return header.toLowerCase().trim().replace(/\s+/g, "_");
}

function findColumn(row: CsvRow, aliases: string[]): string | undefined {
  const keyByNormalized = new Map(Object.keys(row).map((key) => [normalizeHeader(key), key]));
  for (const alias of aliases) {
    const match = keyByNormalized.get(alias);
    if (match) return match;
  }
  return undefined;
}

export function sanitizeLegacyPayload(row: CsvRow): CsvRow {
  return Object.fromEntries(Object.entries(row).filter(([key]) => {
    const normalized = normalizeHeader(key);
    return !DOB_ALIASES.includes(normalized) && !AGE_ALIASES.includes(normalized);
  }));
}

export function preparePreselections(
  rows: CsvRow[],
  options: { today?: string; referenceDate?: string } = {},
) {
  // `age` n'est plus requis. La date de naissance est traitée ligne par ligne :
  // les lignes sans date valide sont bloquées (revue humaine), jamais fabriquées.
  const required = ["id", "full_name", "phone", "email", "city", "discipline", "created_at"];
  const missing = required.filter((header) => rows.length && !(header in rows[0]));
  if (missing.length) throw new Error(`missing_columns:${missing.join(",")}`);

  const dobColumn = rows.length ? findColumn(rows[0], DOB_ALIASES) : undefined;
  const ageColumn = rows.length ? findColumn(rows[0], AGE_ALIASES) : undefined;
  const referenceDate = options.referenceDate ?? currentEdition.ageReferenceDate;
  const today = options.today ?? currentCivilDateUtc();

  let invalidPhones = 0, invalidEmails = 0, duplicateRows = 0;
  let validDob = 0, invalidDob = 0, missingDob = 0, futureDob = 0, ageOutOfRange = 0;
  let historicalAgeOnly = 0, ageDobMismatch = 0, reviewSignals = 0, candidatesBlocked = 0;
  let candidatesEligible = 0;
  const phoneSeen = new Set<string>(), emailSeen = new Set<string>(), nameCitySeen = new Set<string>();
  const duplicateSignals: Array<{ first: number; second: number; reason: string; score: number }> = [];
  const phoneIndex = new Map<string, number>(), emailIndex = new Map<string, number>(), nameCityIndex = new Map<string, number>();

  const prepared = rows.map((row, index) => {
    const phone = normalizeSenegalPhone(row.phone);
    if (!phone.valid) invalidPhones += 1;
    const rawEmail = row.email.trim().toLowerCase();
    const email = rawEmail && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(rawEmail) ? rawEmail : null;
    if (rawEmail && !email) invalidEmails += 1;

    const reviewFlags: string[] = [];
    const rawDobValue = dobColumn ? row[dobColumn] : undefined;
    const normalizedDob = normalizeImportedDateOfBirth(rawDobValue);
    const rawAge = ageColumn ? (row[ageColumn] ?? "").trim() : "";
    const parsedHistoricalAge = rawAge && Number.isInteger(Number(rawAge)) ? Number(rawAge) : null;
    let dateOfBirth: string | null = null;
    let importable = false;

    if (normalizedDob && isValidCivilDate(normalizedDob)) {
      if (isDateOfBirthInFuture(normalizedDob, today)) {
        // Date future : jamais stockée. Ligne bloquée.
        futureDob += 1; reviewFlags.push("future_date_of_birth");
      } else {
        // Cas 1 : date valide → source de vérité, ligne importable.
        dateOfBirth = normalizedDob; validDob += 1; importable = true;
        const age = calculateAgeOnDate(dateOfBirth, referenceDate);
        if (age !== null && (age < currentEdition.minimumAge || age > currentEdition.maximumAge)) {
          ageOutOfRange += 1; importable = false; reviewFlags.push("candidate_age_not_eligible");
        } else {
          candidatesEligible += 1;
        }
        // Cas incohérence : âge historique et date présents mais divergents.
        if (parsedHistoricalAge !== null && age !== null && parsedHistoricalAge !== age) {
          ageDobMismatch += 1; reviewFlags.push("age_date_of_birth_mismatch");
        }
      }
    } else if ((rawDobValue ?? "").trim()) {
      // Date fournie mais invalide (format non reconnu, date impossible). Bloquée.
      invalidDob += 1; reviewFlags.push("invalid_date_of_birth");
    } else if (parsedHistoricalAge !== null) {
      // Cas 2 : âge historique seul, aucune date → revue manuelle, aucune fabrication.
      missingDob += 1; historicalAgeOnly += 1; reviewFlags.push("manual_birth_date_review_required");
    } else {
      // Aucune date, aucun âge exploitable.
      missingDob += 1; reviewFlags.push("manual_birth_date_review_required");
    }

    if (!importable) candidatesBlocked += 1;
    if (reviewFlags.length) reviewSignals += 1;

    const city = normalizeCity(row.city);
    const nameCity = `${row.full_name.trim().toLowerCase()}|${city.toLowerCase()}`;
    let isDuplicate = false;
    if (phone.normalized && phoneSeen.has(phone.normalized)) { isDuplicate = true; duplicateSignals.push({ first: phoneIndex.get(phone.normalized)!, second: index, reason: "phone", score: 1 }); }
    if (email && emailSeen.has(email)) { isDuplicate = true; duplicateSignals.push({ first: emailIndex.get(email)!, second: index, reason: "email", score: 0.95 }); }
    if (nameCitySeen.has(nameCity)) duplicateSignals.push({ first: nameCityIndex.get(nameCity)!, second: index, reason: "name_city", score: 0.7 });
    if (isDuplicate) duplicateRows += 1;
    if (phone.normalized && !phoneSeen.has(phone.normalized)) { phoneSeen.add(phone.normalized); phoneIndex.set(phone.normalized, index); }
    if (email && !emailSeen.has(email)) { emailSeen.add(email); emailIndex.set(email, index); }
    if (!nameCitySeen.has(nameCity)) { nameCitySeen.add(nameCity); nameCityIndex.set(nameCity, index); }
    const date = new Date(row.created_at);
    return { legacyId: row.id, fullName: row.full_name.trim(), phoneRaw: row.phone, phoneNormalized: phone.normalized, phoneValid: phone.valid, email, dateOfBirth, city, discipline: row.discipline.trim(), createdAt: Number.isNaN(date.getTime()) ? new Date() : date, historicalAge: parsedHistoricalAge, importable, reviewFlags, raw: row } satisfies PreparedPreselection;
  });

  const candidatesImportable = prepared.filter((item) => item.importable).length;
  return {
    prepared,
    duplicateSignals,
    report: {
      total: prepared.length,
      validDob, invalidDob, missingDob, futureDob, ageOutOfRange, historicalAgeOnly, ageDobMismatch,
      candidatesEligible,
      validPhones: prepared.length - invalidPhones, invalidPhones, invalidEmails,
      duplicateRows, uniqueContactable: phoneSeen.size, reviewSignals,
      // Seules les lignes avec une date de naissance valide sont importables en
      // exécution ; les autres sont bloquées tant qu'une date n'est pas complétée.
      candidatesImportable, candidatesBlocked, registrationsImportable: candidatesImportable,
    },
  };
}
