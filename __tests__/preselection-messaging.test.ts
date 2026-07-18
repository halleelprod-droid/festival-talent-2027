import { readFileSync } from "node:fs";
import { afterEach, describe, expect, it, vi } from "vitest";

import { buildPreselectionConfirmation, extractFirstName } from "@/src/services/messaging/confirmation-message";
import { createConfirmationIdempotencyKey } from "@/src/services/messaging/constants";
import {
  dispatchPendingConfirmations,
  type ConfirmationJob,
  type MessageQueueRepository,
} from "@/src/services/messaging/dispatcher";
import { classifyPhoneForBatch, normalizeSenegalPhone } from "@/src/services/messaging/phone";
import { MessagingProviderError, type MessagingProvider } from "@/src/services/messaging/provider";
import { buildConfirmationQueueRecord } from "@/src/services/messaging/queue";
import { getRetryDecision, MAX_MESSAGE_ATTEMPTS } from "@/src/services/messaging/retry-policy";
import { createTwilioProviderFromEnv } from "@/src/services/messaging/twilio";
import { summarizeConfirmationStatuses } from "@/src/services/messaging/status-summary";
import {
  computeTwilioSignature,
  normalizeTwilioStatus,
  resolveCallbackTransition,
  validateTwilioSignature,
} from "@/src/services/messaging/twilio-webhook";

const now = new Date("2027-01-01T12:00:00.000Z");

function job(overrides: Partial<ConfirmationJob> = {}): ConfirmationJob {
  return {
    id: "message-1",
    registrationId: "11111111-2222-3333-4444-555555555555",
    recipientNormalized: "+221771234567",
    candidateName: "Awa Ndiaye",
    discipline: "Danse",
    attemptCount: 1,
    ...overrides,
  };
}

function repository(jobs: ConfirmationJob[]) {
  const events: string[] = [];
  const results: unknown[] = [];
  const repo: MessageQueueRepository = {
    claimBatch: vi.fn(async () => jobs),
    markAccepted: vi.fn(async (_job, result) => { events.push("accepted"); results.push(result); }),
    markSent: vi.fn(async (_job, result) => { events.push("sent"); results.push(result); }),
    markDelivered: vi.fn(async (_job, result) => { events.push("delivered"); results.push(result); }),
    markRetry: vi.fn(async () => { events.push("retry"); }),
    markFailed: vi.fn(async () => { events.push("failed"); }),
    markSuppressed: vi.fn(async () => { events.push("suppressed"); }),
  };
  return { repo, events, results };
}

function provider(send: MessagingProvider["sendMessage"]): MessagingProvider {
  return { sendMessage: vi.fn(send) };
}

describe("normalisation des téléphones sénégalais", () => {
  it.each([
    ["77xxxxxxx local", "771234567", "+221771234567"],
    ["préfixe +221", "+221771234567", "+221771234567"],
    ["préfixe 00221", "00221771234567", "+221771234567"],
    ["espaces et tirets", "77 123-45-67", "+221771234567"],
    ["parenthèses", "(+221) 77 123 45 67", "+221771234567"],
  ])("normalise %s", (_label, input, expected) => {
    expect(normalizeSenegalPhone(input)).toMatchObject({ normalized: expected, valid: true });
  });

  it.each(["", "123", "+22177123", "+33123456789", "abc771234567"])(
    "rejette le numéro invalide %s",
    (input) => expect(normalizeSenegalPhone(input).valid).toBe(false),
  );

  it("détecte un doublon sans révéler le numéro", () => {
    const seen = new Set<string>();
    expect(classifyPhoneForBatch("77 123 45 67", seen).kind).toBe("valid");
    expect(classifyPhoneForBatch("+221771234567", seen).kind).toBe("duplicate");
  });
});

describe("message de confirmation", () => {
  const input = { fullName: "Awa Ndiaye", discipline: "Danse", registrationReference: "FT27-ABC123" };

  it("utilise uniquement le prénom et la catégorie", () => {
    expect(extractFirstName("  Awa Ndiaye ")).toBe("Awa");
    expect(buildPreselectionConfirmation(input)).toContain("Bonjour Awa,");
    expect(buildPreselectionConfirmation(input)).toContain("catégorie Danse");
  });

  it("produit une version sans prénom", () => {
    expect(extractFirstName("  ")).toBeNull();
    expect(buildPreselectionConfirmation({ ...input, fullName: "" })).toContain("Bonjour, votre inscription");
  });

  it("filtre le contenu utilisateur et n'expose aucune donnée sensible", () => {
    const message = buildPreselectionConfirmation({
      fullName: "<Awa> Ndiaye",
      discipline: "Danse\n<script>",
      registrationReference: "FT27-ABC123",
    });
    expect(message).not.toMatch(/<|>|\nDanse\n/i);
    expect(message).not.toMatch(/\d{4}-\d{2}-\d{2}|naissance|âge|email|adresse/i);
  });
});

describe("création et idempotence de la file", () => {
  const base = {
    candidateId: "candidate-1",
    registrationId: "registration-1",
    recipientNormalized: "+221771234567",
    phoneValid: true,
    transactionalConsentGranted: true,
  };

  it("crée un travail pending pour une inscription valide", () => {
    expect(buildConfirmationQueueRecord(base)).toMatchObject({ status: "pending", failureCode: null });
  });

  it("supprime de l'envoi un téléphone invalide", () => {
    expect(buildConfirmationQueueRecord({ ...base, phoneValid: false, recipientNormalized: null }))
      .toMatchObject({ status: "suppressed", failureCode: "invalid_phone" });
  });

  it("supprime de l'envoi si le consentement transactionnel requis manque", () => {
    expect(buildConfirmationQueueRecord({ ...base, transactionalConsentGranted: false }))
      .toMatchObject({ status: "suppressed", failureCode: "transactional_consent_missing" });
  });

  it("produit une clé stable sans donnée personnelle", () => {
    const first = createConfirmationIdempotencyKey("registration-1");
    expect(first).toBe(createConfirmationIdempotencyKey("registration-1"));
    expect(first).not.toContain("+221");
  });

  it("produit deux clés pour deux inscriptions distinctes", () => {
    expect(createConfirmationIdempotencyKey("registration-1"))
      .not.toBe(createConfirmationIdempotencyKey("registration-2"));
  });
});

describe("dispatcher borné et reprises", () => {
  it("borne le lot à 50", async () => {
    const { repo } = repository([]);
    await dispatchPendingConfirmations({ limit: 500, now, repository: repo, provider: provider(async () => ({ provider: "fake", messageId: "sid", status: "accepted" })) });
    expect(repo.claimBatch).toHaveBeenCalledWith(50, now);
  });

  it("appelle le provider simulé une fois et conserve son identifiant", async () => {
    const { repo, events, results } = repository([job()]);
    const fake = provider(async () => ({ provider: "fake", messageId: "provider-id-1", status: "accepted" }));
    const summary = await dispatchPendingConfirmations({ limit: 1, now, repository: repo, provider: fake });
    expect(fake.sendMessage).toHaveBeenCalledOnce();
    expect(events).toEqual(["accepted"]);
    expect(results).toContainEqual(expect.objectContaining({ messageId: "provider-id-1" }));
    expect(summary.accepted).toBe(1);
  });

  it("planifie une reprise après une indisponibilité temporaire", async () => {
    const { repo, events } = repository([job()]);
    const fake = provider(async () => { throw new Error("indisponible"); });
    const summary = await dispatchPendingConfirmations({ limit: 1, now, repository: repo, provider: fake });
    expect(events).toEqual(["retry"]);
    expect(summary.retryScheduled).toBe(1);
  });

  it("ne reprend pas une erreur permanente", async () => {
    const { repo, events } = repository([job()]);
    const fake = provider(async () => { throw new MessagingProviderError({ code: "invalid", category: "permanent", retryable: false }); });
    await dispatchPendingConfirmations({ limit: 1, now, repository: repo, provider: fake });
    expect(events).toEqual(["failed"]);
  });

  it("arrête après le maximum de tentatives", async () => {
    const decision = getRetryDecision({
      attemptCount: MAX_MESSAGE_ATTEMPTS,
      failure: { code: "timeout", category: "temporary", retryable: true },
      now,
    });
    expect(decision).toEqual({ retry: false });
  });

  it("programme 5 minutes, 30 minutes puis 2 heures", () => {
    const failure = { code: "timeout", category: "temporary" as const, retryable: true };
    expect(getRetryDecision({ attemptCount: 1, failure, now })).toMatchObject({ nextAttemptAt: new Date(now.getTime() + 300_000) });
    expect(getRetryDecision({ attemptCount: 2, failure, now })).toMatchObject({ nextAttemptAt: new Date(now.getTime() + 1_800_000) });
    expect(getRetryDecision({ attemptCount: 3, failure, now })).toMatchObject({ nextAttemptAt: new Date(now.getTime() + 7_200_000) });
  });

  it("marque delivered et sent selon le résultat fournisseur", async () => {
    const delivered = repository([job()]);
    await dispatchPendingConfirmations({ limit: 1, now, repository: delivered.repo, provider: provider(async () => ({ provider: "fake", messageId: "1", status: "delivered" })) });
    expect(delivered.events).toEqual(["delivered"]);
    const sent = repository([job()]);
    await dispatchPendingConfirmations({ limit: 1, now, repository: sent.repo, provider: provider(async () => ({ provider: "fake", messageId: "2", status: "sent" })) });
    expect(sent.events).toEqual(["sent"]);
  });

  it("supprime un travail sans destinataire", async () => {
    const { repo, events } = repository([job({ recipientNormalized: null })]);
    const fake = provider(async () => ({ provider: "fake", messageId: "1", status: "accepted" }));
    await dispatchPendingConfirmations({ limit: 1, now, repository: repo, provider: fake });
    expect(events).toEqual(["suppressed"]);
    expect(fake.sendMessage).not.toHaveBeenCalled();
  });

  it("transforme un désabonnement en suppressed sans retry", async () => {
    const { repo, events } = repository([job()]);
    const fake = provider(async () => { throw new MessagingProviderError({ code: "21610", category: "unsubscribed", retryable: false }); });
    await dispatchPendingConfirmations({ limit: 1, now, repository: repo, provider: fake });
    expect(events).toEqual(["suppressed"]);
  });

  it("deux workers ne traitent qu'un claim unique fourni par le dépôt", async () => {
    let claimed = false;
    const shared = repository([]);
    shared.repo.claimBatch = vi.fn(async () => claimed ? [] : (claimed = true, [job()]));
    const fake = provider(async () => ({ provider: "fake", messageId: "1", status: "accepted" }));
    await Promise.all([
      dispatchPendingConfirmations({ limit: 1, now, repository: shared.repo, provider: fake }),
      dispatchPendingConfirmations({ limit: 1, now, repository: shared.repo, provider: fake }),
    ]);
    expect(fake.sendMessage).toHaveBeenCalledOnce();
  });
});

describe("callback Twilio", () => {
  const url = "https://example.test/api/webhooks/twilio/message-status";
  const params = new URLSearchParams({ MessageSid: "SM000", MessageStatus: "delivered" });

  it("accepte une signature valide", () => {
    const signature = computeTwilioSignature("synthetic-token", url, params);
    expect(validateTwilioSignature({ authToken: "synthetic-token", signature, url, params })).toBe(true);
  });

  it("refuse une signature absente ou invalide", () => {
    expect(validateTwilioSignature({ authToken: "synthetic-token", signature: null, url, params })).toBe(false);
    expect(validateTwilioSignature({ authToken: "synthetic-token", signature: "invalid", url, params })).toBe(false);
  });

  it("normalise les statuts intermédiaires", () => {
    expect(normalizeTwilioStatus("queued")).toBe("accepted");
    expect(normalizeTwilioStatus("sending")).toBe("accepted");
    expect(normalizeTwilioStatus("unknown")).toBeNull();
  });

  it("ignore un callback répété", () => {
    expect(resolveCallbackTransition("sent", "sent")).toBeNull();
  });

  it("ne rétrograde jamais delivered", () => {
    expect(resolveCallbackTransition("delivered", "accepted")).toBeNull();
    expect(resolveCallbackTransition("delivered", "failed")).toBeNull();
  });

  it("accepte delivered et failed depuis un état antérieur", () => {
    expect(resolveCallbackTransition("sent", "delivered")).toBe("delivered");
    expect(resolveCallbackTransition("accepted", "failed")).toBe("failed");
  });
});

describe("garde-fous d'intégration", () => {
  afterEach(() => vi.unstubAllEnvs());

  it("MESSAGING_ENABLED=false empêche l'instanciation du provider réel", () => {
    vi.stubEnv("MESSAGING_ENABLED", "false");
    expect(createTwilioProviderFromEnv()).toBeNull();
  });

  it("la route publique crée le message dans la transaction et dispatche après commit", () => {
    const source = readFileSync("app/api/preselections/route.ts", "utf8");
    expect(source).toContain("tx.insert(messageLogs)");
    expect(source).toContain("after(async ()");
    expect(source.indexOf("after(async ()")).toBeGreaterThan(source.lastIndexOf("});", source.indexOf("after(async ()")));
  });

  it("la contrainte unique et SKIP LOCKED protègent les traitements concurrents", () => {
    const schema = readFileSync("src/db/schema/index.ts", "utf8");
    const repositorySource = readFileSync("src/services/messaging/postgres-queue.ts", "utf8");
    expect(schema).toContain("message_logs_idempotency_key_idx");
    expect(repositorySource).toContain("skipLocked: true");
  });

  it("la route interne exige un secret et limite le lot", () => {
    const source = readFileSync("app/api/internal/messages/preselection-confirmation/route.ts", "utf8");
    expect(source).toContain('request.headers.get("x-internal-secret")');
    expect(source).toContain(".max(MAX_DISPATCH_BATCH_SIZE)");
    expect(source).toContain('MESSAGING_ENABLED !== "true"');
  });

  it("le script historique est dry-run par défaut et exige deux confirmations", () => {
    const source = readFileSync("scripts/send-existing-confirmations.ts", "utf8");
    expect(source).toContain('includes("--execute")');
    expect(source).toContain('includes("--confirm-send")');
    expect(source).toContain("dry-run");
  });

  it("le dépôt n'enregistre aucune donnée personnelle dans les métadonnées d'audit", () => {
    const source = readFileSync("src/services/messaging/postgres-queue.ts", "utf8");
    for (const metadataBlock of source.split("metadata:").slice(1)) {
      const value = metadataBlock.split("}", 1)[0];
      expect(value).not.toContain("recipientNormalized");
      expect(value).not.toContain("candidateName");
      expect(value).not.toContain("body");
    }
  });

  it("une erreur provider est isolée de la réponse d'inscription", () => {
    const source = readFileSync("app/api/preselections/route.ts", "utf8");
    expect(source).toContain("dispatchConfiguredConfirmations(1).catch(() => undefined)");
    expect(source).toContain("confirmationQueued");
  });

  it("calcule les compteurs administratifs sans données destinataire", () => {
    expect(summarizeConfirmationStatuses([
      { status: "pending", value: 2 },
      { status: "queued", value: 1 },
      { status: "delivered", value: 4 },
      { status: "failed", value: 2 },
      { status: "undelivered", value: 3 },
      { status: "suppressed", value: 1 },
    ])).toMatchObject({
      confirmationsPending: 3,
      confirmationsDelivered: 4,
      confirmationsFailed: 5,
      confirmationsSuppressed: 1,
    });
  });

  it("prévoit une relance manuelle protégée, éligible et auditée", () => {
    const source = readFileSync("app/api/admin/messages/[id]/retry/route.ts", "utf8");
    expect(source).toContain("requireAdmin(messagingRoles)");
    expect(source).toContain('eq(messageLogs.failureCategory, "temporary")');
    expect(source).toContain('action: "preselection_confirmation_manual_retry"');
  });
});
