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
  { label: "Édition 2027", href: "/edition-2027" },
  { label: "Programme", href: "/programme" },
  { label: "Pré-sélections", href: "/preselections" },
];

export const destinationNavigationLinks: NavigationLink[] = [
  { label: "Sénégal", href: "/destinations/senegal" },
  { label: "Paris", href: "/destinations/paris" },
  { label: "Rome", href: "/destinations/rome" },
];

export const disciplineNavigationLinks: NavigationLink[] = [
  { label: "Musique", href: "/disciplines#musique" },
  { label: "Danse", href: "/disciplines#danse" },
  { label: "Mode", href: "/disciplines#mode" },
  { label: "Cinéma et création", href: "/disciplines#cinema" },
  { label: "Technologie", href: "/disciplines#technologie" },
  { label: "Entrepreneuriat", href: "/disciplines#entrepreneuriat" },
  { label: "Automobile", href: "/disciplines#automobile" },
  { label: "Gastronomie", href: "/disciplines#gastronomie" },
];

export const moreNavigationLinks: NavigationLink[] = [
  { label: "Artistes & invités", href: "/artists" },
  { label: "Coachs & mentors", href: "/mentors" },
  { label: "Partenaires", href: "/partners" },
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
