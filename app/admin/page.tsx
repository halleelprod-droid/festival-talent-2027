import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Download, LogOut, ShieldCheck } from "lucide-react";

import { auth, signOut } from "@/auth";
import { getDashboardData, type CandidateFilters } from "@/src/services/admin/dashboard";

export const metadata: Metadata = { title: "Administration | Festival Talent", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function AdminDashboardPage({ searchParams }: { searchParams: Promise<CandidateFilters> }) {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");
  const filters = await searchParams;
  const data = await getDashboardData(filters);
  const cards = [
    ["Candidats", data.stats.candidates], ["Inscriptions", data.stats.registrations], ["Villes", data.stats.cities],
    ["Disciplines", data.stats.disciplines], ["Téléphones valides", data.stats.validPhones], ["Invalides", data.stats.invalidPhones],
    ["Doublons à revoir", data.stats.duplicates], ["Confirmations envoyées", data.stats.sent], ["Échecs", data.stats.failed],
  ];
  const totalPages = Math.max(1, Math.ceil(data.total / data.pageSize));
  const canExport = session.user.role === "super_admin" || session.user.role === "admin";

  async function logout() { "use server"; await signOut({ redirectTo: "/admin/login" }); }

  return (
    <main className="min-h-screen bg-black px-5 pb-24 pt-28 text-white sm:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div><p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.25em] text-yellow-300"><ShieldCheck size={16} /> Administration sécurisée</p><h1 className="mt-3 text-4xl font-black uppercase">Candidatures 2027</h1><p className="mt-2 text-sm text-white/55">{session.user.name} · {session.user.role}</p></div>
          <div className="flex gap-3">{canExport && <Link href="/api/admin/candidates/export" className="inline-flex items-center gap-2 rounded-full border border-yellow-400/30 px-5 py-3 text-sm"><Download size={16} /> Export CSV</Link>}<form action={logout}><button className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm"><LogOut size={16} /> Quitter</button></form></div>
        </header>

        <section aria-label="Statistiques" className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">{cards.map(([label, value]) => <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5"><p className="text-xs uppercase tracking-wider text-white/45">{label}</p><p className="mt-3 text-3xl font-black text-yellow-300">{value}</p></div>)}</section>
        <section className="mt-8 rounded-3xl border border-white/10 bg-white/[0.035] p-5 sm:p-7">
          <form className="grid gap-3 md:grid-cols-4">
            <input name="q" defaultValue={filters.q} placeholder="Nom ou ville" className="rounded-xl border border-white/10 bg-black/60 px-4 py-3" />
            <select name="status" defaultValue={filters.status || ""} className="rounded-xl border border-white/10 bg-black px-4 py-3"><option value="">Tous les statuts</option>{data.statuses.map((item) => <option key={item.status} value={item.status}>{item.status} ({item.value})</option>)}</select>
            <select name="discipline" defaultValue={filters.discipline || ""} className="rounded-xl border border-white/10 bg-black px-4 py-3"><option value="">Toutes les disciplines</option>{data.disciplineOptions.map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}</select>
            <button className="rounded-xl bg-yellow-400 px-5 py-3 font-black uppercase text-black">Filtrer</button>
          </form>
          <div className="mt-7 overflow-x-auto">
            <table className="w-full min-w-[900px] text-left text-sm"><thead className="text-xs uppercase tracking-wider text-white/45"><tr><th className="pb-4">Candidat</th><th>Contact</th><th>Naissance</th><th title="Âge à la date de référence du festival">Âge*</th><th>Ville</th><th>Discipline</th><th>Statut</th><th>Date</th></tr></thead><tbody>{data.candidates.map((candidate) => <tr key={candidate.id} className="border-t border-white/8"><td className="py-4 font-bold">{candidate.name}</td><td>{candidate.phone}</td><td>{candidate.dateOfBirth ? candidate.dateOfBirth : <span className="text-yellow-300/80" title="Date de naissance à compléter">À revoir</span>}</td><td>{candidate.calculatedAge ?? "—"}</td><td>{candidate.city || "—"}</td><td>{candidate.discipline || "—"}</td><td>{candidate.status}</td><td>{candidate.submittedAt.toLocaleDateString("fr-FR")}</td></tr>)}</tbody></table>
            <p className="mt-3 text-xs text-white/40">* Âge calculé au {data.ageReferenceDate}, date de référence provisoire de l’édition (jamais stocké). « À revoir » signale une date de naissance manquante à compléter manuellement.</p>
          </div>
          {!data.candidates.length && <p className="py-10 text-center text-white/50">Aucun résultat.</p>}
          <nav aria-label="Pagination" className="mt-6 flex items-center justify-between text-sm"><span>Page {data.page} sur {totalPages}</span><div className="flex gap-2">{data.page > 1 && <Link href={{ query: { ...filters, page: data.page - 1 } }} className="rounded-full border border-white/15 px-4 py-2">Précédent</Link>}{data.page < totalPages && <Link href={{ query: { ...filters, page: data.page + 1 } }} className="rounded-full border border-white/15 px-4 py-2">Suivant</Link>}</div></nav>
        </section>
      </div>
    </main>
  );
}
