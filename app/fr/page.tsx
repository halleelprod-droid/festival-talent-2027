import type { Metadata } from "next";

import AnnouncementBar from "@/components/home/AnnouncementBar";
import HeroSection from "@/components/home/HeroSection";
import BattleDanceSection from "@/components/home/BattleDanceSection";
import ActivitiesHighlightSection from "@/components/home/ActivitiesHighlightSection";
import StaffSection from "@/components/home/StaffSection";
import CoachesSection from "@/components/home/CoachesSection";
import CommunitySection from "@/components/home/CommunitySection";
import WhyFTSection from "@/components/home/WhyFTSection";
import HomeActTransition from "@/components/home/HomeActTransition";
import TalentStoriesSection from "@/components/home/TalentStoriesSection";
import AfricaTomorrowSection from "@/components/home/AfricaTomorrowSection";
import TalentPlatformJourneySection from "@/components/home/TalentPlatformJourneySection";
import ArtistsSection from "@/components/home/ArtistsSection";
import JuryComingSoonSection from "@/components/home/JuryComingSoonSection";
import GallerySection from "@/components/home/GallerySection";
import PartnersSection from "@/components/home/PartnersSection";
import TicketsSection from "@/components/home/TicketsSection";
import MediaSection from "@/components/home/MediaSection";
import FAQSection from "@/components/home/FAQSection";
import NewsletterSection from "@/components/home/NewsletterSection";
import GratitudeSection from "@/components/home/GratitudeSection";
import PlatformVisionSection from "@/components/home/PlatformVisionSection";
import ProgrammePreview from "@/components/home/ProgrammePreview";
import SectionDivider from "@/components/ui/SectionDivider";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Accueil | Festival Talent 2027",
  description:
    "Festival Talent 2027 rassemble talents, pre-selections, Battle All Style, coachs, artistes confirmes, partenaires, tickets, medias et communaute autour d'une plateforme culturelle internationale.",
  path: "/fr",
});

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
        <HomeActTransition
          act="ACTE 1"
          title="Le rêve"
          description="Tout commence par une conviction : un talent peut changer une trajectoire."
        />

        <HeroSection />

        <HomeActTransition
          act="ACTE 2"
          title="La découverte"
          description="Le visiteur comprend pourquoi Festival Talent existe et comment un candidat entre dans le parcours."
        />

        <WhyFTSection />

        <TalentPlatformJourneySection />

        <TalentStoriesSection />

        <HomeActTransition
          act="ACTE 3"
          title="Les opportunités"
          description="Les preselections, les activites et le programme transforment l'ambition en action."
        />

        <BattleDanceSection />

        <ActivitiesHighlightSection />

        <ProgrammePreview events={homeProgrammeEvents} />

        <HomeActTransition
          act="ACTE 4"
          title="Les coachs"
          description="L'accompagnement donne au talent des reperes, une exigence et une direction."
        />

        <StaffSection />

        <CoachesSection />

        <CommunitySection />

        <HomeActTransition
          act="ACTE 5"
          title="Les artistes"
          description="Les artistes confirmes donnent au projet son energie culturelle et sa projection."
        />

        <ArtistsSection />

        <JuryComingSoonSection />

        <SectionDivider />

        <HomeActTransition
          act="ACTE 6"
          title="Les partenaires"
          description="Les partenaires rendent la plateforme credible, durable et capable de grandir."
        />

        <PartnersSection />

        <HomeActTransition
          act="ACTE 7"
          title="La finale"
          description="La scene finale devient le symbole d'un parcours, pas seulement d'une competition."
        />

        <TicketsSection />

        <SectionDivider />

        <GallerySection />

        <MediaSection />

        <FAQSection />

        <NewsletterSection />

        <HomeActTransition
          act="ACTE 8"
          title="L'avenir"
          description="Festival Talent prepare une marque culturelle, une communaute et une vision africaine."
        />

        <AfricaTomorrowSection />

        <PlatformVisionSection />

        <GratitudeSection />

        <SectionDivider />
      </main>
    </>
  );
}
