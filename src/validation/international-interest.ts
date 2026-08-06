import { z } from "zod";

export const INTERNATIONAL_INTEREST_CATEGORIES = [
  "partner_sponsor", "venue_cultural_space", "media_influencer", "artist_creator",
  "professional_speaker", "school_training", "diaspora_network", "institution",
  "technical_provider", "other",
] as const;

export const INTERNATIONAL_INTEREST_DESTINATIONS = ["senegal", "paris", "rome", "multiple", "global"] as const;

export const INTERNATIONAL_INTEREST_CONTRIBUTIONS = [
  "funding", "venue", "logistics", "media_communication", "artistic_service", "mentoring",
  "training", "technology", "audiovisual_production", "accommodation", "transport", "catering",
  "professional_network", "other",
] as const;

const optionalText = (max: number) => z.string().trim().max(max).optional().default("");
const optionalUrl = z.union([z.literal(""), z.string().trim().url().max(1000)]).default("");

export const internationalInterestSchema = z.object({
  full_name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(320),
  phone: optionalText(80),
  organization: optionalText(160),
  role_title: optionalText(160),
  country: optionalText(120),
  city: optionalText(120),
  category: z.enum(INTERNATIONAL_INTEREST_CATEGORIES),
  destination: z.enum(INTERNATIONAL_INTEREST_DESTINATIONS),
  subject: z.string().trim().min(5).max(150),
  message: z.string().trim().min(30).max(3000),
  contribution_types: z.array(z.enum(INTERNATIONAL_INTEREST_CONTRIBUTIONS)).max(14).default([]),
  preferred_period: optionalText(160),
  website_url: optionalUrl,
  linkedin_url: optionalUrl,
  instagram_url: optionalUrl,
  portfolio_url: optionalUrl,
  preferred_contact_method: z.enum(["email", "phone", "whatsapp"]).or(z.literal("")).default(""),
  consent_given: z.literal(true),
  non_contractual_acknowledged: z.literal(true),
  website: z.string().max(0).default(""),
  form_started_at: z.number().int().positive().optional(),
  source_page: z.string().trim().max(300).optional().default("/international-interest"),
}).strict();

export type InternationalInterestInput = z.infer<typeof internationalInterestSchema>;

export const INTERNATIONAL_INTEREST_CATEGORY_LABELS: Record<typeof INTERNATIONAL_INTEREST_CATEGORIES[number], string> = {
  partner_sponsor: "Partenaire ou sponsor",
  venue_cultural_space: "Lieu ou structure culturelle",
  media_influencer: "Média ou influenceur",
  artist_creator: "Artiste ou créateur",
  professional_speaker: "Professionnel ou intervenant",
  school_training: "École ou organisme de formation",
  diaspora_network: "Association ou réseau de diaspora",
  institution: "Institution publique ou culturelle",
  technical_provider: "Prestataire technique ou événementiel",
  other: "Autre proposition",
};

export const INTERNATIONAL_INTEREST_DESTINATION_LABELS: Record<typeof INTERNATIONAL_INTEREST_DESTINATIONS[number], string> = {
  senegal: "Sénégal",
  paris: "Paris",
  rome: "Rome",
  multiple: "Plusieurs destinations",
  global: "Festival Talent global",
};

export const INTERNATIONAL_INTEREST_CONTRIBUTION_LABELS: Record<typeof INTERNATIONAL_INTEREST_CONTRIBUTIONS[number], string> = {
  funding: "Financement", venue: "Mise à disposition d’un lieu", logistics: "Soutien logistique",
  media_communication: "Média et communication", artistic_service: "Prestation artistique", mentoring: "Mentorat",
  training: "Formation", technology: "Technologie", audiovisual_production: "Production audiovisuelle",
  accommodation: "Hébergement", transport: "Transport", catering: "Restauration",
  professional_network: "Réseau professionnel", other: "Autre",
};
