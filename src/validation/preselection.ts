import { z } from "zod";

import { isCandidateAgeEligible, isValidDateOfBirthForRegistration } from "@/src/lib/candidate-date-of-birth";

export const PRESELECTION_DISCIPLINES = ["Danse", "Musique", "Mode", "Art", "Entrepreneuriat", "Technologie", "Culture urbaine", "Sports mécaniques"] as const;
const optionalText = (max: number) => z.string().trim().max(max).optional().default("");

// Date de naissance : format AAAA-MM-JJ strict, date réelle (rejette 2025-02-31 et
// les faux 29 février), jamais dans le futur. L'éligibilité (bornes d'âge) est
// vérifiée séparément côté serveur, à la date de référence de l'édition.
export const dateOfBirthSchema = z
  .string()
  .trim()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "La date de naissance doit respecter le format AAAA-MM-JJ.")
  .refine((value) => isValidDateOfBirthForRegistration(value), {
    message: "Veuillez renseigner une date de naissance valide.",
  })
  .refine((value) => isCandidateAgeEligible({ dateOfBirth: value }), {
    message: "La date de naissance ne correspond pas aux conditions provisoires de participation.",
  });

export const preselectionInputSchema = z.object({
  submission_key: z.string().uuid(),
  full_name: z.string().trim().min(2).max(200),
  phone: z.string().trim().min(8).max(80),
  email: z.union([z.literal(""), z.string().trim().email().max(320)]).default(""),
  dateOfBirth: dateOfBirthSchema,
  city: z.string().trim().min(2).max(120),
  discipline: z.enum(PRESELECTION_DISCIPLINES),
  experience: optionalText(3000),
  portfolio_link: z.union([z.literal(""), z.string().trim().url().max(1000)]).default(""),
  message: optionalText(3000),
  message_consent: z.boolean().default(false),
  privacy_consent: z.literal(true),
  website: z.string().max(0).default(""),
}).strict();

export type PreselectionInput = z.infer<typeof preselectionInputSchema>;
