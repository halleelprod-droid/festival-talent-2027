import {
  festivalBrands,
  festivalEditions,
  platformDomains,
  supportedLocales,
  targetCountries,
} from "@/data/platform-architecture";

export function getPlatformDomains() {
  return platformDomains;
}

export function getPlatformReadiness() {
  return {
    domains: platformDomains.length,
    editions: festivalEditions.length,
    brands: festivalBrands.length,
    countries: targetCountries.length,
    locales: supportedLocales.length,
  };
}
