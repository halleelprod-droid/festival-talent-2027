# Bibliothèque de composants

Règle d'or : **avant de créer un composant, vérifier ici et dans `components/ui/`**. Une grande partie de ce qui semble manquant existe déjà. Ne pas créer de composant "au cas où" — chaque primitive de cette bibliothèque est née d'un pattern répété au moins 3 fois dans le code réel (voir ARCHITECTURE.md, décision anti-abstraction-prématurée).

## Primitives du Design System (`components/ui/`)

### SectionHeading
Eyebrow (icône optionnelle) + titre `font-display` + description. Utilisé par les headers de section.
```tsx
<SectionHeading
  eyebrow="Why FT2027"
  eyebrowIcon={Sparkles}          // optionnel
  title={<>More Than<br />A Festival.</>}
  titleClassName="uppercase"      // optionnel, variations de casse/taille
  description="..."               // optionnel
  align="left"                    // 'left' (défaut) | 'center'
  tone="gold"                     // 'gold' #C9A84C (défaut) | 'amber' yellow-400
/>
```

### Badge
Pill icône + texte.
```tsx
<Badge icon={Crown} color="gold" size="md">Pré-sélections officielles</Badge>
// color: 'gold' (défaut) | 'red' — size: 'sm' | 'md' (défaut)
```

### GlassCard
Carte glassmorphism avec hover 3D. Couvre les deux familles visuelles du site.
```tsx
<GlassCard variant="glass" radius="default" className="p-10">...</GlassCard>
// variant: 'glass' bordure white/10 (défaut) | 'gold' bordure yellow-400/25
// radius: 'default' 2rem (défaut) | 'lg' 3rem
```

### Button
Wrapper qui unifie les trois styles de CTA du site.
```tsx
<Button href="/tickets">Réserver</Button>                    // 'gold' → MagneticButton
<Button href="/preselections" variant="gradient">S'inscrire</Button> // jaune/rouge
<Button variant="outline" onClick={...}>En savoir plus</Button>
// Props: href | onClick, type ('button'|'submit'), target, className
```

### MagneticButton
CTA doré avec effet magnétique. `Button variant="gold"` y délègue — préférer `Button` pour les nouveaux usages.
```tsx
<MagneticButton href="/tickets" type="submit" disabled={...}>...</MagneticButton>
```

### StatisticCard
Icône + label + valeur, basé sur GlassCard.
```tsx
<StatisticCard icon={Trophy} label="Battle All Style" value="500.000 FCFA" variant="glass" />
```

### FadeIn / FadeUp
Wrappers d'apparition au scroll. **Toujours les utiliser** au lieu de dupliquer `motion.div initial/whileInView` à la main.
```tsx
<FadeIn delay={0.1} className="max-w-4xl">...</FadeIn>  // easing cubic, -80px margin
<FadeUp delay={0.1}>...</FadeUp>                         // easeOut, -100px margin
```

## Chrome global (`components/providers/`, monté une fois dans `app/layout.tsx`)

- `SiteChrome` — compose tout le chrome : Navbar, Footer, PageLoader, PageTransition, ScrollProgress, CursorGlow, AmbientLights, ParticlesBackground, FilmGrain, SocialBar, SoundToggle, SmoothScrollProvider (Lenis). Ne rien monter de global ailleurs.

## Effets visuels (`components/ui/`)

`AmbientLights`, `ParticlesBackground`, `FilmGrain`, `CursorGlow` (désactivé tactile + prefers-reduced-motion), `ScrollProgress`, `PageLoader`, `PageTransition`, `SectionDivider`, `SocialBar`, `SoundToggle`, `ParallaxImage`, `ParallaxSection` (gsap — ne jamais l'utiliser autour d'une image LCP), `OrbScene`, `MouseTrail` (non montés), `Particles3D` (three.js, non monté — coût WebGL).

## Sections de la home (`components/home/`)

~29 sections live importées par `app/fr/page.tsx`. Composants **volontairement non branchés** (redondants avec des sections live, gardés pour référence) : `CinematicReel`, `FeaturedArtists`, `ImmersiveBanner`, `LineupSection`, `LocationSection`, `PartnersStrip`, `ProgrammePreview`, `VideoShowcase`. Ne pas les brancher sans décision explicite ; ne pas les dupliquer non plus.

`TourMap` — carte Mapbox isolée, chargée en `next/dynamic({ ssr: false })` par `ExperienceMap` (mapbox-gl = 1,7 Mo, jamais dans le bundle initial). Rend `null` sans `NEXT_PUBLIC_MAPBOX_TOKEN`.

## Nouvelles primitives pages plateforme (`components/ui/`)

- `SectionHeader` — header de page/section avec eyebrow icône. **Prop `as: 'h1' | 'h2'` (défaut h1)** : h1 uniquement pour le titre principal d'une page dédiée ; toute utilisation en section (home ou 2e+ occurrence sur une page) DOIT passer `as="h2"` — invariant "un h1 par page" protégé par les E2E.
- `PremiumCard` — carte glass statique (sans motion), `tone: 'default' | 'gold'`.
- `GradientButton` — CTA lien avec icône, `variant: 'gold' | 'outline'`.

## Billetterie (`components/tickets/`, page `/tickets`)

Billetterie **simulée** (Phase 1 UX/UI — aucun paiement, QR, PDF ni stockage réel ; garde-fous dans `lib/tickets/safety.ts`). 10 composants alimentés par `data/tickets.ts` (types dans `types/tickets.ts`) : `TicketHero`, `TicketPassGrid` (8 pass), `TicketComparison`, `TicketProcessStepper` (5 étapes), `TicketPaymentReadiness` (8 moyens "Bientôt/Prévu"), `TicketVisualPreview` (QR factice), `TicketAccountMockup`, `TicketFAQ`, `TicketFutureArchitecture`, `TicketIcon`. `/billetterie` redirige vers `/tickets`. Phases 2 (données/QR/PDF) et 3 (paiements) = contrats séparés — ne rien connecter sans décision explicite.

## Museum (`app/museum/`)

Musée numérique : frise chronologique, affiches, photos d'archives, trophées, vidéos, lauréats (à venir après la finale 2027) + lien Hall of Fame. Un seul PageClient (pattern des pages patrimoine), données dans `data/museum.ts`.

## Composants envisagés mais PAS créés (décision, pas oubli)

`Modal`, `Drawer`, `Toast`, `Tooltip`, `Dropdown`, `Tabs`, `Carousel`, `Lightbox`, `Pagination`, `Breadcrumb`, `EmptyState`, `Skeleton`, `VideoPlayer`, `Timeline`, `Gallery`, `PartnerCard`, `StaffCard`, `ArtistCard`, `FAQItem`, `IconButton`, `Container` — **aucun cas d'usage réel dans le site actuel**. Les créer maintenant serait de l'abstraction prématurée (dette de maintenance sans bénéfice). Créer chacun **le jour où un vrai besoin apparaît**, en le documentant ici.
