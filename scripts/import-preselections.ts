import { readFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
import { eq } from "drizzle-orm";
import { getDb } from "@/src/db/connection";
import { candidateDuplicateReviews, candidates, disciplines, editions, preselectionRegistrations } from "@/src/db/schema";
import { parseCsv, preparePreselections, sanitizeLegacyPayload } from "@/src/import/preselections";

async function main() {
const args = new Set(process.argv.slice(2));
const execute = args.has("--execute");
if (execute && !args.has("--confirm-import")) throw new Error("--execute requires --confirm-import");
const fileArg = process.argv.find((arg) => arg.startsWith("--file="));
const file = fileArg?.slice(7) || join(homedir(), "Downloads", "preselections-export.csv");
const rows = parseCsv(readFileSync(file, "utf8"));
const { prepared, duplicateSignals, report } = preparePreselections(rows);
// Le rapport ne contient que des compteurs — aucune donnée personnelle (nom,
// téléphone, email, date de naissance) n'est jamais imprimée dans le terminal.
const summary = { mode: execute ? "execute" : "dry-run", ...report, duplicateSignals: duplicateSignals.length };

if (!execute) {
  console.log(JSON.stringify(summary, null, 2));
  process.exit(0);
}

await getDb().transaction(async (tx) => {
  const [edition] = await tx.insert(editions).values({ name: "Festival Talent 2027", year: 2027, status: "active" }).onConflictDoUpdate({ target: editions.year, set: { updatedAt: new Date() } }).returning({ id: editions.id });
  const candidateIds: string[] = [];
  for (const item of prepared) {
    // Les lignes sans date de naissance valide sont bloqu\u00e9es : elles ne sont jamais
    // ins\u00e9r\u00e9es automatiquement (revue humaine requise). On conserve l'alignement des
    // index pour les signaux de doublon via un identifiant vide (ignor\u00e9 plus bas).
    if (!item.importable) { candidateIds.push(""); continue; }
    const slug = item.discipline.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const [discipline] = await tx.insert(disciplines).values({ slug, name: item.discipline }).onConflictDoUpdate({ target: disciplines.slug, set: { name: item.discipline } }).returning({ id: disciplines.id });
    let [candidate] = await tx.insert(candidates).values({ fullName: item.fullName, phoneRaw: item.phoneRaw, phoneNormalized: item.phoneNormalized, phoneValid: item.phoneValid, email: item.email, dateOfBirth: item.dateOfBirth, city: item.city, source: "legacy-import", legacySourceId: item.legacyId, createdAt: item.createdAt, updatedAt: item.createdAt }).onConflictDoNothing({ target: candidates.legacySourceId }).returning({ id: candidates.id });
    if (!candidate) [candidate] = await tx.select({ id: candidates.id }).from(candidates).where(eq(candidates.legacySourceId, item.legacyId)).limit(1);
    candidateIds.push(candidate.id);
    await tx.insert(preselectionRegistrations).values({ candidateId: candidate.id, editionId: edition.id, disciplineId: discipline.id, category: item.discipline, auditionCity: item.city, submittedAt: item.createdAt, source: "legacy-import", legacySourceId: item.legacyId, legacyPayload: sanitizeLegacyPayload(item.raw), createdAt: item.createdAt, updatedAt: item.createdAt }).onConflictDoNothing({ target: preselectionRegistrations.legacySourceId });
  }
  for (const signal of duplicateSignals) {
    const a = candidateIds[signal.first], b = candidateIds[signal.second];
    if (!a || !b || a === b) continue;
    await tx.insert(candidateDuplicateReviews).values({ candidateAId: a, candidateBId: b, matchReason: signal.reason, matchScore: signal.score }).onConflictDoNothing();
  }
});
console.log(JSON.stringify({ ...summary, completed: true }, null, 2));
}

main().catch(() => {
  // Ne jamais imprimer l'erreur brute : elle peut contenir une URL de connexion,
  // un chemin local ou une valeur issue du fichier source.
  console.error("preselection_import_failed");
  process.exitCode = 1;
});
