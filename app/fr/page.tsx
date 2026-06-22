import AnnouncementBar from "@/components/home/AnnouncementBar";
import HeroSection from "@/components/home/HeroSection";
import BattleDanceSection from "@/components/home/BattleDanceSection";
import LiveStatsBar from "@/components/home/LiveStatsBar";
import AboutSection from "@/components/home/AboutSection";
import FounderSection from "@/components/home/FounderSection";
import StaffSection from "@/components/home/StaffSection";
import ExperienceSection from "@/components/home/ExperienceSection";
import WhyFTSection from "@/components/home/WhyFTSection";
import StatsSection from "@/components/home/StatsSection";
import ArtistsSection from "@/components/home/ArtistsSection";
import OfficialSchedule from "@/components/home/OfficialSchedule";
import ReelSection from "@/components/home/ReelSection";
import GallerySection from "@/components/home/GallerySection";
import ExperienceMap from "@/components/home/ExperienceMap";
import CountdownSection from "@/components/home/CountdownSection";
import TicketsSection from "@/components/home/TicketsSection";
import WhyPartnerSection from "@/components/home/WhyPartnerSection";
import PartnersSection from "@/components/home/PartnersSection";
import FAQSection from "@/components/home/FAQSection";
import QuoteSection from "@/components/home/QuoteSection";
import SponsorCTASection from "@/components/home/SponsorCTASection";
import NewsletterSection from "@/components/home/NewsletterSection";
import FinalCTA from "@/components/home/FinalCTA";
import GratitudeSection from "@/components/home/GratitudeSection";

export default function HomePage() {
  return (
    <>
      <AnnouncementBar />

      <main className="min-h-screen bg-black text-white">
        <HeroSection />

        <BattleDanceSection />

        <LiveStatsBar />

        <AboutSection />

        <FounderSection />

        <StaffSection />

        <ExperienceSection />

        <WhyFTSection />

        <StatsSection />

        <ArtistsSection />

        <OfficialSchedule />

        <ReelSection />

        <GallerySection />

        <ExperienceMap />

        <CountdownSection />

        <TicketsSection />

        <WhyPartnerSection />

        <PartnersSection />

        <FAQSection />

        <QuoteSection />

        <SponsorCTASection />

        <NewsletterSection />

        <FinalCTA />

        <GratitudeSection />
      </main>
    </>
  );
}
