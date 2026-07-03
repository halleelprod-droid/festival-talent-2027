"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users } from "lucide-react";

import { supabase } from "@/lib/supabase";

export default function LiveRegistrationCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let active = true;

    supabase
      .from("preselections")
      .select("*", { count: "exact", head: true })
      .then(({ count: initialCount }) => {
        if (active) setCount(initialCount ?? 0);
      });

    const channel = supabase
      .channel("preselections-live-count")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "preselections" },
        () => {
          setCount((current) => (current ?? 0) + 1);
        }
      )
      .subscribe();

    return () => {
      active = false;
      supabase.removeChannel(channel);
    };
  }, []);

  if (count === null) return null;

  return (
    <div className="relative z-10 flex justify-center py-6">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="inline-flex items-center gap-3 rounded-full border border-[#C9A84C]/30 bg-[#C9A84C]/10 px-6 py-3 backdrop-blur-xl"
      >
        <Users className="text-[#C9A84C]" size={18} />

        <p className="text-xs font-black uppercase tracking-[0.25em] text-white/80">
          <AnimatePresence mode="popLayout">
            <motion.span
              key={count}
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 10, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="inline-block text-[#C9A84C]"
            >
              {count}
            </motion.span>
          </AnimatePresence>{" "}
          talents inscrits en direct aux pré-sélections
        </p>
      </motion.div>
    </div>
  );
}
