"use client";

import { useRef, type PointerEvent } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

const particles = [
  { left: "8%", bottom: "8%", size: 2, duration: 15, delay: 0 },
  { left: "16%", bottom: "18%", size: 3, duration: 18, delay: 4 },
  { left: "25%", bottom: "5%", size: 2, duration: 13, delay: 7 },
  { left: "34%", bottom: "22%", size: 4, duration: 20, delay: 2 },
  { left: "43%", bottom: "10%", size: 2, duration: 16, delay: 8 },
  { left: "52%", bottom: "4%", size: 3, duration: 19, delay: 5 },
  { left: "61%", bottom: "20%", size: 2, duration: 14, delay: 1 },
  { left: "70%", bottom: "9%", size: 4, duration: 21, delay: 9 },
  { left: "79%", bottom: "16%", size: 2, duration: 17, delay: 3 },
  { left: "89%", bottom: "6%", size: 3, duration: 22, delay: 6 },
] as const;

const paragraphs = [
  <>Source de toute inspiration,<br />souffle invisible derrière chaque vision,<br />lumière au commencement de chaque chemin.</>,
  <>Nous Te rendons grâce pour les talents confiés,<br />pour les portes ouvertes,<br />pour les obstacles transformés en force<br />et pour les rencontres devenues destinée.</>,
  <>Festival Talent n’est pas seulement un événement.<br />C’est une vision qui prend vie,<br />une génération qui se lève,<br />et des dons cachés qui trouvent enfin leur lumière.</>,
  <>Que chaque artiste découvre sa voie.<br />Que chaque rêve rencontre son moment.<br />Que chaque talent devienne une bénédiction pour le monde.</>,
] as const;

export default function GratitudeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateY = useSpring(pointerX, { stiffness: 45, damping: 20 });
  const rotateX = useSpring(pointerY, { stiffness: 45, damping: 20 });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const sceneY = useTransform(scrollYProgress, [0, 1], [70, -70]);
  const lightOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.35, 1, 0.35]);

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (reduceMotion || event.pointerType === "touch") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 8);
    pointerY.set(((event.clientY - bounds.top) / bounds.height - 0.5) * -8);
  }

  function resetPointer() {
    pointerX.set(0);
    pointerY.set(0);
  }

  return (
    <section
      ref={sectionRef}
      id="gratitude"
      aria-labelledby="gratitude-title"
      className="relative isolate overflow-hidden bg-[#020104] px-4 py-20 text-white sm:px-6 sm:py-28 lg:px-20 lg:py-36"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(91,33,182,0.18),transparent_38%),radial-gradient(ellipse_at_50%_70%,rgba(201,168,76,0.09),transparent_44%),linear-gradient(180deg,#000_0%,#07030d_35%,#030105_78%,#000_100%)]" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black to-transparent" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-black" />
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-[38%] h-[100vw] w-[100vw] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.025] bg-white/[0.012] blur-3xl sm:h-[58rem] sm:w-[58rem]" />

      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden motion-reduce:hidden">
        {particles.map((particle) => (
          <motion.span
            key={`${particle.left}-${particle.bottom}`}
            className="absolute rounded-full bg-[#f6d77a] shadow-[0_0_10px_rgba(246,215,122,0.85)]"
            style={{ left: particle.left, bottom: particle.bottom, width: particle.size, height: particle.size }}
            animate={{ y: [0, -520], opacity: [0, 0.8, 0] }}
            transition={{ duration: particle.duration, delay: particle.delay, repeat: Infinity, ease: "linear" }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <header className="mx-auto max-w-4xl text-center">
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.7 }}
            transition={{ duration: 0.9 }}
            className="text-[0.68rem] font-black uppercase tracking-[0.3em] text-[#e8ca75] sm:text-xs sm:tracking-[0.46em]"
          >
            Reconnaissance éternelle
          </motion.p>
          <motion.h2
            id="gratitude-title"
            initial={reduceMotion ? false : { opacity: 0, filter: "blur(14px)", y: 20 }}
            whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ delay: 0.15, duration: 1.25, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 text-balance text-5xl font-black uppercase leading-none tracking-[-0.045em] text-white sm:text-7xl lg:text-8xl"
          >
            À <span className="bg-gradient-to-b from-white via-[#fff4ce] to-[#b99032] bg-clip-text text-transparent">Dieu</span>
          </motion.h2>
        </header>

        <div
          className="relative mx-auto mt-10 h-[22rem] w-full max-w-4xl touch-pan-y [perspective:1200px] sm:mt-14 sm:h-[34rem] lg:h-[40rem]"
          onPointerMove={handlePointerMove}
          onPointerLeave={resetPointer}
        >
          <motion.div
            aria-hidden="true"
            className="absolute inset-0 flex items-center justify-center [transform-style:preserve-3d]"
            style={{ y: reduceMotion ? 0 : sceneY, rotateX, rotateY }}
          >
            <motion.div style={{ opacity: lightOpacity }} className="absolute h-[95%] w-28 bg-gradient-to-b from-white/0 via-[#fff2bf]/15 to-white/0 blur-2xl [clip-path:polygon(46%_0,54%_0,100%_100%,0_100%)] sm:w-44" />
            <motion.div
              animate={reduceMotion ? undefined : { scale: [0.96, 1.04, 0.96], opacity: [0.72, 1, 0.72] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="absolute h-40 w-40 rounded-full bg-[radial-gradient(circle_at_38%_32%,#fff_0%,#fff5cf_12%,#e8c96d_30%,rgba(127,71,189,0.56)_58%,rgba(20,7,31,0)_72%)] shadow-[0_0_50px_rgba(255,242,191,0.5),0_0_130px_rgba(171,111,230,0.32),0_0_240px_rgba(201,168,76,0.2)] sm:h-60 sm:w-60 lg:h-72 lg:w-72"
            />
            <div className="absolute h-56 w-56 rounded-full border border-[#f6d77a]/35 shadow-[inset_0_0_30px_rgba(246,215,122,0.08),0_0_24px_rgba(246,215,122,0.08)] [transform:rotateX(68deg)_rotateZ(12deg)] sm:h-80 sm:w-80 lg:h-96 lg:w-96">
              <motion.div className="h-full w-full rounded-full border-t border-[#fff2bf]/90" animate={reduceMotion ? undefined : { rotate: 360 }} transition={{ duration: 19, repeat: Infinity, ease: "linear" }} />
            </div>
            <div className="absolute h-64 w-64 rounded-full border border-violet-200/20 [transform:rotateY(68deg)_rotateZ(-18deg)] sm:h-[23rem] sm:w-[23rem] lg:h-[28rem] lg:w-[28rem]">
              <motion.div className="h-full w-full rounded-full border-r border-[#f6d77a]/70" animate={reduceMotion ? undefined : { rotate: -360 }} transition={{ duration: 27, repeat: Infinity, ease: "linear" }} />
            </div>
            <motion.div className="absolute h-72 w-72 rounded-full border border-white/10 sm:h-[27rem] sm:w-[27rem] lg:h-[34rem] lg:w-[34rem]" animate={reduceMotion ? undefined : { rotate: 360 }} transition={{ duration: 38, repeat: Infinity, ease: "linear" }}>
              <span className="absolute left-1/2 top-[-3px] h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_15px_4px_rgba(255,244,207,0.8)]" />
            </motion.div>
            <div className="absolute bottom-[12%] h-12 w-[75%] rounded-[100%] bg-[#c9a84c]/15 blur-2xl sm:bottom-[8%]" />
          </motion.div>
          <p className="sr-only">Composition abstraite évoquant la lumière, l’énergie et l’infini.</p>
        </div>

        <div className="mx-auto -mt-4 max-w-3xl text-center sm:mt-0">
          {paragraphs.map((paragraph, index) => (
            <motion.p
              key={index}
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ delay: 0.05, duration: 0.9 }}
              className="mt-8 text-pretty text-base font-light leading-8 text-white/70 sm:mt-10 sm:text-lg sm:leading-9"
            >
              {paragraph}
            </motion.p>
          ))}

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 1.1 }}
            className="relative mx-auto mt-16 max-w-2xl overflow-hidden rounded-3xl border border-[#e8ca75]/25 bg-[linear-gradient(135deg,rgba(255,255,255,0.06),rgba(201,168,76,0.06),rgba(91,33,182,0.08))] px-5 py-10 shadow-[0_25px_100px_rgba(0,0,0,0.55),0_0_70px_rgba(201,168,76,0.08)] backdrop-blur-xl sm:px-10 sm:py-12"
          >
            <div aria-hidden="true" className="absolute inset-x-[18%] top-0 h-px bg-gradient-to-r from-transparent via-[#f6d77a] to-transparent" />
            <p className="text-xl font-light leading-9 text-[#fff6d9] sm:text-2xl sm:leading-10">
              À Toi la gratitude.<br />À Toi l’honneur.<br /><strong className="font-semibold text-white">À Toi toute la gloire.</strong>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
