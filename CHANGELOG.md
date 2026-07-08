# Changelog

Historique des évolutions notables. Format inspiré de [Keep a Changelog](https://keepachangelog.com/fr/), une entrée par lot livré.

## [v5 — organigramme officiel] — 2026-07

### Ajouté
- **Organigramme officiel** sur `/team` (`components/team/OrgChart.tsx`, données `data/organisation.ts`) : Direction Générale (Zairah Diamant Noire, Fondatrice & Présidente) au sommet, puis 5 directions — Partenariats & Relations Institutionnelles (Pierre Ndiaye / PIN EVENTS), Digitale (SIDRA), Média & Communication (HALLEEL), Danse (Agence Diassnor), Partenaire Institutionnel Danse (Centre Culturel Blaise Senghor). Animations légères (apparition en cascade, ligne de connexion animée).
- **SIDRA** (Partenaire Digital Officiel) et **HALLEEL** (Partenaire Média & Communication) ajoutés aux partenaires officiels (`data/partners.ts`, page `/partners`, structures partenaires de `/team`). Logos à fournir par les intéressés.

### Modifié
- Titre de Zairah Diamant Noire : "Initiatrice du projet" → **"Fondatrice & Présidente"** (propagé via `data/staff.ts` : home + `/team`). Aucun membre ni partenaire supprimé.

### Dette notée
- `app/partners/PartnersPageClient.tsx` garde sa propre copie locale des partenaires au lieu de consommer `data/partners.ts` — consolidation à faire dans un lot dédié.

## [v5 — lot billetterie & museum] — 2026-07

### Ajouté
- **Musée numérique `/museum`** : frise chronologique de l'édition 2027, affiches officielles (structure prête, visuels à venir), galerie photos d'archives, salle des trophées (à venir après la finale), vidéos d'archives, section lauréats reliée au Hall of Fame. Données dans `data/museum.ts`, ajouté au footer et au sitemap.
- Tests E2E `/tickets` (8 pass, mentions "aucun paiement", redirect) et `/museum` (sections d'exposition) — suite Playwright à 6 tests.

### Consolidé (billetterie)
- La billetterie simulée `/tickets` (construite précédemment : 10 composants, 8 pass, comparatif, stepper, paiements "Bientôt", QR factice, maquette compte, FAQ, garde-fous) est vérifiée, alignée sur les conventions (`.font-display`, contrastes AA) et couverte par les E2E.
- `/billetterie` (doublon) redirige de façon permanente vers `/tickets` (URL canonique unique) ; retiré du sitemap ; CTA plateforme repointé.
- Suppression de l'orphelin `app/tickets/TicketsPageClient.tsx`.

### Corrigé
- **Régression accessibilité majeure** : `SectionHeader` rendait un `<h1>` en dur, produisant jusqu'à 8 h1 par page sur 14 pages. Prop `as?: "h1"|"h2"` ajoutée (défaut h1), 45 usages de section convertis en h2 — chaque page a de nouveau exactement un h1 (invariant protégé par les E2E). Titres `SectionHeader` passés en `.font-display` au passage.

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
