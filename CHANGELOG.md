# Changelog

Historique des évolutions notables. Format inspiré de [Keep a Changelog](https://keepachangelog.com/fr/), une entrée par lot livré.

## [v4] — 2026-07

### Gouvernance & documentation
- Suite documentaire complète : README, ARCHITECTURE, COMPONENTS, STYLEGUIDE, DEPLOYMENT, DATABASE, ROADMAP (2027→2030), CONTRIBUTING, CHANGELOG.
- Tests scaffoldés : Vitest + React Testing Library (5 tests unitaires) et Playwright (2 E2E home) ; scripts `test` / `test:e2e`.
- Vercel Analytics + Speed Insights montés dans le layout.

### Architecture
- Données réorganisées par domaine dans `data/` (artists, program, partners, faq, stats) et configuration dans `config/` (navigation, social) ; `components/sections/constants.ts` supprimé, 11 consommateurs migrés.
- Sanity, Prisma, styled-components, dotenv retirés (aucun usage réel, ~911 paquets en moins).
- Chrome global centralisé dans `SiteChrome` (Navbar, Footer, loader, transitions, particules, curseur, scroll Lenis).

### Design System (phase 1)
- Tokens `@theme` Tailwind v4 (couleurs gold/ink, rayons card).
- Primitives : `SectionHeading`, `Badge`, `Button`, `StatisticCard` ; `GlassCard` étendu (variants glass/gold, radius).
- 6 sections migrées (Hero, WhyFT, SponsorCTA, News, Staff, Partners) ; ~20 restantes documentées.
- Typographie Inter (corps) + Anton (`.font-display`, ~28 titres) via next/font.

### Fonctionnalités
- Newsletter réelle : persistance Supabase (`newsletter_subscribers`) + email de confirmation Resend ; formulaire fonctionnel avec états loading/succès/erreur.
- Compteur live des inscriptions pré-sélections (Supabase Realtime).
- Carte interactive Paris–Rome (Mapbox, marqueurs + tracé), fallback propre sans token.
- Sections Talent Talks et News branchées sur la home ; vidéo stock trompeuse du Reel remplacée par une vraie vidéo du festival.

### Performance
- `mapbox-gl` (1,7 Mo) sorti du bundle initial via dynamic import ; `gsap` (200 Ko) retiré du chemin critique.
- Image staff 12 Mo compressée à 118 Ko ; polices auto-hébergées.

### Accessibilité & SEO
- Un seul `<h1>` par page (loader, navbar, sections corrigés) ; `aria-expanded/controls` sur FAQ et menu mobile ; contrastes remontés à WCAG AA (`text-white/35-45` → `/55`).
- Sitemap complété (8 routes) ; JSON-LD Organization + Event (layout) et FAQPage (section FAQ).

### Nettoyage
- Code mort supprimé : `FrPageClient.tsx`, doublons Navbar/SmoothScroll/ExperienceMap racine.

## [v3] — antérieur

Site vitrine initial : sections home, pages Programme/Activités/Pré-sélections/Artistes/Partenaires/Media/Tickets, formulaire de pré-sélections branché à Supabase, metadata SEO de base.
