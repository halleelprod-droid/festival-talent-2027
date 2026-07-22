"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import { PRESELECTION_DISCIPLINES, preselectionInputSchema } from "@/src/validation/preselection";

const subscribeNoop = () => () => {};

export default function PreselectionForm() {
  const submissionKey = useRef<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  // Date maximale (aujourd'hui) résolue côté client uniquement pour éviter tout
  // écart d'hydratation. La validation « pas dans le futur » reste côté serveur (Zod).
  const maxDateOfBirth = useSyncExternalStore(
    subscribeNoop,
    () => new Date().toISOString().slice(0, 10),
    () => "",
  );

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (loading) {
      return;
    }

    setLoading(true);
    setSuccess("");
    setError("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      submission_key: submissionKey.current ??= crypto.randomUUID(),
      full_name: String(formData.get("full_name") || "").trim(),
      phone: String(formData.get("phone") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      dateOfBirth: String(formData.get("dateOfBirth") || "").trim(),
      city: String(formData.get("city") || "").trim(),
      discipline: String(formData.get("discipline") || "").trim(),
      experience: String(formData.get("experience") || "").trim(),
      portfolio_link: String(formData.get("portfolio_link") || "").trim(),
      message: String(formData.get("message") || "").trim(),
      message_consent: formData.get("message_consent") === "on",
      privacy_consent: formData.get("privacy_consent") === "on",
      website: String(formData.get("website") || ""),
    };

    const parsed = preselectionInputSchema.safeParse(payload);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Merci de remplir les champs obligatoires.");
      setLoading(false);
      return;
    }

    const response = await fetch("/api/preselections", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsed.data),
    }).catch(() => null);

    if (!response?.ok) {
      if (response?.status === 429) {
        setError("Trop de tentatives. Merci de réessayer plus tard.");
      } else if (response?.status === 422) {
        setError("Votre âge ne correspond pas aux conditions de participation pour cette édition.");
      } else {
        setError("L’inscription n’a pas pu être enregistrée. Merci de réessayer.");
      }
      setLoading(false);
      return;
    }

    setSuccess(
      "Candidature envoyée avec succès. L’équipe Festival Talent te contactera."
    );

    form.reset();
    submissionKey.current = null;
    setLoading(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full min-w-0 rounded-[2rem] border border-yellow-400/20 bg-white/[0.04] p-6 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-8"
    >
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label
            htmlFor="ft-full_name"
            className="text-xs font-black uppercase tracking-[0.25em] text-yellow-300"
          >
            Nom complet *
          </label>
          <input
            id="ft-full_name"
            name="full_name"
            required
            aria-required="true"
            className="mt-3 w-full rounded-2xl border border-white/10 bg-black/50 px-5 py-4 text-white outline-none transition placeholder:text-white/30 focus:border-yellow-400/50"
            placeholder="Ex : Mamadou Diop"
          />
        </div>

        <div>
          <label
            htmlFor="ft-phone"
            className="text-xs font-black uppercase tracking-[0.25em] text-yellow-300"
          >
            Téléphone *
          </label>
          <input
            id="ft-phone"
            name="phone"
            type="tel"
            required
            aria-required="true"
            className="mt-3 w-full rounded-2xl border border-white/10 bg-black/50 px-5 py-4 text-white outline-none transition placeholder:text-white/30 focus:border-yellow-400/50"
            placeholder="Ex : 77 000 00 00"
          />
        </div>

        <div>
          <label
            htmlFor="ft-email"
            className="text-xs font-black uppercase tracking-[0.25em] text-yellow-300"
          >
            Email
          </label>
          <input
            id="ft-email"
            name="email"
            type="email"
            className="mt-3 w-full rounded-2xl border border-white/10 bg-black/50 px-5 py-4 text-white outline-none transition placeholder:text-white/30 focus:border-yellow-400/50"
            placeholder="Ex : contact@email.com"
          />
        </div>

        <div>
          <label
            htmlFor="ft-dateOfBirth"
            className="text-xs font-black uppercase tracking-[0.25em] text-yellow-300"
          >
            Date de naissance *
          </label>
          <input
            id="ft-dateOfBirth"
            name="dateOfBirth"
            type="date"
            required
            aria-required="true"
            min="1900-01-01"
            max={maxDateOfBirth || undefined}
            className="mt-3 w-full rounded-2xl border border-white/10 bg-black/50 px-5 py-4 text-white outline-none transition [color-scheme:dark] focus:border-yellow-400/50"
          />
        </div>

        <div>
          <label
            htmlFor="ft-city"
            className="text-xs font-black uppercase tracking-[0.25em] text-yellow-300"
          >
            Ville *
          </label>
          <input
            id="ft-city"
            name="city"
            required
            aria-required="true"
            className="mt-3 w-full rounded-2xl border border-white/10 bg-black/50 px-5 py-4 text-white outline-none transition placeholder:text-white/30 focus:border-yellow-400/50"
            placeholder="Ex : Dakar"
          />
        </div>

        <div>
          <label
            htmlFor="ft-discipline"
            className="text-xs font-black uppercase tracking-[0.25em] text-yellow-300"
          >
            Discipline *
          </label>
          <select
            id="ft-discipline"
            name="discipline"
            required
            aria-required="true"
            defaultValue=""
            className="mt-3 w-full rounded-2xl border border-white/10 bg-black/50 px-5 py-4 text-white outline-none transition focus:border-yellow-400/50"
          >
            <option value="" disabled>
              Choisir une discipline
            </option>

            {PRESELECTION_DISCIPLINES.map((discipline) => (
              <option key={discipline} value={discipline} className="bg-black">
                {discipline}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-5 min-w-0">
        <label
          htmlFor="ft-experience"
          className="text-xs font-black uppercase tracking-[0.25em] text-yellow-300"
        >
          Expérience / parcours
        </label>
        <textarea
          id="ft-experience"
          name="experience"
          rows={4}
          className="mt-3 w-full rounded-2xl border border-white/10 bg-black/50 px-5 py-4 text-white outline-none transition placeholder:text-white/30 focus:border-yellow-400/50"
          placeholder="Présente ton parcours, ton talent ou ton projet..."
        />
      </div>

      <div className="mt-5">
        <label
          htmlFor="ft-portfolio_link"
          className="text-xs font-black uppercase tracking-[0.25em] text-yellow-300"
        >
          Lien vidéo / portfolio
        </label>
        <input
          id="ft-portfolio_link"
          name="portfolio_link"
          data-testid="portfolio-input"
          className="mt-3 box-border w-full min-w-0 max-w-full rounded-2xl border border-white/10 bg-black/50 px-5 py-4 text-white outline-none transition placeholder:text-white/30 focus:border-yellow-400/50"
          placeholder="Lien TikTok, Instagram, YouTube, Drive, portfolio..."
        />
      </div>

      <div
        data-testid="consent-marketing-card"
        className="mt-6 w-full min-w-0 rounded-2xl border border-white/10 bg-black/35 p-4 sm:p-5"
      >
        <label htmlFor="ft-message-consent" className="flex w-full min-w-0 cursor-pointer items-start gap-3">
          <input
            id="ft-message-consent"
            name="message_consent"
            type="checkbox"
            className="mt-1 h-5 w-5 shrink-0 accent-yellow-400"
          />
          <span data-testid="consent-marketing-text" className="min-w-0 flex-1">
            <span className="block whitespace-normal break-words text-sm leading-6 text-white/75">
              J’accepte de recevoir par SMS ou WhatsApp les informations relatives
              aux présélections et au Festival Talent 2027.
            </span>
            <span className="mt-2 block whitespace-normal break-words text-xs leading-5 text-white/45">
              Ce consentement concerne les informations futures. Le message de
              confirmation de l’inscription reste strictement lié à ta candidature.
            </span>
          </span>
        </label>
      </div>

      <div
        data-testid="consent-data-card"
        className="mt-4 w-full min-w-0 rounded-2xl border border-white/10 bg-black/35 p-4 sm:p-5"
      >
        <label htmlFor="ft-privacy-consent" className="flex w-full min-w-0 cursor-pointer items-start gap-3">
          <input id="ft-privacy-consent" name="privacy_consent" type="checkbox" required className="mt-1 h-5 w-5 shrink-0 accent-yellow-400" />
          <span data-testid="consent-data-text" className="min-w-0 flex-1 whitespace-normal break-words text-sm leading-6 text-white/75">J’accepte le traitement de mes données pour gérer ma candidature aux présélections.</span>
        </label>
      </div>

      <div className="hidden" aria-hidden="true">
        <label htmlFor="ft-website">Site web</label>
        <input id="ft-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="mt-5">
        <label
          htmlFor="ft-message"
          className="text-xs font-black uppercase tracking-[0.25em] text-yellow-300"
        >
          Message complémentaire
        </label>
        <textarea
          id="ft-message"
          name="message"
          rows={4}
          className="mt-3 w-full rounded-2xl border border-white/10 bg-black/50 px-5 py-4 text-white outline-none transition placeholder:text-white/30 focus:border-yellow-400/50"
          placeholder="Ajoute une information importante..."
        />
      </div>

      {error && (
        <p
          role="alert"
          aria-live="assertive"
          className="mt-5 rounded-2xl border border-red-400/30 bg-red-500/10 px-5 py-4 text-sm text-red-200"
        >
          {error}
        </p>
      )}

      {success && (
        <p
          role="status"
          aria-live="polite"
          className="mt-5 rounded-2xl border border-green-400/30 bg-green-500/10 px-5 py-4 text-sm text-green-200"
        >
          {success}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        aria-busy={loading}
        className="mt-7 w-full rounded-full bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-700 px-8 py-5 text-xs font-black uppercase tracking-[0.25em] text-black transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Envoi en cours..." : "Envoyer ma candidature"}
      </button>
    </form>
  );
}
