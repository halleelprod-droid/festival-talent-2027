import AnnouncementBar from "@/components/home/AnnouncementBar";
import CountdownSection from "@/components/home/CountdownSection";
import AboutSection from "@/components/home/AboutSection";
import ExperienceSection from "@/components/home/ExperienceSection";
import ScheduleSection from "@/components/home/ScheduleSection";
import ArtistsSection from "@/components/home/ArtistsSection";
import StatsSection from "@/components/home/StatsSection";
import MediaSection from "@/components/home/MediaSection";
import WhyPartnerSection from "@/components/home/WhyPartnerSection";
import PartnersSection from "@/components/home/PartnersSection";
import FinalCTA from "@/components/home/FinalCTA";

export default function FrPage() {
  return (
    <main className="relative bg-black text-white overflow-hidden">
      <div className="fixed top-0 left-0 z-50 h-1 w-full bg-white/20" />

      <AnnouncementBar />

      <section className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12),transparent_45%)]" />

        <div className="relative text-center max-w-5xl">
          <p className="uppercase tracking-[0.4em] text-sm text-white/60 mb-6">
            Dakar • Sénégal • 2027
          </p>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-none mb-8">
            FESTIVAL
            <br />
            TALENT 2027
          </h1>

          <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Le plus grand rassemblement culturel et créatif nouvelle génération
            au Sénégal.
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center mt-10">
            <a
              href="/tickets"
              className="px-8 py-4 bg-white text-black font-bold rounded-full hover:scale-105 transition-all duration-300"
            >
              Réserver un ticket
            </a>

            <a
              href="/partners"
              className="px-8 py-4 border border-white/20 rounded-full hover:bg-white/10 transition-all duration-300"
            >
              Devenir partenaire
            </a>
          </div>
        </div>
      </section>

      <CountdownSection />

      <AboutSection />

      <ExperienceSection />

      <ScheduleSection />

      <ArtistsSection />

      <StatsSection />

      <MediaSection />

      <WhyPartnerSection />

      <PartnersSection />

      <FinalCTA />

      <div className="fixed bottom-6 left-6 z-40 text-xs text-white/50">
        Instagram • TikTok • YouTube
      </div>
    </main>
  );
}