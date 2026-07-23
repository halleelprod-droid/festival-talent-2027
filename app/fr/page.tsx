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
import FeaturedArtistSection from "@/components/home/FeaturedArtistSection";
import SambaJourneySection from "@/components/home/SambaJourneySection";
import FestivalLegacySection from "@/components/home/FestivalLegacySection";
import EditionsTransition from "@/components/home/EditionsTransition";
import InfluencerVillaSection from "@/components/home/InfluencerVillaSection";
import FinalCTA from "@/components/home/FinalCTA";
import SectionDivider from "@/components/ui/SectionDivider";
import { buildPageMetadata } from "@/lib/seo";
import { seasonEvents } from "@/data/season-2026-2027";

export const metadata: Metadata = buildPageMetadata({
  title: "Festival Talent 2026–2027 | Deuxième édition avec Samba Peuzzi",
  description:
    "Découvrez la deuxième édition du Festival Talent, une saison nationale dédiée à la danse, la peinture, la lutte, la création digitale, la musique, le karting et le Jet-Ski, avec Samba Peuzzi comme artiste phare.",
  path: "/fr",
});

const homeProgrammeEvents = seasonEvents.map((event) => ({
  _id: event.id,
  title: event.title,
  location: event.location,
  date: event.date,
  category: event.discipline,
  partner: event.partner,
}));

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

        <FeaturedArtistSection />

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

        <ProgrammePreview events={homeProgrammeEvents} />

        <SambaJourneySection />

        <ActivitiesHighlightSection />

        <InfluencerVillaSection />

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

        <FestivalLegacySection />

        <EditionsTransition />

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

        <FinalCTA />
      </main>
    </>
  );
}
