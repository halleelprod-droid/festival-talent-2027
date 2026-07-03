"use client";

import { FormEvent, useState } from "react";

import MagneticButton from "@/components/ui/MagneticButton";

type Status = "idle" | "loading" | "success" | "error";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setStatus("error");
        setMessage(data.message ?? "Une erreur est survenue.");
        return;
      }

      setStatus("success");
      setMessage(data.message ?? "Inscription réussie");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Une erreur est survenue.");
    }
  }

  return (
    <section className="relative py-32 px-6 border-t border-white/10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_45%)]" />

      <div className="relative max-w-4xl mx-auto text-center">
        <p className="uppercase tracking-[0.4em] text-sm text-white/50 mb-6">
          Stay Updated
        </p>

        <h2 className="font-display text-4xl md:text-6xl leading-tight">
          RESTEZ CONNECTÉ
          <br />
          AU FESTIVAL
        </h2>

        <p className="mt-8 text-white/60 text-lg leading-relaxed max-w-2xl mx-auto">
          Recevez les annonces officielles, les informations artistes,
          partenaires, billetterie et opportunités autour de Festival Talent
          2027.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-12 flex flex-col md:flex-row gap-4 max-w-2xl mx-auto"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Votre adresse email"
            className="flex-1 px-6 py-5 rounded-full bg-white/[0.06] border border-white/10 outline-none text-white placeholder:text-white/55 backdrop-blur-xl"
          />

          <MagneticButton
            type="submit"
            disabled={status === "loading"}
            className="!bg-white !text-black !border-white/20"
          >
            {status === "loading" ? "Envoi..." : "S'inscrire"}
          </MagneticButton>
        </form>

        {message && (
          <p
            className={`mt-6 text-sm ${
              status === "error" ? "text-red-400" : "text-[#C9A84C]"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </section>
  );
}
