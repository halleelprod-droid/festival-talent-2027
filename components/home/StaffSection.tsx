"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Briefcase,
  Crown,
  Gem,
  Handshake,
  Megaphone,
  MonitorSmartphone,
  Music2,
  RadioTower,
  Rocket,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type StaffMember = {
  name: string;
  role: string;
  subtitle?: string;
  department: string;
  description: string;
  icon: LucideIcon;
  initials: string;
  image?: string;
  logo?: {
    src: string;
    alt: string;
  };
  achievements?: string[];
  featured?: boolean;
};

const staffMembers: StaffMember[] = [
  {
    name: "ZAIRAH DIAMANT NOIRE",
    role: "Initiatrice du projet",
    department: "Direction",
    description:
      "Porte la vision fondatrice de Festival Talent 2027 et incarne l'ambition de reveler les talents, d'inspirer la jeunesse et de construire un evenement culturel majeur.",
    icon: Gem,
    image: "/images/staff/zairah-diamant-noire.jpg",
    initials: "ZDN",
    featured: true,
  },
  {
    name: "Ibrahima Khalilou Danso",
    role: "Directeur Exécutif",
    department: "Direction",
    description:
      "Assure la coordination generale, le pilotage operationnel et le suivi des grandes orientations du festival.",
    icon: Briefcase,
    initials: "IKD",
  },
  {
    name: "Masseck Sy",
    role: "Cofondateur",
    department: "Direction",
    description:
      "Participe a la vision strategique, au developpement institutionnel et a la construction globale de Festival Talent 2027.",
    icon: Crown,
    image: "/images/staff/masseck-sy.jpg",
    initials: "MS",
  },
  {
    name: "Pierre Ndiaye",
    role: "Directeur des Partenariats, Communication & Événementiel",
    subtitle: "CEO de PIN EVENTS • Fondateur de DUNYA",
    department: "Partenariats",
    description:
      "Entrepreneur sénégalais spécialisé dans l’événementiel, la communication, l’influence digitale et le management artistique, Pierre Ndiaye accompagne Festival Talent 2027 dans le développement des partenariats, la stratégie de communication et les activations événementielles.",
    icon: Handshake,
    image: "/images/staff/pierre-ndiaye.jpg",
    logo: {
      src: "/images/partners/pin-events.png",
      alt: "Logo PIN EVENTS",
    },
    initials: "PN",
    achievements: [
      "CEO de PIN EVENTS",
      "Fondateur de DUNYA",
      "Initiateur du Festival KeuMeuFeu Wake UP",
      "Coorganisateur des Sénégal TikTok Awards 2022",
      "Coorganisateur du Gala des Étoiles",
      "Manager d’artistes",
    ],
  },
  {
    name: "Mamadou Ngom",
    role: "Responsable Pôle Régie",
    department: "Organisation",
    description:
      "Coordonne la regie, l'organisation technique, les besoins terrain et la fluidite operationnelle des differentes activites.",
    icon: RadioTower,
    image: "/images/staff/mamadou-ngom.jpg",
    initials: "MN",
  },
  {
    name: "Ibrahima Fall",
    role: "Développeur Web / Conception Digitale",
    department: "Digital",
    description:
      "Responsable de la conception, du deploiement et de l'experience digitale du site officiel Festival Talent 2027.",
    icon: MonitorSmartphone,
    initials: "IF",
  },
  {
    name: "Babacar Ndour",
    role: "Responsable Communication",
    department: "Communication",
    description:
      "Pilote la communication, l'image publique, les annonces officielles, les medias et la visibilite digitale du festival.",
    icon: Megaphone,
    image: "/images/staff/babacar-ndour.jpg",
    initials: "BN",
  },
  {
    name: "Abdourahmane Ndiaye",
    role: "Responsable Pôle Entrepreneuriat",
    department: "Entrepreneuriat",
    description:
      "Coordonne le pole entrepreneuriat, accompagne les porteurs de projets et participe a la valorisation des jeunes entrepreneurs.",
    icon: Rocket,
    image: "/images/staff/abdourahmane-ndiaye.jpg",
    initials: "AN",
  },
  {
    name: "DJ You",
    role: "Directeur Artistique",
    department: "Artistique",
    description:
      "Assure la direction artistique, accompagne la programmation creative et participe a la coherence musicale, scenique et culturelle de l'evenement.",
    icon: Music2,
    image: "/images/staff/dj-you.jpg",
    initials: "DY",
  },
];

function StaffImage({
  src,
  alt,
  initials,
}: {
  src?: string;
  alt: string;
  initials: string;
}) {
  const [imageError, setImageError] = useState(false);

  if (!src || imageError) {
    return (
      <div className="flex h-full items-center justify-center bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.28),transparent_40%),linear-gradient(135deg,#050505,#161616,#050505)]">
        <div className="flex h-28 w-28 items-center justify-center rounded-full border border-yellow-400/35 bg-yellow-400/10 text-3xl font-black text-yellow-300 shadow-2xl shadow-yellow-900/30 sm:h-32 sm:w-32 sm:text-4xl">
          {initials}
        </div>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
      onError={() => setImageError(true)}
      className="object-cover object-top transition duration-700 group-hover:scale-105"
    />
  );
}

function StaffLogo({ logo }: { logo?: { src: string; alt: string } }) {
  const [logoError, setLogoError] = useState(false);

  if (!logo || logoError) {
    return null;
  }

  return (
    <div className="mt-6 w-fit rounded-2xl border border-yellow-400/25 bg-black/45 p-3">
      <Image
        src={logo.src}
        alt={logo.alt}
        width={150}
        height={70}
        onError={() => setLogoError(true)}
        className="h-12 w-auto object-contain"
      />
    </div>
  );
}

export default function StaffSection() {
  return (
    <section className="relative overflow-hidden bg-black px-6 py-28 text-white sm:px-10 lg:px-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.18),transparent_35%),linear-gradient(to_bottom,#000,rgba(10,10,10,0.96),#000)]" />
      <div className="absolute -left-32 top-20 h-80 w-80 rounded-full bg-yellow-500/10 blur-3xl" />
      <div className="absolute -right-32 bottom-20 h-80 w-80 rounded-full bg-yellow-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-4xl text-center"
        >
          <p className="text-sm font-bold uppercase tracking-[0.45em] text-yellow-400">
            L&apos;equipe officielle
          </p>

          <h2 className="mt-6 text-4xl font-black uppercase leading-tight tracking-tight text-white sm:text-5xl lg:text-7xl">
            L&apos;equipe qui construit
            <span className="block bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-700 bg-clip-text text-transparent">
              Festival Talent 2027
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-white/65 sm:text-lg">
            Une equipe engagee oeuvre pour batir une experience internationale
            autour de la jeunesse, de la culture, de la musique, de la mode, de
            l&apos;innovation, du leadership et de l&apos;impact.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {staffMembers.map((member, index) => {
            const Icon = member.icon;

            return (
              <motion.article
                key={member.name}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.6 }}
                whileHover={{ y: -7 }}
                className={`group relative overflow-hidden rounded-[2rem] border bg-white/[0.04] shadow-2xl shadow-black/30 backdrop-blur-xl transition duration-300 hover:border-yellow-400/50 hover:bg-yellow-400/[0.06] ${
                  member.featured
                    ? "border-yellow-400/45 xl:col-span-3"
                    : member.name === "Pierre Ndiaye"
                      ? "border-yellow-400/35 bg-yellow-400/[0.055] xl:col-span-2"
                    : "border-white/10"
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />

                <div
                  className={`grid ${
                    member.featured || member.name === "Pierre Ndiaye"
                      ? "lg:grid-cols-[0.9fr_1.1fr]"
                      : ""
                  }`}
                >
                  <div
                    className={`relative overflow-hidden bg-zinc-950 ${
                      member.featured || member.name === "Pierre Ndiaye"
                        ? "h-[430px] lg:h-full"
                        : "h-80"
                    }`}
                  >
                    <StaffImage
                      src={member.image}
                      alt={member.name}
                      initials={member.initials}
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                    <div className="absolute bottom-5 left-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-yellow-400/30 bg-black/60 text-yellow-300 backdrop-blur-md transition duration-300 group-hover:scale-110">
                      <Icon size={23} />
                    </div>
                  </div>

                  <div
                    className={`relative p-7 ${
                      member.featured || member.name === "Pierre Ndiaye"
                        ? "flex flex-col justify-center lg:p-12"
                        : ""
                    }`}
                  >
                    {member.featured && (
                      <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-yellow-300">
                        Vision fondatrice
                      </div>
                    )}

                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full border border-yellow-400/25 bg-yellow-400/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-yellow-300">
                        {member.department}
                      </span>

                      <span className="text-xs font-bold uppercase tracking-[0.2em] text-yellow-300">
                        {member.role}
                      </span>
                    </div>

                    <h3
                      className={`mt-4 font-black uppercase text-white ${
                        member.featured
                          ? "text-4xl sm:text-5xl"
                          : "text-2xl"
                      }`}
                    >
                      {member.name}
                    </h3>

                    {member.subtitle && (
                      <p className="mt-3 text-sm font-black uppercase tracking-[0.18em] text-yellow-300/90">
                        {member.subtitle}
                      </p>
                    )}

                    <p
                      className={`mt-4 leading-7 text-white/60 ${
                        member.featured || member.name === "Pierre Ndiaye"
                          ? "max-w-2xl text-base"
                          : "text-sm"
                      }`}
                    >
                      {member.description}
                    </p>

                    <StaffLogo logo={member.logo} />

                    {member.achievements && (
                      <div className="mt-6 flex flex-wrap gap-2">
                        {member.achievements.map((achievement) => (
                          <span
                            key={achievement}
                            className="rounded-full border border-white/10 bg-black/35 px-4 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-white/70"
                          >
                            {achievement}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="mt-16 rounded-[2rem] border border-yellow-400/20 bg-yellow-400/[0.06] p-8 text-center backdrop-blur-xl"
        >
          <p className="text-xl font-semibold leading-8 text-white/80">
            Une equipe portee par une meme ambition : reveler les talents,
            construire l&apos;avenir et positionner Festival Talent comme un
            rendez-vous culturel majeur au Senegal et a l&apos;international.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
