import {
  Handshake,
  MapPin,
  Mic2,
  Sparkles,
  Star,
  Users,
} from "lucide-react";

import GradientButton from "@/components/ui/GradientButton";
import PremiumCard from "@/components/ui/PremiumCard";
import SectionHeader from "@/components/ui/SectionHeader";

const communityCards = [
  {
    title: "Candidats",
    text: "Des jeunes talents qui entrent dans un parcours d'expression, de progression et de visibilite.",
    icon: Users,
  },
  {
    title: "Coachs & mentors",
    text: "Un encadrement humain autour de la confiance, de la discipline et du leadership.",
    icon: Sparkles,
  },
  {
    title: "Artistes",
    text: "Des artistes confirmes qui inspirent la nouvelle generation et amplifient la scene.",
    icon: Mic2,
  },
  {
    title: "Partenaires",
    text: "Des institutions, medias et entreprises engagees pour construire des opportunites durables.",
    icon: Handshake,
  },
  {
    title: "Regions",
    text: "Une dynamique ouverte aux zones, villes et territoires qui portent les talents de demain.",
    icon: MapPin,
  },
  {
    title: "Opportunites",
    text: "Pre-selections, scenes, collaborations, formation, accompagnement et ouverture internationale.",
    icon: Star,
  },
];

export default function CommunitySection() {
  return (
    <section className="relative overflow-hidden bg-black px-6 py-24 text-white sm:px-10 lg:px-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(234,179,8,0.12),transparent_36%),radial-gradient(circle_at_bottom_left,rgba(127,29,29,0.12),transparent_34%)]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <SectionHeader
            eyebrow="Communaute"
            icon={Users}
            title={
              <>
                Une grande famille
                <span className="block bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-700 bg-clip-text text-transparent">
                  de talents
                </span>
              </>
            }
            description="Festival Talent 2027 reunit des jeunes talents, des coachs, des artistes, des partenaires et des professionnels engages pour construire un ecosysteme d'opportunites."
            className="max-w-4xl"
          />

          <div className="lg:justify-self-end">
            <GradientButton href="/communaute">
              Decouvrir la communaute
            </GradientButton>
          </div>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {communityCards.map((card) => {
            const Icon = card.icon;

            return (
              <PremiumCard key={card.title} className="p-6 transition duration-300 hover:-translate-y-1">
                <Icon className="text-yellow-300" size={30} />
                <h3 className="mt-5 text-xl font-black uppercase text-white">
                  {card.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-white/62">
                  {card.text}
                </p>
              </PremiumCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
