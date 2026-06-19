"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { ArrowRight, CheckCircle2, Loader2, Send, ShieldCheck } from "lucide-react";

import { getSupabaseClient } from "@/lib/supabase";

const disciplines = [
  "Danse",
  "Musique",
  "Mode",
  "Art",
  "Entrepreneuriat",
  "Technologie",
  "Culture urbaine",
  "Sports mécaniques",
];

type FormValues = {
  full_name: string;
  phone: string;
  email: string;
  age: string;
  city: string;
  discipline: string;
  experience: string;
  portfolio_link: string;
  message: string;
};

const initialValues: FormValues = {
  full_name: "",
  phone: "",
  email: "",
  age: "",
  city: "",
  discipline: "",
  experience: "",
  portfolio_link: "",
  message: "",
};

const inputClassName =
  "w-full rounded-2xl border border-white/10 bg-black/35 px-5 py-4 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-yellow-400/50 focus:bg-black/50";

const labelClassName =
  "text-xs font-black uppercase tracking-[0.22em] text-white/55";

export default function PreselectionForm() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function updateField(field: keyof FormValues, value: string) {
    setValues((currentValues) => ({
      ...currentValues,
      [field]: value,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (
      !values.full_name.trim() ||
      !values.phone.trim() ||
      !values.city.trim() ||
      !values.discipline.trim()
    ) {
      setError("Merci de renseigner le nom, le telephone, la ville et la discipline.");
      return;
    }

    setIsLoading(true);

    try {
      const payload = {
        full_name: values.full_name.trim(),
        phone: values.phone.trim(),
        email: values.email.trim() || null,
        age: values.age ? Number(values.age) : null,
        city: values.city.trim(),
        discipline: values.discipline,
        experience: values.experience.trim() || null,
        portfolio_link: values.portfolio_link.trim() || null,
        message: values.message.trim() || null,
      };

      const supabase = getSupabaseClient();
      const { error: supabaseError } = await supabase
        .from("preselections")
        .insert(payload);

      if (supabaseError) {
        setError(supabaseError.message);
        return;
      }

      setValues(initialValues);
      setSuccess("Candidature envoyee avec succes. Notre equipe vous contactera pour la suite.");
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "Une erreur est survenue pendant l'envoi de la candidature.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[2rem] border border-yellow-400/20 bg-white/[0.045] p-6 shadow-2xl shadow-black/35 backdrop-blur-2xl sm:p-8 lg:p-10"
    >
      <div className="flex flex-col gap-5 border-b border-white/10 pb-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="inline-flex items-center gap-3 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-4 py-2 text-xs font-black uppercase tracking-[0.28em] text-yellow-300">
            <ShieldCheck size={15} />
            Formulaire officiel
          </div>
          <h3 className="mt-5 text-3xl font-black uppercase leading-tight text-white sm:text-4xl">
            Candidate aux pre-selections
          </h3>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/60">
            Remplis les informations principales pour permettre a l'equipe
            Festival Talent 2027 d'etudier ton profil.
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <label className="space-y-3">
          <span className={labelClassName}>Nom complet *</span>
          <input
            className={inputClassName}
            name="full_name"
            value={values.full_name}
            onChange={(event) => updateField("full_name", event.target.value)}
            placeholder="Votre nom complet"
            autoComplete="name"
            required
          />
        </label>

        <label className="space-y-3">
          <span className={labelClassName}>Telephone *</span>
          <input
            className={inputClassName}
            name="phone"
            value={values.phone}
            onChange={(event) => updateField("phone", event.target.value)}
            placeholder="+221 77 000 00 00"
            autoComplete="tel"
            required
          />
        </label>

        <label className="space-y-3">
          <span className={labelClassName}>Email</span>
          <input
            className={inputClassName}
            name="email"
            type="email"
            value={values.email}
            onChange={(event) => updateField("email", event.target.value)}
            placeholder="vous@email.com"
            autoComplete="email"
          />
        </label>

        <label className="space-y-3">
          <span className={labelClassName}>Age</span>
          <input
            className={inputClassName}
            name="age"
            type="number"
            min="1"
            max="120"
            value={values.age}
            onChange={(event) => updateField("age", event.target.value)}
            placeholder="Votre age"
          />
        </label>

        <label className="space-y-3">
          <span className={labelClassName}>Ville *</span>
          <input
            className={inputClassName}
            name="city"
            value={values.city}
            onChange={(event) => updateField("city", event.target.value)}
            placeholder="Dakar, Paris, Rome..."
            autoComplete="address-level2"
            required
          />
        </label>

        <label className="space-y-3">
          <span className={labelClassName}>Discipline *</span>
          <select
            className={`${inputClassName} appearance-none`}
            name="discipline"
            value={values.discipline}
            onChange={(event) => updateField("discipline", event.target.value)}
            required
          >
            <option className="bg-black text-white" value="">
              Choisir une discipline
            </option>
            {disciplines.map((discipline) => (
              <option className="bg-black text-white" key={discipline} value={discipline}>
                {discipline}
              </option>
            ))}
          </select>
        </label>

        <label className="space-y-3 md:col-span-2">
          <span className={labelClassName}>Experience</span>
          <textarea
            className={`${inputClassName} min-h-28 resize-y`}
            name="experience"
            value={values.experience}
            onChange={(event) => updateField("experience", event.target.value)}
            placeholder="Scenes, concours, projets, creations ou parcours..."
          />
        </label>

        <label className="space-y-3 md:col-span-2">
          <span className={labelClassName}>Portfolio / lien video</span>
          <input
            className={inputClassName}
            name="portfolio_link"
            type="url"
            value={values.portfolio_link}
            onChange={(event) => updateField("portfolio_link", event.target.value)}
            placeholder="https://..."
          />
        </label>

        <label className="space-y-3 md:col-span-2">
          <span className={labelClassName}>Message</span>
          <textarea
            className={`${inputClassName} min-h-32 resize-y`}
            name="message"
            value={values.message}
            onChange={(event) => updateField("message", event.target.value)}
            placeholder="Ajoutez une presentation courte ou une information utile."
          />
        </label>
      </div>

      {error ? (
        <div className="mt-6 rounded-2xl border border-red-400/30 bg-red-500/10 px-5 py-4 text-sm leading-6 text-red-100">
          {error}
        </div>
      ) : null}

      {success ? (
        <div className="mt-6 flex items-start gap-3 rounded-2xl border border-emerald-400/30 bg-emerald-500/10 px-5 py-4 text-sm leading-6 text-emerald-100">
          <CheckCircle2 className="mt-0.5 shrink-0 text-emerald-300" size={18} />
          <span>{success}</span>
        </div>
      ) : null}

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/35">
          Les champs marques * sont obligatoires.
        </p>
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-700 px-8 py-4 text-xs font-black uppercase tracking-[0.22em] text-black transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin" size={17} />
              Envoi...
            </>
          ) : (
            <>
              Envoyer
              <Send size={17} />
            </>
          )}
          <ArrowRight className="hidden sm:block" size={17} />
        </button>
      </div>
    </form>
  );
}
