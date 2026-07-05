export type PlatformDomain =
  | "artists"
  | "activities"
  | "candidates"
  | "partners"
  | "sponsors"
  | "media"
  | "academy"
  | "ticketing"
  | "statistics"
  | "finance"
  | "users"
  | "notifications"
  | "messages"
  | "news"
  | "administration";

export type DomainLayer =
  | "components"
  | "services"
  | "types"
  | "hooks"
  | "api"
  | "validators"
  | "schemas"
  | "utils"
  | "tests";

export type PlatformDomainContract = {
  name: PlatformDomain;
  label: string;
  owner: "product" | "operations" | "growth" | "finance" | "platform";
  maturity: "foundation" | "planned" | "active";
  layers: DomainLayer[];
  publicApi: boolean;
  sensitiveData: boolean;
};

export type FestivalEdition = {
  id: string;
  slug: string;
  label: string;
  year: number;
  country: string;
  status: "planning" | "active" | "archived";
};

export type FestivalBrand =
  | "festival-talent"
  | "festival-talent-kids"
  | "festival-talent-campus"
  | "festival-talent-business"
  | "festival-talent-awards";
