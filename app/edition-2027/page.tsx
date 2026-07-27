import type { Metadata } from "next";
import InternationalHeroSection from "@/components/home/InternationalHeroSection";
import { DestinationsSection, DisciplinesSection, InternationalProgrammeSection, ManifestoSection, TalentJourneySection } from "@/components/home/InternationalSections";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({ title: "Édition 2027 | Sénégal, Paris et Rome", description: "La vision internationale de Festival Talent 2027, entre le Sénégal, Paris et Rome.", path: "/edition-2027" });

export default function Edition2027Page() { return <main className="min-h-screen bg-black"><InternationalHeroSection /><ManifestoSection /><DestinationsSection /><DisciplinesSection /><TalentJourneySection /><InternationalProgrammeSection /></main>; }
