export default function NewsletterSection() {
  return (
    <section className="relative py-32 px-6 border-t border-white/10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_45%)]" />

      <div className="relative max-w-4xl mx-auto text-center">
        <p className="uppercase tracking-[0.4em] text-sm text-white/50 mb-6">
          Stay Updated
        </p>

        <h2 className="text-4xl md:text-6xl font-black leading-tight">
          RESTEZ CONNECTÉ
          <br />
          AU FESTIVAL
        </h2>

        <p className="mt-8 text-white/60 text-lg leading-relaxed max-w-2xl mx-auto">
          Recevez les annonces officielles, les informations artistes,
          partenaires, billetterie et opportunités autour de Festival Talent
          2027.
        </p>

        <form className="mt-12 flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
          <input
            type="email"
            placeholder="Votre adresse email"
            className="flex-1 px-6 py-5 rounded-full bg-white/[0.06] border border-white/10 outline-none text-white placeholder:text-white/40 backdrop-blur-xl"
          />

          <button
            type="submit"
            className="px-8 py-5 rounded-full bg-white text-black font-black hover:scale-105 transition-all duration-300"
          >
            S’inscrire
          </button>
        </form>
      </div>
    </section>
  );
}