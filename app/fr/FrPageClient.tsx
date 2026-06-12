"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

import AnnouncementBar from "@/components/home/AnnouncementBar";
import CountdownSection from "@/components/home/CountdownSection";
import AboutSection from "@/components/home/AboutSection";
import ExperienceSection from "@/components/home/ExperienceSection";
import ScheduleSection from "@/components/home/ScheduleSection";
import ArtistsSection from "@/components/home/ArtistsSection";
import StatsSection from "@/components/home/StatsSection";
import MediaSection from "@/components/home/MediaSection";
import GallerySection from "@/components/home/GallerySection";
import PreviousEditionSection from "@/components/home/PreviousEditionSection";
import PreviousArtistsSection from "@/components/home/PreviousArtistsSection";
import ImpactSection from "@/components/home/ImpactSection";
import SponsorBenefitsSection from "@/components/home/SponsorBenefitsSection";
import NewsletterSection from "@/components/home/NewsletterSection";
import WhyPartnerSection from "@/components/home/WhyPartnerSection";
import MajorPartnerSection from "@/components/home/MajorPartnerSection";
import PartnersSection from "@/components/home/PartnersSection";
import OfficialPartners from "@/components/home/OfficialPartners";
import SponsorsCTA from "@/components/home/SponsorsCTA";
import FinalCTA from "@/components/home/FinalCTA";
import AnimatedBackground from "@/components/home/AnimatedBackground";
import HighlightVideoSection from "@/components/home/HighlightVideoSection";
import FadeUp from "@/components/ui/FadeUp";
import SponsorshipPackages from "@/components/home/SponsorshipPackages";
import OfficialVideoSection from "@/components/home/OfficialVideoSection";

export default function FrPageClient() {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.35], [0, 72]);
  const heroRotate = useTransform(scrollYProgress, [0, 0.35], [0, -2]);

  return (
    <main className="relative overflow-hidden bg-black text-white">
      <AnimatedBackground />

      <div className="fixed left-0 top-0 z-50 h-1 w-full bg-white/20" />

      <AnnouncementBar />

      <section className="relative z-10 flex min-h-screen items-center justify-center overflow-hidden px-6 pt-32 [perspective:1200px]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(234,179,8,0.16),transparent_45%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black" />
        <motion.div
          animate={{ rotate: [-16, -10, -16], opacity: [0.18, 0.32, 0.18] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="stage-beam left-[10%]"
        />
        <motion.div
          animate={{ rotate: [18, 10, 18], opacity: [0.14, 0.28, 0.14] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="stage-beam right-[12%]"
        />
        <div className="absolute bottom-0 left-1/2 h-32 w-[76vw] -translate-x-1/2 rounded-[100%] border-t border-[#C9A84C]/30 bg-[#C9A84C]/10 blur-xl" />

        <motion.div
          style={{ y: heroY, rotateX: heroRotate }}
          className="relative max-w-6xl text-center [transform-style:preserve-3d]"
        >
          <div className="mb-8 flex justify-center">
            <motion.div
              animate={{ y: [0, -10, 0], scale: [1, 1.02, 1] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              <div className="absolute inset-0 rounded-full bg-[#C9A84C]/20 blur-3xl" />
              <Image
                src="/images/festival-talent-logo.png"
                alt="Festival Talent"
                width={420}
                height={260}
                className="relative h-32 w-auto object-contain drop-shadow-[0_0_35px_rgba(201,168,76,0.35)] md:h-44"
                priority
              />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="mb-8 inline-flex items-center gap-3 rounded-full border border-yellow-400/25 bg-yellow-400/10 px-5 py-2 backdrop-blur-xl"
          >
            <div className="h-2 w-2 animate-pulse rounded-full bg-green-400" />

            <p className="text-xs uppercase tracking-[0.3em] text-yellow-300">
              Official European Tour - 2027
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.9 }}
            className="mb-8 text-sm uppercase tracking-[0.5em] text-white/40"
          >
            Paris - Rome - Janvier a avril 2027
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 38, rotateX: 8 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ delay: 0.18, duration: 1.1, ease: "easeOut" }}
            className="text-6xl font-black leading-none tracking-tight md:text-8xl lg:text-[10rem]"
          >
            <span className="text-gradient-gold drop-shadow-[0_0_34px_rgba(201,168,76,0.24)]">
              FESTIVAL
            </span>
            <br />
            TALENT
            <span className="text-white/30"> 2027</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 1 }}
            className="mx-auto mt-10 max-w-3xl text-lg leading-relaxed text-white/60 md:text-2xl"
          >
            Festival Talent 2027 prepare une tournee europeenne entre Paris et
            Rome, de janvier a avril 2027, precedee par des pre-selections
            officielles en danse, musique, mode, art, entrepreneuriat,
            technologie, culture urbaine et sports mecaniques.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.38, duration: 1 }}
            className="mt-14 flex flex-col justify-center gap-5 md:flex-row"
          >
            <motion.a
              whileHover={{ y: -4, scale: 1.035 }}
              whileTap={{ scale: 0.98 }}
              href="/tickets"
              className="luxury-cta rounded-full bg-[#C9A84C] px-10 py-5 font-black text-black transition-all duration-300"
            >
              <span className="relative z-10">Reserver un ticket</span>
            </motion.a>

            <motion.a
              whileHover={{ y: -4, scale: 1.035 }}
              whileTap={{ scale: 0.98 }}
              href="/partners"
              className="premium-card rounded-full px-10 py-5 text-white transition-all duration-300"
            >
              <span className="relative z-10">Devenir partenaire</span>
            </motion.a>
          </motion.div>
        </motion.div>
      </section>

      <FadeUp><CountdownSection /></FadeUp>
      <FadeUp><AboutSection /></FadeUp>
      <FadeUp><ExperienceSection /></FadeUp>
      <FadeUp><ScheduleSection /></FadeUp>
      <FadeUp><ArtistsSection /></FadeUp>
      <FadeUp><StatsSection /></FadeUp>
      <FadeUp><MediaSection /></FadeUp>
      <FadeUp><GallerySection /></FadeUp>
      <FadeUp><PreviousEditionSection /></FadeUp>
      <FadeUp><PreviousArtistsSection /></FadeUp>
      <FadeUp><HighlightVideoSection /></FadeUp>
      <FadeUp><OfficialVideoSection /></FadeUp>
      <FadeUp><ImpactSection /></FadeUp>
      <FadeUp><SponsorBenefitsSection /></FadeUp>
      <FadeUp><SponsorshipPackages /></FadeUp>
      <FadeUp><WhyPartnerSection /></FadeUp>
      <FadeUp><MajorPartnerSection /></FadeUp>
      <FadeUp><PartnersSection /></FadeUp>
      <FadeUp><OfficialPartners /></FadeUp>
      <FadeUp><SponsorsCTA /></FadeUp>
      <FadeUp><NewsletterSection /></FadeUp>
      <FadeUp><FinalCTA /></FadeUp>

      <div className="fixed bottom-6 left-6 z-40 text-xs text-white/50">
        Instagram - TikTok - YouTube
      </div>
    </main>
  );
}
