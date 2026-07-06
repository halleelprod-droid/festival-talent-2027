import type {
  TicketAccountFeature,
  TicketComparisonFeature,
  TicketFaqItem,
  TicketFutureCapability,
  TicketPass,
  TicketPaymentMethod,
  TicketProcessStep,
} from "@/types/tickets";

export const ticketPasses: TicketPass[] = [
  {
    id: "standard",
    name: "Pass Standard",
    badge: "Experience officielle",
    description:
      "Pour vivre Festival Talent 2027 avec un acces clair aux grands moments publics.",
    benefits: ["Acces Festival", "Concert", "Village", "Programme officiel"],
    icon: "ticket",
    color: "white",
    ctaLabel: "Reserver mon Pass",
    availability: "coming-soon",
  },
  {
    id: "premium",
    name: "Pass Premium",
    badge: "Confort renforce",
    description:
      "Pour profiter d'une experience plus fluide, plus confortable et plus proche des temps forts.",
    benefits: ["Zone Premium", "Acces rapide", "Goodies", "Support prioritaire"],
    icon: "sparkles",
    color: "gold",
    ctaLabel: "Decouvrir le Premium",
    availability: "coming-soon",
    highlighted: true,
  },
  {
    id: "vip",
    name: "Pass VIP",
    badge: "Experience prestige",
    description:
      "Pour les invites, leaders, entrepreneurs et profils qui veulent vivre l'evenement au plus haut niveau.",
    benefits: ["Lounge", "Cocktail", "Rencontre artistes", "Parking"],
    icon: "crown",
    color: "gold",
    ctaLabel: "Demander l'acces VIP",
    availability: "request-only",
  },
  {
    id: "partner",
    name: "Pass Partenaire",
    badge: "Mission & impact",
    description:
      "Pour les partenaires qui rejoignent Festival Talent comme une mission, pas comme un simple evenement.",
    benefits: ["Accueil dedie", "Networking", "Visibilite", "Acces institutionnel"],
    icon: "handshake",
    color: "red",
    ctaLabel: "Contacter l'equipe",
    availability: "request-only",
  },
  {
    id: "press",
    name: "Pass Presse",
    badge: "Media officiel",
    description:
      "Pour les journalistes, medias et createurs accredites par l'organisation.",
    benefits: ["Accreditation", "Zone media", "Kit presse", "Support interviews"],
    icon: "newspaper",
    color: "white",
    ctaLabel: "Demander une accreditation",
    availability: "request-only",
  },
  {
    id: "staff",
    name: "Pass Staff",
    badge: "Equipe Festival Talent",
    description:
      "Pour les equipes operationnelles, techniques, production et organisation.",
    benefits: ["Acces equipe", "Zones operationnelles", "Support", "Identification"],
    icon: "shield",
    color: "white",
    ctaLabel: "Acces reserve",
    availability: "reserved",
  },
  {
    id: "artist",
    name: "Pass Artiste",
    badge: "Scene & production",
    description:
      "Pour les artistes, talents programmes et profils valides par la production.",
    benefits: ["Acces artiste", "Backstage encadre", "Production", "Accueil dedie"],
    icon: "mic",
    color: "gold",
    ctaLabel: "Acces production",
    availability: "reserved",
  },
  {
    id: "backstage",
    name: "Pass Backstage",
    badge: "Acces ultra limite",
    description:
      "Pour les profils autorises uniquement par l'organisation et la production officielle.",
    benefits: ["Backstage", "Acces controle", "Brief securite", "Validation manuelle"],
    icon: "lock",
    color: "red",
    ctaLabel: "Sur invitation",
    availability: "reserved",
  },
];

export const ticketComparison: TicketComparisonFeature[] = [
  { label: "Acces Festival", standard: true, premium: true, vip: true },
  { label: "Concert", standard: true, premium: true, vip: true },
  { label: "Village", standard: true, premium: true, vip: true },
  { label: "Zone Premium", standard: false, premium: true, vip: true },
  { label: "Lounge", standard: false, premium: false, vip: true },
  { label: "Cocktail", standard: false, premium: false, vip: true },
  { label: "Rencontre artistes", standard: false, premium: false, vip: true },
  { label: "Parking", standard: false, premium: false, vip: true },
  { label: "Acces rapide", standard: false, premium: true, vip: true },
  { label: "Goodies", standard: false, premium: true, vip: true },
];

export const ticketProcessSteps: TicketProcessStep[] = [
  {
    title: "Choix du Pass",
    description: "Le visiteur compare les experiences et choisit le niveau adapte.",
  },
  {
    title: "Informations",
    description: "Les informations seront collectees uniquement quand la billetterie sera ouverte.",
  },
  {
    title: "Paiement (simulation)",
    description: "Aucun paiement n'est connecte dans cette version preparatoire.",
  },
  {
    title: "Confirmation",
    description: "La confirmation officielle sera envoyee apres validation du futur systeme.",
  },
  {
    title: "Billet electronique",
    description: "Le billet numerique sera genere uniquement dans la phase contractuelle paiement.",
  },
];

export const ticketPaymentMethods: TicketPaymentMethod[] = [
  { name: "Wave", status: "coming-soon", region: "local" },
  { name: "Orange Money", status: "coming-soon", region: "local" },
  { name: "Free Money", status: "coming-soon", region: "local" },
  { name: "Carte Bancaire", status: "coming-soon", region: "international" },
  { name: "Stripe", status: "planned", region: "international" },
  { name: "PayPal", status: "planned", region: "international" },
  { name: "Apple Pay", status: "planned", region: "international" },
  { name: "Google Pay", status: "planned", region: "international" },
];

export const ticketAccountFeatures: TicketAccountFeature[] = [
  { title: "Mes billets", description: "Lister les futurs pass et leurs statuts." },
  { title: "Historique", description: "Afficher les actions liees aux reservations futures." },
  { title: "Factures", description: "Preparer les recus lorsque la facturation sera active." },
  { title: "Telechargements", description: "Regrouper billets, justificatifs et documents." },
  { title: "Wallet", description: "Preparer Apple Wallet et Google Wallet." },
  { title: "Support", description: "Centraliser l'aide billetterie et les demandes." },
];

export const ticketFaq: TicketFaqItem[] = [
  {
    question: "Puis-je transferer mon billet ?",
    answer:
      "La politique de transfert sera annoncee avec les conditions officielles de billetterie.",
  },
  {
    question: "Puis-je etre rembourse ?",
    answer:
      "Les conditions de remboursement seront publiees avant toute ouverture de paiement.",
  },
  {
    question: "Le billet est-il nominatif ?",
    answer:
      "Le modele nominatif sera confirme selon les exigences de securite et de controle d'acces.",
  },
  {
    question: "Comment fonctionne le QR Code ?",
    answer:
      "Le QR Code officiel sera genere apres l'ouverture de la billetterie. Aucun QR reel n'est emis aujourd'hui.",
  },
  {
    question: "Quels paiements seront disponibles ?",
    answer:
      "Wave, Orange Money, Free Money, carte bancaire, Stripe, PayPal, Apple Pay et Google Pay sont prepares, mais non connectes.",
  },
];

export const ticketFutureCapabilities: TicketFutureCapability[] = [
  {
    title: "QR Code",
    description: "Generation unique, signature serveur, expiration et controle anti-fraude.",
    riskLevel: "high",
  },
  {
    title: "Validation & Scanner",
    description: "Application de scan, mode offline controle, synchronisation et audit logs.",
    riskLevel: "high",
  },
  {
    title: "Paiement",
    description: "Prestataires locaux et internationaux connectes uniquement via contrat dedie.",
    riskLevel: "high",
  },
  {
    title: "PDF",
    description: "Generation serveur des billets et recus avec stockage securise.",
    riskLevel: "medium",
  },
  {
    title: "Emails & Notifications",
    description: "Confirmation, rappel, support et alertes operationnelles centralisees.",
    riskLevel: "medium",
  },
  {
    title: "Wallet Apple / Google",
    description: "Pass numeriques signes, versionnes et compatibles mobile.",
    riskLevel: "medium",
  },
];
