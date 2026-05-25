'use client';

import {
  motion
} from 'framer-motion';

import {
  useEffect,
  useState
} from 'react';

export default function CountdownSection() {
  const targetDate =
    new Date('2027-07-10T18:00:00');

  const calculateTimeLeft = () => {
    const difference =
      +targetDate - +new Date();

    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(
          difference /
            (1000 * 60 * 60 * 24)
        ),

        hours: Math.floor(
          (difference /
            (1000 *
              60 *
              60)) %
            24
        ),

        minutes: Math.floor(
          (difference / 1000 / 60) %
            60
        ),

        seconds: Math.floor(
          (difference / 1000) %
            60
        )
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] =
    useState(
      calculateTimeLeft()
    );

  useEffect(() => {
    const timer =
      setInterval(() => {
        setTimeLeft(
          calculateTimeLeft()
        );
      }, 1000);

    return () =>
      clearInterval(timer);
  }, []);

  const items = [
    {
      value: timeLeft.days,
      label: 'Days'
    },

    {
      value: timeLeft.hours,
      label: 'Hours'
    },

    {
      value: timeLeft.minutes,
      label: 'Minutes'
    },

    {
      value: timeLeft.seconds,
      label: 'Seconds'
    }
  ];

  return (
    <section className="relative overflow-hidden bg-black py-40 text-[#F5F0E8]">
      {/* BG */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#C9A84C15,transparent_60%)]" />

      {/* LIGHT */}
      <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C9A84C]/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
        {/* HEADER */}
        <motion.div
          initial={{
            opacity: 0,
            y: 60
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
          <span className="text-sm uppercase tracking-[0.4em] text-[#C9A84C]">
            Festival Countdown
          </span>

          <h2
            className="
              mt-8
              text-5xl
              font-black
              leading-[0.9]
              tracking-[-0.05em]
              md:text-7xl
              lg:text-[8rem]
            "
          >
            The Future
            <br />
            Starts Soon.
          </h2>

          <p className="mx-auto mt-10 max-w-2xl text-lg leading-relaxed text-zinc-400">
            FT2027 arrive bientôt à Dakar pour une expérience
            immersive mêlant culture, musique et innovation.
          </p>
        </motion.div>

        {/* COUNTDOWN */}
        <div className="mt-24 grid grid-cols-2 gap-6 md:grid-cols-4">
          {items.map(
            (
              item,
              index
            ) => (
              <motion.div
                key={item.label}
                initial={{
                  opacity: 0,
                  y: 80
                }}
                whileInView={{
                  opacity: 1,
                  y: 0
                }}
                transition={{
                  delay: index * 0.08,
                  duration: 1
                }}
                viewport={{ once: true }}
                className="
                  glass
                  relative
                  overflow-hidden
                  rounded-[2rem]
                  border
                  border-white/10
                  p-10
                "
              >
                {/* GOLD LIGHT */}
                <div
                  className="
                    absolute
                    inset-0
                    bg-[radial-gradient(circle_at_center,#C9A84C10,transparent_70%)]
                  "
                />

                <div className="relative z-10">
                  <h3 className="text-5xl font-black md:text-7xl">
                    {String(
                      item.value
                    ).padStart(
                      2,
                      '0'
                    )}
                  </h3>

                  <p className="mt-4 text-sm uppercase tracking-[0.3em] text-zinc-400">
                    {item.label}
                  </p>
                </div>
              </motion.div>
            )
          )}
        </div>
      </div>
    </section>
  );
}