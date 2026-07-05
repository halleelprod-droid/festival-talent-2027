export type CmsCollection =
  | "texts"
  | "partners"
  | "artists"
  | "activities"
  | "programme"
  | "faq"
  | "news";

export type CmsEntry = {
  id: string;
  collection: CmsCollection;
  locale: "fr" | "en" | "it" | "es" | "ar";
  title: string;
  value: string;
  status: "draft" | "published";
  updatedAt: string;
};

export const cmsEntries: CmsEntry[] = [
  {
    id: "home-platform-title-fr",
    collection: "texts",
    locale: "fr",
    title: "Promesse plateforme",
    value: "Festival Talent devient une plateforme culturelle durable, multi-edition et multi-pays.",
    status: "published",
    updatedAt: "2026-07-03",
  },
  {
    id: "faq-security-fr",
    collection: "faq",
    locale: "fr",
    title: "Les donnees candidats sont-elles publiques ?",
    value: "Non. Les donnees personnelles des candidats restent protegees et ne doivent jamais etre exposees publiquement.",
    status: "published",
    updatedAt: "2026-07-03",
  },
];
