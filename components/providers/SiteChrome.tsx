"use client";

import { ReactNode } from "react";

import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import PageLoader from "@/components/ui/PageLoader";
import PageTransition from "@/components/ui/PageTransition";
import ScrollProgress from "@/components/ui/ScrollProgress";
import CursorGlow from "@/components/ui/CursorGlow";
import AmbientLights from "@/components/ui/AmbientLights";
import ParticlesBackground from "@/components/ui/ParticlesBackground";
import FilmGrain from "@/components/ui/FilmGrain";
import SocialBar from "@/components/ui/SocialBar";
import SoundToggle from "@/components/ui/SoundToggle";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function SiteChrome({ children }: { children: ReactNode }) {
  return (
    <SmoothScrollProvider>
      <PageLoader />
      <ScrollProgress />
      <CursorGlow />
      <AmbientLights />
      <ParticlesBackground />
      <FilmGrain />
      <SocialBar />
      <SoundToggle />

      <Navbar />
      <PageTransition>{children}</PageTransition>
      <Footer />
    </SmoothScrollProvider>
  );
}
