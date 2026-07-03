"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays, Clock3, MapPin } from "lucide-react";

import FadeIn from "@/components/ui/FadeIn";

const FESTIVAL_DATE = new Date("2027-01-01T00:00:00").getTime();

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getTimeLeft(): TimeLeft {
  const now = Date.now();
  const difference = FESTIVAL_DATE - now;

  if (difference <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

export default function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => getTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const countdownItems = [
    {
      label: "Jours",
      value: timeLeft.days,
    },
    {
      label: "Heures",
      value: timeLeft.hours,
    },
    {
      label: "Minutes",
      value: timeLeft.minutes,
    },
    {
      label: "Secondes",
      value: timeLeft.seconds,
    },
  ];

  return (
    <section className="relative overflow-hidden bg-black px-6 py-28 text-white sm:px-10 lg:px-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.16),transparent_36%),linear-gradient(to_bottom,rgba(0,0,0,0.1),#000)]" />
      <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl text-center">
        <FadeIn className="mx-auto max-w-4xl">
          <p className="text-sm font-bold uppercase tracking-[0.45em] text-yellow-400">
            Festival Countdown
          </p>

          <h2 className="font-display mt-8 text-5xl leading-none tracking-tight text-white sm:text-6xl md:text-8xl">
            Paris & Rome
            <span className="block bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-700 bg-clip-text text-transparent">
              Starts Soon.
            </span>
          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-base leading-8 text-white/65 sm:text-lg">
            Festival Talent 2027 prépare sa tournée européenne entre Paris et
            Rome, avec des pré-sélections officielles avant le lancement de
            janvier 2027.
          </p>
        </FadeIn>

        <div className="mt-16 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-7">
          {countdownItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.6 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/40 backdrop-blur-xl transition duration-300 hover:border-yellow-400/50 hover:bg-yellow-400/[0.06] sm:p-8"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />

              <div className="relative">
                <h3
                  suppressHydrationWarning
                  className="text-5xl font-black leading-none text-white sm:text-6xl md:text-7xl"
                >
                  {String(item.value).padStart(2, "0")}
                </h3>

                <p className="mt-5 text-xs font-bold uppercase tracking-[0.35em] text-white/55">
                  {item.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="mx-auto mt-14 grid max-w-5xl gap-4 md:grid-cols-3"
        >
          <div className="rounded-3xl border border-yellow-400/20 bg-yellow-400/[0.06] p-5 text-left backdrop-blur-xl">
            <CalendarDays className="mb-3 text-yellow-300" size={24} />
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-yellow-300">
              Période
            </p>
            <p className="mt-2 text-white/70">Janvier — Avril 2027</p>
          </div>

          <div className="rounded-3xl border border-yellow-400/20 bg-yellow-400/[0.06] p-5 text-left backdrop-blur-xl">
            <MapPin className="mb-3 text-yellow-300" size={24} />
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-yellow-300">
              Villes
            </p>
            <p className="mt-2 text-white/70">Paris • Rome • Europe</p>
          </div>

          <div className="rounded-3xl border border-yellow-400/20 bg-yellow-400/[0.06] p-5 text-left backdrop-blur-xl">
            <Clock3 className="mb-3 text-yellow-300" size={24} />
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-yellow-300">
              Expérience
            </p>
            <p className="mt-2 text-white/70">
              Pré-sélections, showcases, panels, networking et talents.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}