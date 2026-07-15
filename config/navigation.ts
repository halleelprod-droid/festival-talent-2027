export type NavigationLink = {
  label: string;
  href: string;
};

export type FooterNavigationGroup = {
  title: string;
  links: NavigationLink[];
};

export const primaryNavigationLinks: NavigationLink[] = [
  { label: "Accueil", href: "/fr" },
  { label: "Programme", href: "/programme" },
  { label: "Activités", href: "/activites" },
  { label: "Pré-sélections", href: "/preselections" },
  { label: "Artistes", href: "/artists" },
  { label: "Partenaires", href: "/partners" },
  { label: "Média", href: "/media" },
  { label: "Tickets", href: "/tickets" },
];

export const moreNavigationLinks: NavigationLink[] = [
  { label: "Institution", href: "/institution" },
  { label: "Business Club", href: "/business-club" },
  { label: "Documents Officiels", href: "/documents" },
  { label: "Banques & Finance", href: "/finance/banques" },
  { label: "Plateforme", href: "/os" },
  { label: "Actualités", href: "/news" },
  { label: "Communauté", href: "/communaute" },
  { label: "Mentors", href: "/mentors" },
  { label: "Équipe", href: "/team" },
  { label: "Espace candidat", href: "/candidat" },
  { label: "Contact", href: "/contact" },
];

export const footerNavigationGroups: FooterNavigationGroup[] = [
  {
    title: "Festival",
    links: [
      { label: "Accueil", href: "/fr" },
      { label: "Programme", href: "/programme" },
      { label: "Activités", href: "/activites" },
      { label: "Artistes", href: "/artists" },
      { label: "Média", href: "/media" },
      { label: "Tickets", href: "/tickets" },
    ],
  },
  {
    title: "Organisation",
    links: [
      { label: "Équipe", href: "/team" },
      { label: "Mentors & Coachs", href: "/mentors" },
    ],
  },
  {
    title: "Participer",
    links: [
      { label: "Pré-sélections", href: "/preselections" },
      { label: "Espace candidat", href: "/candidat" },
      { label: "Communauté", href: "/communaute" },
      { label: "Opportunités", href: "/opportunites" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Partenaires",
    links: [
      { label: "Partenaires", href: "/partners" },
      { label: "Business Club", href: "/business-club" },
      { label: "Sponsors", href: "/sponsors" },
      { label: "Banques & Finance", href: "/finance/banques" },
      { label: "Contact institutionnel", href: "/institution/contact-institutionnel" },
    ],
  },
  {
    title: "Ressources",
    links: [
      { label: "Actualités", href: "/news" },
      { label: "Presse", href: "/presse" },
      { label: "Documents Officiels", href: "/documents" },
      { label: "Vision", href: "/vision" },
      { label: "Histoire", href: "/histoire" },
    ],
  },
  {
    title: "Institution",
    links: [
      { label: "Institution", href: "/institution" },
      { label: "Gouvernance", href: "/institution/gouvernance" },
      { label: "Transparence", href: "/institution/transparence" },
      { label: "Impact", href: "/impact" },
    ],
  },
  {
    title: "Légal",
    links: [
      { label: "Admin", href: "/admin" },
      { label: "Statistiques", href: "/stats" },
      { label: "Robots", href: "/robots.txt" },
      { label: "Sitemap", href: "/sitemap.xml" },
    ],
  },
];

export const footerNavigationLinks: NavigationLink[] = footerNavigationGroups.flatMap(
  (group) => group.links
);

export const navigationLinks = [
  ...primaryNavigationLinks,
  ...moreNavigationLinks,
];

export const adminFooterLink = { label: "Admin", href: "/admin" };
