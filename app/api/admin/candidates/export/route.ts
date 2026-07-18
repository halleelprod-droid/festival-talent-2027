import { desc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { getDb } from "@/src/db";
import { candidates, disciplines, preselectionRegistrations } from "@/src/db/schema";
import { requireAdmin, exportRoles } from "@/src/lib/admin-auth";
import { writeAuditLog } from "@/src/lib/audit";
import { calculateAgeOnDate } from "@/src/lib/candidate-date-of-birth";
import { currentEdition } from "@/src/config/edition";

const csvCell = (value: unknown) => `"${String(value ?? "").replaceAll('"', '""')}"`;

export async function GET() {
  const session = await requireAdmin(exportRoles);
  if (!session) return NextResponse.json({ ok: false }, { status: 403 });
  // age_reference_date documente à quelle date l'âge a été calculé.
  const referenceDate = currentEdition.ageReferenceDate;
  const rows = await getDb().select({ name: candidates.fullName, phone: candidates.phoneNormalized, email: candidates.email, dateOfBirth: candidates.dateOfBirth, city: candidates.city, discipline: disciplines.name, status: preselectionRegistrations.status, submittedAt: preselectionRegistrations.submittedAt })
    .from(preselectionRegistrations).innerJoin(candidates, eq(candidates.id, preselectionRegistrations.candidateId)).leftJoin(disciplines, eq(disciplines.id, preselectionRegistrations.disciplineId)).orderBy(desc(preselectionRegistrations.submittedAt));
  // calculated_age est recalculé au moment de l'export, jamais persisté en base.
  const csv = [
    ["Nom", "Téléphone", "Email", "date_of_birth", "calculated_age", "age_reference_date", "birth_date_review_required", "Ville", "Discipline", "Statut", "Date"],
    ...rows.map((row) => [
      row.name, row.phone, row.email,
      row.dateOfBirth ?? "",
      row.dateOfBirth ? String(calculateAgeOnDate(row.dateOfBirth, referenceDate) ?? "") : "",
      referenceDate,
      row.dateOfBirth ? "false" : "true",
      row.city, row.discipline, row.status, row.submittedAt.toISOString(),
    ]),
  ].map((row) => row.map(csvCell).join(",")).join("\n");
  await writeAuditLog({ adminUserId: session.user.id, action: "candidates.export", entityType: "preselection_registration", metadata: { count: rows.length } });
  return new Response(`\uFEFF${csv}`, { headers: { "Content-Type": "text/csv; charset=utf-8", "Content-Disposition": `attachment; filename="festival-talent-candidatures-${new Date().toISOString().slice(0, 10)}.csv"`, "Cache-Control": "no-store" } });
}
