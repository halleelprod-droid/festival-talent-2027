import { publicContact } from "@/config/constants";
import { siteUrl } from "@/lib/seo";

export const appUrls = {
  site: siteUrl,
  home: "/fr",
  news: "/news",
  team: "/team",
  contact: "/contact",
  candidate: "/candidat",
  admin: "/admin",
  stats: "/stats",
  preselections: "/preselections",
  partners: "/partners",
  programme: "/programme",
  activities: "/activites",
  artists: "/artists",
  tickets: "/tickets",
  media: "/media",
  whatsapp:
    `https://wa.me/${publicContact.whatsappInternational}?text=Bonjour%20Festival%20Talent%2C%20je%20souhaite%20avoir%20des%20informations.`,
} as const;
