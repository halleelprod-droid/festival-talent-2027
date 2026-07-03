export type PlatformStatus = "Vision" | "Bientôt" | "Préparation" | "Futur";

export type PlatformItem = {
  key: "os" | "billetterie" | "tv" | "academie" | "partenaires" | "mobile" | "ia";
  title: string;
  slug: string;
  description: string;
  status: PlatformStatus;
  features: string[];
  cta: {
    label: string;
    href: string;
  };
};

export const platformItems: PlatformItem[] = [
  {
    key: "os",
    title: "Festival Talent OS",
    slug: "/os",
    status: "Vision",
    description:
      "Festival Talent OS est la vision long terme de la plateforme numérique Festival Talent : un système destiné à accompagner les candidats, partenaires, médias, équipes et organisateurs sur plusieurs éditions.",
    features: [
      "Gestion des candidats",
      "Gestion des activités",
      "Gestion des partenaires",
      "Gestion des médias",
      "Billetterie future",
      "Dashboard administrateur",
      "Application mobile future",
      "Festival TV future",
      "Académie future",
    ],
    cta: {
      label: "Découvrir la vision",
      href: "/os",
    },
  },
  {
    key: "billetterie",
    title: "Billetterie future",
    slug: "/billetterie",
    status: "Bientôt",
    description:
      "La billetterie officielle est préparée comme un futur espace de réservation, contrôle d'accès et tickets activités, sans paiement réel en V8.",
    features: [
      "Billetterie officielle bientôt disponible",
      "Paiement mobile à venir",
      "QR Code à venir",
      "Contrôle d'accès à venir",
      "Tickets activités à venir",
      "Billets Festival à venir",
    ],
    cta: {
      label: "Voir la billetterie",
      href: "/billetterie",
    },
  },
  {
    key: "tv",
    title: "Festival TV",
    slug: "/tv",
    status: "Préparation",
    description:
      "Festival TV prépare un futur espace vidéo pour lives, replays, interviews, coulisses, performances, archives et couverture média.",
    features: [
      "Lives à venir",
      "Replays à venir",
      "Interviews",
      "Coulisses",
      "Performances",
      "Archives",
      "Couverture média",
    ],
    cta: {
      label: "Découvrir Festival TV",
      href: "/tv",
    },
  },
  {
    key: "academie",
    title: "Académie",
    slug: "/academie",
    status: "Futur",
    description:
      "L'Académie Festival Talent prépare un futur cadre de masterclass, coaching, mentorat et formation progressive.",
    features: [
      "Masterclass",
      "Coaching",
      "Formation artistes",
      "Formation influenceurs",
      "Formation entrepreneurs",
      "Formation digitale",
      "Mentorat",
      "Certification future",
    ],
    cta: {
      label: "Voir l'académie",
      href: "/academie",
    },
  },
  {
    key: "partenaires",
    title: "Portail partenaires",
    slug: "/portail-partenaires",
    status: "Préparation",
    description:
      "Le portail partenaires prépare un futur espace pour sponsors, visibilité, activations terrain, reporting et accès média.",
    features: [
      "Opportunités sponsoring",
      "Packs partenaires",
      "Visibilité",
      "Activation terrain",
      "Reporting futur",
      "Accès média futur",
      "Espace partenaire futur",
    ],
    cta: {
      label: "Voir le portail",
      href: "/portail-partenaires",
    },
  },
  {
    key: "mobile",
    title: "Application mobile",
    slug: "/mobile",
    status: "Vision",
    description:
      "L'application mobile est une vision future de la plateforme Festival Talent pour suivre candidats, programme, médias, actualités et billets futurs.",
    features: [
      "Suivi candidat",
      "Notifications",
      "Programme",
      "Billetterie future",
      "QR Code futur",
      "Carte des activités",
      "Médias",
      "Actualités",
    ],
    cta: {
      label: "Voir l'application",
      href: "/mobile",
    },
  },
  {
    key: "ia",
    title: "IA Festival Talent",
    slug: "/ia",
    status: "Futur",
    description:
      "L'assistant IA Festival Talent sera développé progressivement pour orienter, informer et aider sans remplacer l'équipe officielle.",
    features: [
      "Assistant candidat",
      "FAQ intelligente",
      "Orientation vers les disciplines",
      "Recherche d'activités",
      "Aide partenaires",
      "Analyse statistique future",
    ],
    cta: {
      label: "Explorer la vision IA",
      href: "/ia",
    },
  },
];

export function getPlatformItem(key: PlatformItem["key"]) {
  const item = platformItems.find((platformItem) => platformItem.key === key);

  if (!item) {
    throw new Error(`Unknown platform item: ${key}`);
  }

  return item;
}

export const platformFooterLinks = platformItems.map((item) => ({
  label: item.title,
  href: item.slug,
}));
