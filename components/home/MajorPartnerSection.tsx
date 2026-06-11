export default function MajorPartnerSection() {
  return (
    <section className="relative overflow-hidden border-t border-yellow-400/20 px-6 py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(234,179,8,0.16),transparent_45%)]" />

      <div className="relative mx-auto max-w-6xl">
        <div className="premium-card rounded-[2rem] p-10 text-center md:p-16">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.2),transparent_48%)]" />
          <p className="relative z-10 mb-6 text-sm uppercase tracking-[0.4em] text-blue-200">
            Premier Partenaire Officiel Majeur
          </p>

          <h2 className="relative z-10 mb-8 text-4xl font-black md:text-7xl">
            UNION EUROPEENNE
          </h2>

          <p className="relative z-10 mx-auto max-w-3xl text-lg leading-relaxed text-white/70 md:text-xl">
            Union Europeenne accompagne Festival Talent 2027 dans sa mission
            de valorisation de la jeunesse, de la creativite, de innovation
            et des industries culturelles africaines.
          </p>

          <div className="relative z-10 mt-10 inline-flex items-center rounded-full border border-blue-300/30 bg-black/30 px-8 py-4">
            <span className="text-xs uppercase tracking-[0.3em] text-blue-200">
              Partenaire Institutionnel Majeur
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
