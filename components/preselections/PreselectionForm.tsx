"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

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

export default function PreselectionForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [whatsappUrl, setWhatsappUrl] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setSuccess("");
    setError("");
    setWhatsappUrl("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      full_name: String(formData.get("full_name") || "").trim(),
      phone: String(formData.get("phone") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      age: Number(formData.get("age")) || null,
      city: String(formData.get("city") || "").trim(),
      discipline: String(formData.get("discipline") || "").trim(),
      experience: String(formData.get("experience") || "").trim(),
      portfolio_link: String(formData.get("portfolio_link") || "").trim(),
      message: String(formData.get("message") || "").trim(),
    };

    if (
      !payload.full_name ||
      !payload.phone ||
      !payload.city ||
      !payload.discipline
    ) {
      setError("Merci de remplir les champs obligatoires.");
      setLoading(false);
      return;
    }

    const { error: insertError } = await supabase
      .from("preselections")
      .insert(payload);

    if (insertError) {
  console.error(insertError);
  setError(`Erreur Supabase : ${insertError.message}`);
  setLoading(false);
  return;
}

    const whatsappMessage = encodeURIComponent(
      `Bonjour Festival Talent, je viens de remplir le formulaire de pré-sélection.\n\nNom : ${payload.full_name}\nTéléphone : ${payload.phone}\nVille : ${payload.city}\nDiscipline : ${payload.discipline}`
    );

    setWhatsappUrl(`https://wa.me/221781948606?text=${whatsappMessage}`);
    setSuccess(
      "Candidature envoyée avec succès. L’équipe Festival Talent te contactera."
    );

    form.reset();
    setLoading(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[2rem] border border-yellow-400/20 bg-white/[0.04] p-6 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-8"
    >
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="text-xs font-black uppercase tracking-[0.25em] text-yellow-300">
            Nom complet *
          </label>
          <input
            name="full_name"
            required
            className="mt-3 w-full rounded-2xl border border-white/10 bg-black/50 px-5 py-4 text-white outline-none transition placeholder:text-white/30 focus:border-yellow-400/50"
            placeholder="Ex : Mamadou Diop"
          />
        </div>

        <div>
          <label className="text-xs font-black uppercase tracking-[0.25em] text-yellow-300">
            Téléphone *
          </label>
          <input
            name="phone"
            required
            className="mt-3 w-full rounded-2xl border border-white/10 bg-black/50 px-5 py-4 text-white outline-none transition placeholder:text-white/30 focus:border-yellow-400/50"
            placeholder="Ex : 77 000 00 00"
          />
        </div>

        <div>
          <label className="text-xs font-black uppercase tracking-[0.25em] text-yellow-300">
            Email
          </label>
          <input
            name="email"
            type="email"
            className="mt-3 w-full rounded-2xl border border-white/10 bg-black/50 px-5 py-4 text-white outline-none transition placeholder:text-white/30 focus:border-yellow-400/50"
            placeholder="Ex : contact@email.com"
          />
        </div>

        <div>
          <label className="text-xs font-black uppercase tracking-[0.25em] text-yellow-300">
            Âge
          </label>
          <input
            name="age"
            type="number"
            min="10"
            max="80"
            className="mt-3 w-full rounded-2xl border border-white/10 bg-black/50 px-5 py-4 text-white outline-none transition placeholder:text-white/30 focus:border-yellow-400/50"
            placeholder="Ex : 22"
          />
        </div>

        <div>
          <label className="text-xs font-black uppercase tracking-[0.25em] text-yellow-300">
            Ville *
          </label>
          <input
            name="city"
            required
            className="mt-3 w-full rounded-2xl border border-white/10 bg-black/50 px-5 py-4 text-white outline-none transition placeholder:text-white/30 focus:border-yellow-400/50"
            placeholder="Ex : Dakar"
          />
        </div>

        <div>
          <label className="text-xs font-black uppercase tracking-[0.25em] text-yellow-300">
            Discipline *
          </label>
          <select
            name="discipline"
            required
            defaultValue=""
            className="mt-3 w-full rounded-2xl border border-white/10 bg-black/50 px-5 py-4 text-white outline-none transition focus:border-yellow-400/50"
          >
            <option value="" disabled>
              Choisir une discipline
            </option>

            {disciplines.map((discipline) => (
              <option key={discipline} value={discipline} className="bg-black">
                {discipline}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-5">
        <label className="text-xs font-black uppercase tracking-[0.25em] text-yellow-300">
          Expérience / parcours
        </label>
        <textarea
          name="experience"
          rows={4}
          className="mt-3 w-full rounded-2xl border border-white/10 bg-black/50 px-5 py-4 text-white outline-none transition placeholder:text-white/30 focus:border-yellow-400/50"
          placeholder="Présente ton parcours, ton talent ou ton projet..."
        />
      </div>

      <div className="mt-5">
        <label className="text-xs font-black uppercase tracking-[0.25em] text-yellow-300">
          Lien vidéo / portfolio
        </label>
        <input
          name="portfolio_link"
          className="mt-3 w-full rounded-2xl border border-white/10 bg-black/50 px-5 py-4 text-white outline-none transition placeholder:text-white/30 focus:border-yellow-400/50"
          placeholder="Lien TikTok, Instagram, YouTube, Drive, portfolio..."
        />
      </div>

      <div className="mt-5">
        <label className="text-xs font-black uppercase tracking-[0.25em] text-yellow-300">
          Message complémentaire
        </label>
        <textarea
          name="message"
          rows={4}
          className="mt-3 w-full rounded-2xl border border-white/10 bg-black/50 px-5 py-4 text-white outline-none transition placeholder:text-white/30 focus:border-yellow-400/50"
          placeholder="Ajoute une information importante..."
        />
      </div>

      {error && (
        <p className="mt-5 rounded-2xl border border-red-400/30 bg-red-500/10 px-5 py-4 text-sm text-red-200">
          {error}
        </p>
      )}

      {success && (
        <div className="mt-5 rounded-2xl border border-green-400/30 bg-green-500/10 px-5 py-4 text-sm text-green-200">
          <p>{success}</p>

          {whatsappUrl && (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex rounded-full bg-green-400 px-5 py-3 text-xs font-black uppercase tracking-[0.2em] text-black transition hover:scale-105"
            >
              Confirmer sur WhatsApp
            </a>
          )}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="mt-7 w-full rounded-full bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-700 px-8 py-5 text-xs font-black uppercase tracking-[0.25em] text-black transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Envoi en cours..." : "Envoyer ma candidature"}
      </button>
    </form>
  );
}