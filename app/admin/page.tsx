import type { Metadata } from "next";
import {
  BarChart3,
  Building2,
  ChartNoAxesCombined,
  Clock3,
  LockKeyhole,
  MapPin,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

import Badge from "@/components/ui/Badge";
import GradientButton from "@/components/ui/GradientButton";
import PremiumCard from "@/components/ui/PremiumCard";
import SectionHeader from "@/components/ui/SectionHeader";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: "Dashboard admin",
    description:
      "Dashboard preparatoire Festival Talent 2027 pour la future gestion securisee des candidatures et statistiques.",
    path: "/admin",
  }),
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

const dashboardCards = [
  {
    title: "Candidatures reçues",
    value: "Bientôt",
    label: "Compteur sécurisé",
    icon: Users,
    tone: "gold",
  },
  {
    title: "Disciplines",
    value: "8+",
    label: "Vue préparatoire",
    icon: BarChart3,
    tone: "default",
  },
  {
    title: "Villes",
    value: "Zones",
    label: "Agrégation future",
    icon: MapPin,
    tone: "default",
  },
  {
    title: "Pré-sélections",
    value: "2026-27",
    label: "Suivi opérationnel",
    icon: Building2,
    tone: "default",
  },
  {
    title: "Statistiques à venir",
    value: "V7",
    label: "Après auth admin",
    icon: ChartNoAxesCombined,
    tone: "gold",
  },
] as const;

const pipelineSteps = [
  "Authentification admin",
  "Rôles et permissions",
  "Lecture serveur uniquement",
  "Exports contrôlés",
];

export default function AdminDashboardPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(234,179,8,0.16),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(185,28,28,0.16),transparent_30%),linear-gradient(to_bottom,#000,rgba(12,9,4,0.98),#000)]" />

      <section className="relative px-6 pb-16 pt-32 sm:px-10 lg:px-20 lg:pt-40">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Admin préparatoire"
            icon={ShieldCheck}
            align="center"
            className="max-w-5xl"
            title={
              <>
                Dashboard
                <span className="block bg-gradient-to-r from-yellow-200 via-yellow-500 to-red-500 bg-clip-text text-transparent">
                  Festival Talent
                </span>
              </>
            }
            description="Un espace visuel pour préparer la future gestion des candidatures, disciplines, villes, pré-sélections et statistiques sans exposer de données privées."
          />

          <div className="mt-10 flex justify-center">
            <Badge icon={LockKeyhole} color="red" size="md">
              Données réelles non exposées
            </Badge>
          </div>
        </div>
      </section>

      <section className="relative px-6 pb-16 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <PremiumCard tone="gold" className="p-7 sm:p-9">
            <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
              <div>
                <LockKeyhole className="text-yellow-300" size={34} />
                <h2 className="mt-5 text-3xl font-black uppercase leading-tight text-white sm:text-4xl">
                  Accès sécurisé à venir
                </h2>
              </div>

              <p className="text-base leading-8 text-white/68">
                L&apos;accès aux données réelles sera sécurisé dans une prochaine
                version. Cette page utilise uniquement des cartes mockées et ne
                lit aucune information privée de la table `preselections`.
              </p>
            </div>
          </PremiumCard>
        </div>
      </section>

      <section className="relative px-6 pb-16 sm:px-10 lg:px-20">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2 xl:grid-cols-5">
          {dashboardCards.map((card) => {
            const Icon = card.icon;

            return (
              <PremiumCard
                key={card.title}
                tone={card.tone}
                className="p-6 transition duration-300 hover:-translate-y-1"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-yellow-400/30 bg-yellow-400/10 text-yellow-300">
                  <Icon size={24} />
                </div>

                <p className="mt-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/45">
                  {card.title}
                </p>
                <p className="mt-3 text-3xl font-black uppercase text-white">
                  {card.value}
                </p>
                <p className="mt-2 text-sm text-white/55">{card.label}</p>
              </PremiumCard>
            );
          })}
        </div>
      </section>

      <section className="relative px-6 pb-28 sm:px-10 lg:px-20">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <PremiumCard className="p-7 sm:p-9">
            <div className="flex items-center gap-4">
              <Clock3 className="text-yellow-300" size={30} />
              <div>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-yellow-300">
                  Roadmap admin
                </p>
                <h2 className="mt-2 text-2xl font-black uppercase text-white">
                  Gestion des inscriptions
                </h2>
              </div>
            </div>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {pipelineSteps.map((step) => (
                <div
                  key={step}
                  className="rounded-lg border border-white/10 bg-black/35 p-4 text-sm font-bold uppercase tracking-[0.14em] text-white/70"
                >
                  {step}
                </div>
              ))}
            </div>
          </PremiumCard>

          <PremiumCard tone="gold" className="p-7 sm:p-9">
            <Sparkles className="text-yellow-300" size={30} />
            <h2 className="mt-5 text-2xl font-black uppercase text-white">
              Version préparatoire
            </h2>
            <p className="mt-4 text-sm leading-7 text-white/62">
              La V6 prépare l&apos;interface et les services, mais la connexion
              aux données réelles attendra l&apos;authentification admin, les rôles
              et les règles RLS.
            </p>
            <div className="mt-7">
              <GradientButton href="/stats" variant="outline" icon={BarChart3}>
                Voir les stats publiques
              </GradientButton>
            </div>
          </PremiumCard>
        </div>
      </section>
    </main>
  );
}
