'use client';

import { motion } from 'framer-motion';

export default function LocationSection() {
  return (
    <section className="relative overflow-hidden bg-[#050505] py-40 text-[#F5F0E8]">
      {/* BG */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#C9A84C15,transparent_60%)]" />

      <div className="relative z-10 mx-auto grid max-w-7xl gap-20 px-6 lg:grid-cols-2 lg:items-center">
        {/* LEFT */}
        <motion.div
          initial={{
            opacity: 0,
            y: 80
          }}
          whileInView={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 1
          }}
          viewport={{ once: true }}
        >
          <span className="uppercase tracking-[0.4em] text-[#C9A84C] text-sm">
            Destination FT2027
          </span>

          <h2 className="mt-8 text-5xl font-black leading-[0.9] tracking-[-0.05em] md:text-7xl lg:text-[8rem]">
            Dakar
            <br />
            after dark.
          </h2>

          <p className="mt-10 max-w-2xl text-lg leading-relaxed text-zinc-300 md:text-xl">
            Festival Talent 2027 transforme Dakar en capitale
            immersive de la nouvelle génération culturelle africaine.
            Entre musique, innovation, performances live et expériences
            visuelles, FT2027 crée un univers pensé comme une rencontre
            entre futur, créativité et énergie urbaine.
          </p>

          <p className="mt-6 max-w-2xl leading-relaxed text-zinc-400">
            Pendant plusieurs jours, artistes, créateurs, médias,
            entrepreneurs et communautés se retrouvent dans une
            expérience premium conçue pour connecter l’Afrique
            au reste du monde à travers la culture.
          </p>

          {/* INFOS */}
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {[
              {
                title: 'Lieu',
                value: 'Dakar Arena • Sénégal',
                desc: 'Un espace transformé en expérience immersive nouvelle génération.'
              },
              {
                title: 'Date',
                value: '10 Juillet 2027',
                desc: 'Trois jours d’expériences, concerts et performances exclusives.'
              },
              {
                title: 'Format',
                value: 'Immersive Festival',
                desc: 'Musique, culture, digital, lifestyle et innovation réunis.'
              },
              {
                title: 'Partenaire',
                value: 'Union Européenne',
                desc: 'Premier partenaire officiel soutenant la vision internationale FT2027.'
              }
            ].map((item) => (
              <div
                key={item.title}
                className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl transition duration-500 hover:-translate-y-2 hover:border-[#C9A84C]/30"
              >
                {/* GLOW */}
                <div className="absolute inset-0 opacity-0 transition duration-700 group-hover:opacity-100 bg-[radial-gradient(circle_at_top,#C9A84C10,transparent_60%)]" />

                <div className="relative z-10">
                  <p className="uppercase tracking-[0.3em] text-xs text-zinc-500">
                    {item.title}
                  </p>

                  <h3 className="mt-4 text-2xl font-black leading-tight">
                    {item.value}
                  </h3>

                  <p className="mt-4 text-sm leading-relaxed text-zinc-400">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT IMAGE */}
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.95
          }}
          whileInView={{
            opacity: 1,
            scale: 1
          }}
          transition={{
            duration: 1.2
          }}
          viewport={{ once: true }}
          className="group relative overflow-hidden rounded-[3rem] border border-white/10"
        >
          {/* IMAGE */}
          <div
            className="aspect-[4/5] bg-cover bg-center transition duration-700 group-hover:scale-105"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=2000&auto=format&fit=crop')"
            }}
          />

          {/* OVERLAY */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />

          {/* GOLD LIGHT */}
          <div className="absolute inset-0 opacity-0 transition duration-700 group-hover:opacity-100 bg-[radial-gradient(circle_at_center,#C9A84C15,transparent_60%)]" />

          {/* TEXT */}
          <div className="absolute bottom-0 left-0 right-0 p-10">
            <h3 className="text-5xl font-black md:text-6xl">
              DAKAR
            </h3>

            <p className="mt-4 max-w-md uppercase tracking-[0.3em] text-sm leading-relaxed text-zinc-300">
              West Africa • Music • Culture • Future • FT2027 Experience
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}