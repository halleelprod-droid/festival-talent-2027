"use client";

import { FormEvent, useState } from "react";
import {
  INTERNATIONAL_INTEREST_CATEGORIES,
  INTERNATIONAL_INTEREST_CATEGORY_LABELS,
  INTERNATIONAL_INTEREST_CONTRIBUTIONS,
  INTERNATIONAL_INTEREST_CONTRIBUTION_LABELS,
  INTERNATIONAL_INTEREST_DESTINATIONS,
  INTERNATIONAL_INTEREST_DESTINATION_LABELS,
} from "@/src/validation/international-interest";

type Props = { initialDestination: typeof INTERNATIONAL_INTEREST_DESTINATIONS[number]; initialCategory: typeof INTERNATIONAL_INTEREST_CATEGORIES[number] };

const inputClass = "mt-2 w-full rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-yellow-300";

export default function InternationalInterestForm({ initialDestination, initialCategory }: Props) {
  const [destination, setDestination] = useState(initialDestination);
  const [category, setCategory] = useState(initialCategory);
  const [contributions, setContributions] = useState<string[]>([]);
  const [startedAt] = useState(() => Date.now());
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  function toggleContribution(value: string) { setContributions((current) => current.includes(value) ? current.filter((item) => item !== value) : [...current, value]); }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("loading"); setError("");
    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form.entries());
    try {
      const response = await fetch("/api/international-interest", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({
        ...payload, destination, category, contribution_types: contributions, consent_given: form.get("consent_given") === "on", non_contractual_acknowledged: form.get("non_contractual_acknowledged") === "on", website: form.get("website") || "", form_started_at: startedAt,
      }) });
      if (!response.ok) { setState("error"); setError(response.status === 429 ? "Trop de demandes rapprochées. Merci de réessayer plus tard." : response.status === 409 ? "Une proposition similaire a déjà été reçue récemment." : "Vérifiez les champs indiqués puis réessayez."); return; }
      setState("success");
    } catch { setState("error"); setError("La demande n’a pas pu être envoyée. Réessayez dans quelques instants."); }
  }

  if (state === "success") return <div className="rounded-3xl border border-yellow-300/30 bg-yellow-300/[.08] p-8 text-center" role="status"><h2 className="text-2xl font-black">Votre manifestation d’intérêt a bien été enregistrée.</h2><p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/65">L’équipe Festival Talent examinera votre proposition et vous contactera si une suite peut être envisagée.</p><p className="mt-4 text-xs leading-6 text-white/45">Cette démarche ne constitue ni une confirmation de participation, ni un partenariat, ni un engagement contractuel.</p></div>;

  return <form onSubmit={submit} className="space-y-10" noValidate>
    <section aria-labelledby="profile-title"><h2 id="profile-title" className="text-xl font-black uppercase text-yellow-200">1. Votre profil</h2><div className="mt-5 grid gap-5 sm:grid-cols-2"><label className="sm:col-span-2 text-sm">Nom complet *<input required name="full_name" className={inputClass} minLength={2} maxLength={100} /></label><label className="text-sm">E-mail *<input required type="email" name="email" className={inputClass} /></label><label className="text-sm">Téléphone<input type="tel" name="phone" className={inputClass} maxLength={80} /></label><label className="text-sm">Organisation<input name="organization" className={inputClass} maxLength={160} /></label><label className="text-sm">Fonction<input name="role_title" className={inputClass} maxLength={160} /></label><label className="text-sm">Pays<input name="country" className={inputClass} maxLength={120} /></label><label className="text-sm">Ville<input name="city" className={inputClass} maxLength={120} /></label></div></section>
    <section aria-labelledby="proposal-title"><h2 id="proposal-title" className="text-xl font-black uppercase text-yellow-200">2. Votre proposition</h2><div className="mt-5 grid gap-5"><label className="text-sm">Catégorie *<select required value={category} onChange={(e) => setCategory(e.target.value as typeof initialCategory)} name="category" className={inputClass}>{INTERNATIONAL_INTEREST_CATEGORIES.map((item) => <option className="bg-black" value={item} key={item}>{INTERNATIONAL_INTEREST_CATEGORY_LABELS[item]}</option>)}</select></label><label className="text-sm">Destination concernée *<select required value={destination} onChange={(e) => setDestination(e.target.value as typeof initialDestination)} name="destination" className={inputClass}>{INTERNATIONAL_INTEREST_DESTINATIONS.map((item) => <option className="bg-black" value={item} key={item}>{INTERNATIONAL_INTEREST_DESTINATION_LABELS[item]}</option>)}</select></label><label className="text-sm">Objet de la proposition *<input required name="subject" minLength={5} maxLength={150} className={inputClass} /></label><label className="text-sm">Présentation de la demande *<textarea required name="message" minLength={30} maxLength={3000} rows={6} className={inputClass} /></label><label className="text-sm">Période envisagée<input name="preferred_period" className={inputClass} maxLength={160} placeholder="Sans date confirmée si vous ne savez pas encore" /></label></div><fieldset className="mt-6"><legend className="text-sm">Quelle contribution souhaitez-vous proposer ?</legend><div className="mt-3 grid gap-2 sm:grid-cols-2">{INTERNATIONAL_INTEREST_CONTRIBUTIONS.map((item) => <label className="flex items-center gap-3 rounded-xl border border-white/10 px-3 py-3 text-sm text-white/70" key={item}><input type="checkbox" checked={contributions.includes(item)} onChange={() => toggleContribution(item)} />{INTERNATIONAL_INTEREST_CONTRIBUTION_LABELS[item]}</label>)}</div></fieldset></section>
    <section aria-labelledby="online-title"><h2 id="online-title" className="text-xl font-black uppercase text-yellow-200">3. Présence numérique <span className="text-xs font-normal normal-case text-white/45">(facultatif)</span></h2><div className="mt-5 grid gap-5 sm:grid-cols-2"><label className="text-sm">Site web<input type="url" name="website_url" className={inputClass} /></label><label className="text-sm">LinkedIn<input type="url" name="linkedin_url" className={inputClass} /></label><label className="text-sm">Instagram<input type="url" name="instagram_url" className={inputClass} /></label><label className="text-sm">Portfolio ou présentation<input type="url" name="portfolio_url" className={inputClass} /></label></div></section>
    <section aria-labelledby="consent-title"><h2 id="consent-title" className="text-xl font-black uppercase text-yellow-200">4. Consentement</h2><div className="mt-5 space-y-4 text-sm leading-6 text-white/65"><label className="flex gap-3"><input required type="checkbox" name="consent_given" />J’accepte que mes informations soient utilisées uniquement pour étudier ma proposition et permettre à l’équipe Festival Talent de me recontacter. *</label><label className="flex gap-3"><input required type="checkbox" name="non_contractual_acknowledged" />Je comprends qu’il ne s’agit ni d’une inscription aux présélections, ni d’une confirmation de participation, ni d’un engagement contractuel. *</label></div><input aria-hidden="true" tabIndex={-1} autoComplete="off" name="website" className="absolute left-[-9999px] h-px w-px opacity-0" /></section>
    {state === "error" && <p tabIndex={-1} className="rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-200" role="alert">{error}</p>}
    <button disabled={state === "loading"} type="submit" className="w-full rounded-full bg-yellow-300 px-6 py-4 text-sm font-black uppercase tracking-[.14em] text-black transition hover:bg-yellow-200 disabled:cursor-wait disabled:opacity-60">{state === "loading" ? "Envoi en cours…" : "Manifester son intérêt"}</button>
  </form>;
}
