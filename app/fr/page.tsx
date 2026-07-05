import AnnouncementBar from "@/components/home/AnnouncementBar";
import HeroSection from "@/components/home/HeroSection";
import BattleDanceSection from "@/components/home/BattleDanceSection";
import ActivitiesHighlightSection from "@/components/home/ActivitiesHighlightSection";
import StaffSection from "@/components/home/StaffSection";
import CoachesSection from "@/components/home/CoachesSection";
import WhyFTSection from "@/components/home/WhyFTSection";
import ArtistsSection from "@/components/home/ArtistsSection";
import GallerySection from "@/components/home/GallerySection";
import PartnersSection from "@/components/home/PartnersSection";
import FAQSection from "@/components/home/FAQSection";
import NewsletterSection from "@/components/home/NewsletterSection";
import GratitudeSection from "@/components/home/GratitudeSection";
import PlatformVisionSection from "@/components/home/PlatformVisionSection";
import ProgrammePreview from "@/components/home/ProgrammePreview";
import SectionDivider from "@/components/ui/SectionDivider";

const homeProgrammeEvents = [
  {
    _id: "preselections",
    title: "Pre-selections officielles",
    location: "Senegal et zones partenaires",
    date: "2026-09-01",
    category: "Detection",
  },
  {
    _id: "battles",
    title: "Battles All Style",
    location: "Zones regionales",
    date: "2026-09-15",
    category: "Competition",
  },
  {
    _id: "italie",
    title: "Experience Italie",
    location: "Italie",
    date: "2027-03-21",
    category: "International",
  },
  {
    _id: "final",
    title: "Concert final",
    location: "Casino de Paris",
    date: "2027-05-15",
    category: "Finale",
  },
];

export default function HomePage() {
  return (
    <>
      <AnnouncementBar />

      <main className="min-h-screen bg-black text-white">
        <HeroSection />

        <WhyFTSection />

        <BattleDanceSection />

        <ActivitiesHighlightSection />

        <ProgrammePreview events={homeProgrammeEvents} />

        <ArtistsSection />

        <SectionDivider />

        <StaffSection />

        <CoachesSection />

        <PartnersSection />

        <SectionDivider />

        <GallerySection />

        <FAQSection />

        <NewsletterSection />

        <PlatformVisionSection />

        <GratitudeSection />

        <SectionDivider />
      </main>
    </>
  );
}
