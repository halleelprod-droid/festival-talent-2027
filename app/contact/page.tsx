import type { Metadata } from "next";
import {
  Handshake,
  MailQuestion,
  Megaphone,
  MessageCircle,
  Sparkles,
  UserPlus,
} from "lucide-react";

import GradientButton from "@/components/ui/GradientButton";
import PremiumCard from "@/components/ui/PremiumCard";
import SectionHeader from "@/components/ui/SectionHeader";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact",
  description:
    "Contacter Festival Talent 2027 pour les partenariats, pre-selections, medias, sponsors et informations generales.",
  path: "/contact",
});

const whatsappLink =
  "https://wa.me/221781948606?text=Bonjour%20Festival%20Talent%2C%20je%20souhaite%20avoir%20des%20informations.";

const contactTopics = [
  {
    title: "Partenariats",
    description:
      "Construire une collaboration officielle, institutionnelle ou terrain avec Festival Talent 2027.",
    icon: Handshake,
  },
  {
    title: "Pre-selections",
    description:
      "Obtenir des informations sur les inscriptions, zones, disciplines et prochaines etapes.",
    icon: UserPlus,
  },
  {
    title: "Medias",
    description:
      "Demander une information officielle, une couverture, une interview ou un communique.",
    icon: Megaphone,
  },
  {
    title: "Sponsors",
    description:
      "Explorer les activations marque, visibilite, hospitality, stands et experiences partenaires.",
    icon: Sparkles,
  },
  {
    title: "Informations generales",
    description:
      "Recevoir une orientation rapide vers le bon pole de l'organisation Festival Talent.",
    icon: MailQuestion,
  },
];

export default function ContactPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(234,179,8,0.14),transparent_34%),linear-gradient(to_bottom,#000,rgba(11,9,4,0.98),#000)]" />

      <section className="relative px-6 pb-16 pt-32 sm:px-10 lg:px-20 lg:pt-40">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Contact officiel"
            icon={MessageCircle}
            align="center"
            className="max-w-5xl"
            title={
              <>
                Parlons
                <span className="block bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-700 bg-clip-text text-transparent">
                  du projet
                </span>
              </>
            }
            description="Une page claire pour les partenaires, sponsors, medias, talents et demandes generales. Le contact prioritaire reste WhatsApp."
          />

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <GradientButton href={whatsappLink} target="_blank" icon={MessageCircle}>
              Contacter sur WhatsApp
            </GradientButton>
            <GradientButton href="/partners" variant="outline" icon={Handshake}>
              Devenir partenaire
            </GradientButton>
            <GradientButton href="/preselections" variant="outline" icon={UserPlus}>
              Pre-selections
            </GradientButton>
          </div>
        </div>
      </section>

      <section className="relative px-6 pb-16 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-5xl">
          <PremiumCard tone="gold" className="p-8 text-center sm:p-10">
            <p className="text-xs font-black uppercase tracking-[0.28em] text-yellow-300">
              WhatsApp officiel
            </p>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 block text-4xl font-black uppercase tracking-tight text-white transition hover:text-yellow-200 sm:text-6xl"
            >
              781 948 606
            </a>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/60 sm:text-base">
              Pour une reponse rapide, precise le motif de ta demande :
              partenariat, pre-selection, media, sponsoring ou information generale.
            </p>
          </PremiumCard>
        </div>
      </section>

      <section className="relative px-6 pb-28 sm:px-10 lg:px-20">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2 xl:grid-cols-5">
          {contactTopics.map((topic) => {
            const Icon = topic.icon;

            return (
              <PremiumCard key={topic.title} className="p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-yellow-400/30 bg-yellow-400/10 text-yellow-300">
                  <Icon size={24} />
                </div>

                <h2 className="mt-5 text-xl font-black uppercase leading-tight text-white">
                  {topic.title}
                </h2>

                <p className="mt-4 text-sm leading-7 text-white/58">
                  {topic.description}
                </p>
              </PremiumCard>
            );
          })}
        </div>
      </section>
    </main>
  );
}
