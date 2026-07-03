# Festival Talent 2027 — Plateforme officielle

Site officiel du Festival Talent 2027 : plateforme internationale de révélation des talents africains (danse, musique, mode, art, entrepreneuriat, technologie, culture urbaine, sports mécaniques), avec une tournée européenne Paris–Rome de janvier à avril 2027.

Ce repo est traité comme une **plateforme pluriannuelle** (éditions 2027 → 2030+), pas comme un site jetable. Lire [ARCHITECTURE.md](ARCHITECTURE.md) avant toute contribution.

## Stack

| Domaine | Outil |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| UI | React 19, TypeScript strict, Tailwind CSS 4, Framer Motion |
| Données | Supabase (pré-sélections, newsletter) |
| Email | Resend (confirmation newsletter) |
| Carte | Mapbox GL (`react-map-gl`, chargée en dynamic import) |
| Tests | Vitest + React Testing Library (unit), Playwright (E2E) |
| Monitoring | Vercel Analytics + Speed Insights |
| Déploiement | Vercel |

## Démarrage

```bash
npm install
cp .env.example .env.local   # puis remplir les valeurs (voir DEPLOYMENT.md)
npm run dev                  # http://localhost:3000
```

## Scripts

| Commande | Effet |
|---|---|
| `npm run dev` | Serveur de développement |
| `npm run build` | Build de production — **doit rester vert après chaque modification** |
| `npm run lint` | ESLint (0 erreur, 0 warning exigé) |
| `npm run test` | Tests unitaires Vitest (mode watch ; `npx vitest run` pour un seul passage) |
| `npm run test:e2e` | Tests E2E Playwright (build + start automatiques) |

## Structure

```
app/            Pages (App Router). app/fr/page.tsx = home réelle (/ redirige vers /fr)
components/
  home/         Sections de la page d'accueil (~29 live)
  layout/       Navbar, Footer
  providers/    SiteChrome (chrome global), SmoothScrollProvider (Lenis)
  ui/           Primitives du Design System + effets (voir COMPONENTS.md)
config/         Constantes de configuration (navigation, réseaux sociaux)
data/           Contenu statique par domaine (artistes, staff via sections, programme, FAQ...)
lib/            Logique partagée (seo.ts : métadonnées ; supabase.ts : client)
messages/       Fichiers de traduction FR/EN/IT (i18n non activé — voir ROADMAP.md)
public/         Images, vidéos, logos partenaires
__tests__/      Tests unitaires Vitest
e2e/            Tests E2E Playwright
```

## Documentation

- [ARCHITECTURE.md](ARCHITECTURE.md) — décisions structurantes, conventions, roadmap technique
- [COMPONENTS.md](COMPONENTS.md) — bibliothèque de composants et leur API
- [STYLEGUIDE.md](STYLEGUIDE.md) — conventions de nommage, style, animations
- [DATABASE.md](DATABASE.md) — schéma Supabase, RLS
- [DEPLOYMENT.md](DEPLOYMENT.md) — variables d'environnement, process Vercel
- [ROADMAP.md](ROADMAP.md) — vision produit 2027 → 2030
- [CONTRIBUTING.md](CONTRIBUTING.md) — workflow de contribution
- [CHANGELOG.md](CHANGELOG.md) — historique des évolutions

## Règles non négociables

- `npm run build` et `npm run lint` verts après **chaque** modification.
- Ne jamais casser : Supabase, le formulaire de pré-sélections, les routes existantes, les variables d'environnement, le déploiement Vercel.
- Une seule balise `<h1>` par page.
- Contenu éditorial verrouillé (staff, partenaires, artistes confirmés) : ne pas modifier sans validation de l'équipe — voir CLAUDE.md / AGENTS.md.
