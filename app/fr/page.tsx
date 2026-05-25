import AnnouncementBar from "@/components/home/AnnouncementBar";
import OrbScene from "@/components/home/OrbScene";
import CountdownSection from "@/components/home/CountdownSection";
import AboutSection from "@/components/home/AboutSection";
import WhyPartnerSection from "@/components/home/WhyPartnerSection";
import SocialBar from "@/components/home/SocialBar";
import FinalCTA from "@/components/home/FinalCTA";
import ScrollProgress from "@/components/home/ScrollProgress";

export default function FrPage() {
  return (
    <main className="relative bg-black text-white overflow-hidden">
      <ScrollProgress />

      <AnnouncementBar />

      <OrbScene />

      <section className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-5xl">
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
            <button className="px-8 py-4 bg-white text-black font-bold rounded-full hover:scale-105 transition">
              Réserver un ticket
            </button>

            <button className="px-8 py-4 border border-white/20 rounded-full hover:bg-white/10 transition">
              Devenir partenaire
            </button>
          </div>
        </div>
      </section>

      <CountdownSection />

      <AboutSection />

      <WhyPartnerSection />

      <FinalCTA />

      <SocialBar />
    </main>
  );
}