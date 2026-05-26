export default function SponsorsCTA() {
  return (
    <section className="relative py-40 px-6 border-t border-white/10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.15),transparent_45%)]" />

      <div className="relative max-w-5xl mx-auto text-center">
        <p className="uppercase tracking-[0.4em] text-sm text-blue-300 mb-6">
          Sponsoring & Investment
        </p>

        <h2 className="text-4xl md:text-7xl font-black leading-tight">
          DEVENEZ
          <br />
          PARTENAIRE
          <br />
          OFFICIEL
        </h2>

        <p className="mt-8 text-white/60 text-lg max-w-3xl mx-auto leading-relaxed">
          Associez votre marque à une nouvelle génération d’événements culturels
          africains à fort impact médiatique, digital et international.
        </p>

        <div className="flex flex-col md:flex-row gap-5 justify-center mt-12">
          <a
            href="/partners"
            className="px-10 py-5 rounded-full bg-blue-500 text-white font-bold hover:scale-105 transition-all duration-300"
          >
            Télécharger le dossier sponsor
          </a>

          <a
            href="mailto:contact@festivaltalentofficial.com"
            className="px-10 py-5 rounded-full border border-white/20 hover:bg-white/10 transition-all duration-300"
          >
            Contacter l’équipe
          </a>
        </div>
      </div>
    </section>
  );
}