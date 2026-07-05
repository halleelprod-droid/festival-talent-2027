import type {
  DomainLayer,
  FestivalBrand,
  FestivalEdition,
  PlatformDomainContract,
} from "@/types/platform";

export const domainLayers: DomainLayer[] = [
  "components",
  "services",
  "types",
  "hooks",
  "api",
  "validators",
  "schemas",
  "utils",
  "tests",
];

export const platformDomains: PlatformDomainContract[] = [
  { name: "artists", label: "Artists", owner: "product", maturity: "active", layers: domainLayers, publicApi: true, sensitiveData: false },
  { name: "activities", label: "Activities", owner: "product", maturity: "active", layers: domainLayers, publicApi: true, sensitiveData: false },
  { name: "candidates", label: "Candidates", owner: "operations", maturity: "planned", layers: domainLayers, publicApi: false, sensitiveData: true },
  { name: "partners", label: "Partners", owner: "growth", maturity: "active", layers: domainLayers, publicApi: true, sensitiveData: false },
  { name: "sponsors", label: "Sponsors", owner: "growth", maturity: "planned", layers: domainLayers, publicApi: false, sensitiveData: true },
  { name: "media", label: "Media", owner: "growth", maturity: "foundation", layers: domainLayers, publicApi: true, sensitiveData: false },
  { name: "academy", label: "Academy", owner: "product", maturity: "foundation", layers: domainLayers, publicApi: true, sensitiveData: false },
  { name: "ticketing", label: "Ticketing", owner: "finance", maturity: "foundation", layers: domainLayers, publicApi: false, sensitiveData: true },
  { name: "statistics", label: "Statistics", owner: "platform", maturity: "foundation", layers: domainLayers, publicApi: true, sensitiveData: false },
  { name: "finance", label: "Finance", owner: "finance", maturity: "planned", layers: domainLayers, publicApi: false, sensitiveData: true },
  { name: "users", label: "Users", owner: "platform", maturity: "planned", layers: domainLayers, publicApi: false, sensitiveData: true },
  { name: "notifications", label: "Notifications", owner: "platform", maturity: "foundation", layers: domainLayers, publicApi: false, sensitiveData: true },
  { name: "messages", label: "Messages", owner: "operations", maturity: "planned", layers: domainLayers, publicApi: false, sensitiveData: true },
  { name: "news", label: "News", owner: "growth", maturity: "active", layers: domainLayers, publicApi: true, sensitiveData: false },
  { name: "administration", label: "Administration", owner: "platform", maturity: "foundation", layers: domainLayers, publicApi: false, sensitiveData: true },
];

export const festivalEditions: FestivalEdition[] = [
  { id: "ft-2027-sn", slug: "festival-talent-2027", label: "Festival Talent 2027", year: 2027, country: "Senegal", status: "active" },
  { id: "ft-2028-sn", slug: "festival-talent-2028", label: "Festival Talent 2028", year: 2028, country: "Senegal", status: "planning" },
  { id: "ft-2029-ci", slug: "festival-talent-2029", label: "Festival Talent 2029", year: 2029, country: "Cote d'Ivoire", status: "planning" },
  { id: "ft-2030-west-africa", slug: "festival-talent-2030", label: "Festival Talent 2030", year: 2030, country: "Afrique de l'Ouest", status: "planning" },
];

export const festivalBrands: FestivalBrand[] = [
  "festival-talent",
  "festival-talent-kids",
  "festival-talent-campus",
  "festival-talent-business",
  "festival-talent-awards",
];

export const targetCountries = [
  "Senegal",
  "Cote d'Ivoire",
  "Mali",
  "Guinee",
  "Benin",
  "Burkina Faso",
];

export const supportedLocales = ["fr", "en", "it", "es", "ar"] as const;
