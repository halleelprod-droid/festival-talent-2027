# Festival Talent — Architecture & conventions

Ce document existe parce que Festival Talent est traité comme une plateforme pluriannuelle (2027 → 2035+), pas comme un site jetable. Toute décision structurante prise sur ce repo doit être documentée ici pour rester lisible dans 2 ans, par quelqu'un qui n'était pas présent au moment du choix.

Règle de base : une modification n'est acceptée que si elle améliore au moins une de ces dimensions sans en dégrader une autre — maintenabilité, performance, UX, stabilité, lisibilité, sécurité, évolutivité. Un "ça marche" ne suffit pas.

## État actuel (à jour au dernier audit)

- Next.js 16 (App Router, Turbopack), React 19, TypeScript strict, Tailwind 4.
- Home réelle : `app/fr/page.tsx` (Server Component, importe ~29 sections client depuis `components/home/`).
- Chrome global (Navbar, Footer, particules, curseur, transitions, scroll fluide) centralisé dans `components/providers/SiteChrome.tsx`, monté une fois dans `app/layout.tsx`.
- PostgreSQL et Drizzle portent les données réelles (`preselection_registrations`, `newsletter_subscribers`) derrière les routes serveur. Sanity et Prisma ont été retirés du repo (2026-07) faute de cas d'usage réel — à réintroduire proprement le jour où un besoin concret (CMS, billetterie) se présente, pas avant. `styled-components` et `dotenv` ont été retirés à la même occasion (zéro usage détecté).
- Bundle : `mapbox-gl` et `gsap` sont retirés/différés du chargement initial (`next/dynamic`). Toute nouvelle dépendance lourde (>50 Ko) doit suivre le même principe : ne jamais bloquer le LCP.

## Conventions établies

**Typographie** — `Inter` (texte courant) + `Anton` (titres, classe `.font-display`), chargées via `next/font/google`. Ne jamais réintroduire de police système par défaut ni de lien Google Fonts externe (render-blocking).

**Animations au scroll** — utiliser `FadeIn` / `FadeUp` (`components/ui/`) au lieu de dupliquer `motion.div initial/whileInView/transition/viewport` à la main. Un nouveau bloc de section = un `<FadeIn className="...">`, pas un motion.div copié-collé.

**Couleur du texte sur fond noir** — respecter WCAG AA (4.5:1). En pratique : jamais en dessous de `text-white/55` ou `text-zinc-400` pour du texte normal sur `#050505`. `text-white/70`+ pour le corps de texte.

**Librairies lourdes (mapbox-gl, gsap, three.js...)** — toujours `next/dynamic({ ssr: false })`, et jamais enveloppée autour d'une image `priority`/LCP. Si le contenu est critique pour le premier rendu, il ne doit pas être derrière un dynamic import ; s'il est décoratif, il ne doit jamais bloquer le critique.

**Composants dormants** — avant de créer un nouveau composant, vérifier `components/home/` et `components/ui/` : une bonne partie de ce qui semble "manquant" existe déjà mais n'est pas branché. Ne pas dupliquer. Inventaire complet dans [COMPONENTS.md](COMPONENTS.md).

**Données et configuration** — contenu statique par domaine dans `data/` (artists, program, partners, faq, stats), configuration dans `config/` (navigation, social). `lib/seo.ts` reste dans `lib/` (il contient de la logique — `buildPageMetadata` — pas seulement des constantes). Jamais de tableau de contenu métier en dur dans un composant.

**Tests** — Vitest (`__tests__/`, jsdom) + Playwright (`e2e/`, webServer automatique). Les E2E vérifient notamment l'unicité du `<h1>` par page — invariant à maintenir.

## Design System (`components/ui/`)

Phase 1 livrée (2026-07) : fondations + migration ciblée sur un échantillon représentatif, pas exhaustive. Les deux langages visuels du site (glass flat doré `#C9A84C` et gradient jaune/rouge `yellow-300→yellow-700`) sont volontairement conservés tels quels — cf. "Décisions actées".

**Tokens** (`app/globals.css`, bloc `@theme`) : `--color-gold`, `--color-gold-light`, `--color-gold-dark`, `--color-ink`, `--radius-card` (2rem), `--radius-card-lg` (3rem). Utilisables comme classes Tailwind normales (`bg-gold`, `rounded-card`...).

**Primitives** :
- `SectionHeading` — eyebrow (icône optionnelle) + titre `font-display` + description. Props : `eyebrow`, `eyebrowIcon?`, `title` (ReactNode, garde la liberté de mettre des `<br/>`/spans dégradés), `titleClassName?` (pour les variations de casse/tracking), `description?`, `align: 'left'|'center'`, `tone: 'gold'|'amber'`. Basé sur `FadeIn`.
- `Badge` — pill icône+texte. Props : `icon?`, `color: 'gold'|'red'`, `size: 'sm'|'md'`.
- `GlassCard` (étendu, pas remplacé) — nouvelles props `variant: 'glass'|'gold'` et `radius: 'default'|'lg'`. Les usages existants sans ces props gardent leur rendu d'origine (défauts inchangés).
- `Button` — wrapper léger autour de `MagneticButton` existant. `variant: 'gold'` délègue à `MagneticButton` tel quel ; `'gradient'` et `'outline'` couvrent le CTA jaune/rouge utilisé dans Hero/Battle/Tickets.
- `StatisticCard` — icône + label + valeur, basé sur `GlassCard`.

**Migré** : `HeroSection` (highlights), `WhyFTSection`, `SponsorCTASection`, `NewsSection`, `StaffSection` (header + badge département), `PartnersSection` (header + encart "liste officielle").

**Pas migré** (dette documentée, pas oubliée) : ~20 sections restantes utilisant encore le pattern `motion.div` inline pour leurs cartes/headers — `ExperienceMap`, `OfficialSchedule`, `TicketsSection`, `BattleDanceSection`, `FAQSection`, `ArtistsSection`, `CountdownSection`, `FounderSection`, `QuoteSection`, `TalentTalksSection`, etc. Elles fonctionnent, elles ne cassent rien, mais elles dupliquent encore ce que les primitives ci-dessus couvrent. À migrer progressivement, section par section, en réutilisant ces primitives — ne pas en recréer de nouvelles sans vérifier ici d'abord.

## Ce qui n'existe pas encore (et pourquoi ce n'est pas un oubli)

- **Migration complète du Design System** — cf. ci-dessus.
- **Restructuration narrative** — l'ordre des sections sur la home suit la construction historique du fichier, pas un arc narratif volontaire (découverte → vision → mission → battles → ...). Le contenu existe, l'orchestration n'est pas intentionnelle. Dépend de la migration complète du Design System pour rester cohérente visuellement.
- **Admin / billetterie / app mobile / IA** — aucune architecture dédiée. Cf. roadmap.

## Roadmap séquencée

Chaque phase est livrable indépendamment et n'exige pas d'avoir fait la précédente pour fonctionner, mais l'ordre reflète les dépendances réelles (le Design System conditionne la restructuration narrative propre ; l'API publique conditionne l'app mobile).

1. **Design System** — ✅ fondations + migration ciblée livrées (2026-07, cf. section dédiée ci-dessus). Reste : migrer les ~20 sections non converties, et évaluer si `PartnerCard`/`ArtistCard`/`StaffCard`/`FAQItem`/`Timeline`/`Gallery` deviennent pertinents une fois plus de sections migrées (pas de pattern répété suffisant aujourd'hui pour les justifier).
2. **A11y AA complet** — audit clavier bout en bout, focus visibles, formulaires, au-delà des correctifs ciblés déjà faits (FAQ, menu mobile).
3. **SEO structuré par page** — JSON-LD/Breadcrumbs sur activités, artistes, partenaires, tickets, FAQ (aujourd'hui centralisé sur layout + home uniquement).
4. **Sécurité** — audit ciblé : rôles Auth.js, validation des entrées (formulaires), accès PostgreSQL côté serveur et headers.
5. **Narration home** — réordonnancement réfléchi des sections, une fois le Design System en place (sinon on réordonne des blocs visuellement incohérents entre eux).
6. **Architecture Admin** (lecture/gestion candidats, partenaires, programme) — nécessite une décision d'authentification au préalable.
7. **Architecture Billetterie** (préparée, non activée) — modèles de données tickets/QR/paiement.
8. **Couche API publique** — prépare la connexion à une app mobile (React Native/Flutter) future.
9. **Préparation IA** (FAQ intelligente, recherche) — dépend d'un contenu structuré (donc dépend en partie de 1 et 3).

## Décisions actées

- **Sanity/Prisma** (2026-07) : retirés du repo, aucun cas d'usage réel identifié. ~911 paquets en moins dans `node_modules`.
- **Design System** (2026-07) : on consolide le style visuel existant (glassmorphism noir/or, bordures `white/10`, doré `#C9A84C`) dans des primitives réutilisables — pas de redesign visuel au passage.

## Décisions en attente (pas de choix arbitraire sans validation)

- Authentification admin : Auth.js v5 avec comptes et rôles PostgreSQL.
- Vulnérabilité npm audit (high) sur Next.js 16.2.4, fix disponible en 16.2.10 — bump à valider séparément (phase Sécurité), pas fait en silence dans ce lot.
