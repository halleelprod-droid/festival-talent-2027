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

export default function FrPage() {
  return (
    <main className="relative bg-black text-white overflow-hidden">
      <AnimatedBackground />

      <div className="fixed top-0 left-0 z-50 h-1 w-full bg-white/20" />

      <AnnouncementBar />

      <section className="relative z-10 min-h-screen flex items-center justify-center px-6 pt-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(234,179,8,0.16),transparent_45%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black" />

        <div className="relative text-center max-w-6xl">
          <div className="mb-8 flex justify-center">
            <img
              src="/images/festival-talent-logo.png"
              alt="Festival Talent"
              className="h-32 md:h-44 w-auto object-contain"
            />
          </div>

          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-yellow-400/20 bg-yellow-400/10 backdrop-blur-xl mb-8">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />

            <p className="text-xs uppercase tracking-[0.3em] text-yellow-300">
              Official Festival Experience • Dakar 2027
            </p>
          </div>

          <p className="uppercase tracking-[0.5em] text-sm text-white/40 mb-8">
            Dakar • Sénégal • Afrique
          </p>

          <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-black leading-none tracking-tight">
            FESTIVAL
            <br />
            TALENT
            <span className="text-white/30"> 2027</span>
          </h1>

          <p className="mt-10 text-white/60 text-lg md:text-2xl max-w-3xl mx-auto leading-relaxed">
            Le plus grand rassemblement culturel, créatif et immersif nouvelle
            génération au Sénégal.
          </p>

          <div className="flex flex-col md:flex-row gap-5 justify-center mt-14">
            <a
              href="/tickets"
              className="px-10 py-5 rounded-full bg-white text-black font-black hover:scale-105 hover:bg-yellow-400 transition-all duration-300"
            >
              Réserver un ticket
            </a>

            <a
              href="/partners"
              className="px-10 py-5 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-xl hover:bg-white/[0.08] transition-all duration-300"
            >
              Devenir partenaire
            </a>
          </div>
        </div>
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

      <FadeUp><ImpactSection /></FadeUp>

      <FadeUp><SponsorBenefitsSection /></FadeUp>

      <FadeUp><WhyPartnerSection /></FadeUp>

      <FadeUp><MajorPartnerSection /></FadeUp>

      <FadeUp><PartnersSection /></FadeUp>

      <FadeUp><OfficialPartners /></FadeUp>

      <FadeUp><SponsorsCTA /></FadeUp>

      <FadeUp><NewsletterSection /></FadeUp>

      <FadeUp><FinalCTA /></FadeUp>

      <div className="fixed bottom-6 left-6 z-40 text-xs text-white/50">
        Instagram • TikTok • YouTube
      </div>
    </main>
  );
}