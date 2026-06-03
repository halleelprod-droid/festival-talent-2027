export default function MajorPartnerSection() {
  return (
    <section className="relative py-32 px-6 border-t border-yellow-400/20 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(234,179,8,0.16),transparent_45%)]" />

      <div className="relative max-w-6xl mx-auto">
        <div className="rounded-[2rem] border border-yellow-400/20 bg-yellow-400/[0.05] backdrop-blur-xl p-10 md:p-16 text-center">
          <p className="uppercase tracking-[0.4em] text-yellow-300 text-sm mb-6">
            Premier Partenaire Officiel
          </p>

          <h2 className="text-4xl md:text-7xl font-black mb-8">
            🇪🇺 UNION EUROPÉENNE
          </h2>

          <p className="text-white/70 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            L'Union Européenne accompagne Festival Talent 2027 dans sa mission
            de valorisation de la jeunesse, de la créativité, de l'innovation
            et des industries culturelles africaines.
          </p>

          <div className="mt-10 inline-flex items-center rounded-full border border-yellow-400/20 px-8 py-4 bg-black/30">
            <span className="uppercase tracking-[0.3em] text-yellow-300 text-xs">
              Partenaire Institutionnel Majeur
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}