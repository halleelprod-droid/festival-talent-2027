import { describe, expect, it } from "vitest";
import { internationalInterestSchema } from "@/src/validation/international-interest";

const valid = {
  full_name: "Awa Diop", email: "awa@example.com", category: "artist_creator", destination: "paris",
  subject: "Proposition de création", message: "Je souhaite proposer une collaboration artistique pour l’étape internationale.",
  consent_given: true, non_contractual_acknowledged: true, website: "",
};

describe("manifestation d’intérêt internationale", () => {
  it("accepte une proposition valide et normalise les textes", () => {
    const result = internationalInterestSchema.safeParse({ ...valid, full_name: "  Awa Diop  " });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.full_name).toBe("Awa Diop");
  });
  it("rejette une destination ou catégorie inconnue", () => {
    expect(internationalInterestSchema.safeParse({ ...valid, destination: "london" }).success).toBe(false);
    expect(internationalInterestSchema.safeParse({ ...valid, category: "unknown" }).success).toBe(false);
  });
  it("exige le consentement et une description suffisamment détaillée", () => {
    expect(internationalInterestSchema.safeParse({ ...valid, consent_given: false }).success).toBe(false);
    expect(internationalInterestSchema.safeParse({ ...valid, message: "trop court" }).success).toBe(false);
  });
  it("bloque le honeypot et les URLs invalides", () => {
    expect(internationalInterestSchema.safeParse({ ...valid, website: "bot" }).success).toBe(false);
    expect(internationalInterestSchema.safeParse({ ...valid, website_url: "not-a-url" }).success).toBe(false);
  });
});
