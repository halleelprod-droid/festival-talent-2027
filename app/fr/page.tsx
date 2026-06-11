import AnnouncementBar from "@/components/home/AnnouncementBar";
import HeroSection from "@/components/home/HeroSection";
import CountdownSection from "@/components/home/CountdownSection";
import AboutSection from "@/components/home/AboutSection";
import ExperienceSection from "@/components/home/ExperienceSection";
import TalentTalksSection from "@/components/home/TalentTalksSection";
import StaffSection from "@/components/home/StaffSection";
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
import SponsorshipPackages from "@/components/home/SponsorshipPackages";
import OfficialVideoSection from "@/components/home/OfficialVideoSection";

export default function FrPage() {
  return (
    <main className="relative overflow-hidden bg-black text-white">
      <AnimatedBackground />

      <div className="fixed left-0 top-0 z-50 h-1 w-full bg-white/20" />

      <AnnouncementBar />

      <HeroSection />

      <CountdownSection />

      <AboutSection />

      <TalentTalksSection />

      <StaffSection />

      <ExperienceSection />

      <ScheduleSection />

      <ArtistsSection />

      <StatsSection />

      <OfficialVideoSection />

      <HighlightVideoSection />

      <MediaSection />

      <GallerySection />

      <PreviousEditionSection />

      <PreviousArtistsSection />

      <ImpactSection />

      <MajorPartnerSection />

      <OfficialPartners />

      <PartnersSection />

      <SponsorshipPackages />

      <SponsorBenefitsSection />

      <WhyPartnerSection />

      <SponsorsCTA />

      <NewsletterSection />

      <FinalCTA />
    </main>
  );
}