import { describe, expect, it } from "vitest";

import { buildPreselectionConfirmation, extractFirstName } from "@/src/services/messaging/confirmation-message";
import { classifyPhoneForBatch, normalizeSenegalPhone } from "@/src/services/messaging/phone";

describe("normalisation des téléphones sénégalais", () => {
  it.each([
    ["77xxxxxxx local", "771234567", "+221771234567"],
    ["préfixe +221", "+221771234567", "+221771234567"],
    ["préfixe 00221", "00221771234567", "+221771234567"],
    ["espaces et tirets", "77 123-45-67", "+221771234567"],
    ["parenthèses", "(+221) 77 123 45 67", "+221771234567"],
  ])("normalise %s", (_label, input, expected) => {
    expect(normalizeSenegalPhone(input)).toMatchObject({
      raw: input,
      normalized: expected,
      valid: true,
    });
  });

  it.each(["", "123", "+22177123", "+33123456789", "abc771234567"])(
    "rejette le numéro invalide %s",
    (input) => {
      expect(normalizeSenegalPhone(input).valid).toBe(false);
    },
  );

  it("détecte un doublon sans révéler le numéro", () => {
    const seen = new Set<string>();
    expect(classifyPhoneForBatch("77 123 45 67", seen).kind).toBe("valid");
    expect(classifyPhoneForBatch("+221771234567", seen).kind).toBe("duplicate");
  });
});

describe("message de confirmation", () => {
  it("utilise uniquement le prénom", () => {
    expect(extractFirstName("  Awa Ndiaye ")).toBe("Awa");
    expect(buildPreselectionConfirmation("Awa Ndiaye")).toContain("Bonjour Awa,");
  });

  it("produit une version sans prénom", () => {
    expect(extractFirstName("  ")).toBeNull();
    expect(buildPreselectionConfirmation("")).toMatch(/^Bonjour, votre inscription/);
  });

  it("n'expose jamais de date de naissance ni d'âge", () => {
    const message = buildPreselectionConfirmation("Awa Ndiaye");
    expect(message).not.toMatch(/\d{4}-\d{2}-\d{2}/);
    expect(message).not.toMatch(/naissance|âge|age/i);
  });
});
