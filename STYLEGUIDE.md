# Styleguide — conventions du code

Ces conventions décrivent ce qui est **déjà en usage** dans le repo. Toute nouvelle contribution doit s'y conformer ; toute dérogation se documente dans ARCHITECTURE.md.

## Nommage

| Élément | Convention | Exemple |
|---|---|---|
| Composants React | PascalCase, fichier = nom du composant | `SectionHeading.tsx` |
| Fichiers data/config/lib | kebab ou camelCase court, un domaine par fichier | `data/program.ts`, `config/navigation.ts` |
| Hooks | `useXxx` (aucun hook custom à ce jour — en créer un seulement si la logique est partagée par 2+ composants) | `useCountdown` |
| Types/Interfaces | PascalCase, pas de préfixe `I` | `StaffMember`, `ButtonProps` |
| Props d'un composant | `NomDuComposantProps` | `SectionHeadingProps` |
| Routes | kebab-case, français (cohérent avec l'existant) | `/preselections`, `/activites` |
| Images | kebab-case descriptif | `pierre-ndiaye.jpg`, `festival-passe-21.jpg` |

## Imports (ordre)

1. React / Next (`react`, `next/*`)
2. Librairies externes (`framer-motion`, `lucide-react`...)
3. Alias internes `@/` (config, data, lib, components)

Toujours utiliser l'alias `@/` pour les imports internes, jamais de `../../` profonds.

## Composants

- Server Component par défaut ; `'use client'` **uniquement** si le composant utilise état, effets, framer-motion ou APIs navigateur.
- Un composant = un fichier = un export default.
- Pas de données métier en dur dans les composants : contenu → `data/`, configuration → `config/`. (Exception tolérée : contenu purement décoratif propre à une seule section.)
- Pas de logique métier dans les composants : requêtes → `lib/` (futur `services/` si le volume le justifie).

## Design tokens

Définis dans `app/globals.css` (bloc `@theme`, Tailwind v4) : `--color-gold`, `--color-gold-light`, `--color-gold-dark`, `--color-ink`, `--radius-card`, `--radius-card-lg`. **Ne pas réintroduire de valeurs hex dorées en dur** dans les nouveaux composants — utiliser `text-gold`, `bg-gold`, `rounded-card`... (L'existant utilise encore `#C9A84C` inline par endroits ; à résorber au fil des migrations, pas en masse.)

## Typographie

- `Inter` = corps de texte (défaut, via `--font-inter`).
- `Anton` = grands titres via la classe `.font-display`. Jamais `font-black` seul pour un titre de section.
- Un seul `<h1>` par page. Titres de section = `<h2>`, sous-blocs = `<h3>`.

## Couleurs et contraste (WCAG AA)

Sur fond noir `#050505` : texte normal jamais en dessous de `text-white/55` / `text-zinc-400` ; corps de texte à `text-white/70`+.

## Animations

- Apparition au scroll : `FadeIn`/`FadeUp`, jamais de `motion.div initial/whileInView` dupliqué à la main.
- `viewport={{ once: true }}` systématique (pas de re-déclenchement au re-scroll).
- Respecter `prefers-reduced-motion` pour tout effet fixe plein écran (voir `CursorGlow` comme référence).
- Aucune animation ne doit bloquer l'interaction ni retarder le LCP.

## Accessibilité

- Éléments interactifs à état (accordéons, menus) : `aria-expanded` + `aria-controls` (références : `FAQSection`, `Navbar`).
- Boutons icône : `aria-label`.
- Toute image `next/image` a un `alt` significatif (ou `""` si purement décorative + `aria-hidden`).

## Performance

- Librairie > 50 Ko → `next/dynamic({ ssr: false })` (références : `TourMap`/mapbox-gl).
- Jamais de dynamic import autour d'un contenu LCP.
- Images : `next/image` obligatoire, `priority` uniquement sur l'image hero, `sizes` renseigné.
- Vidéos locales : `preload="none"`.
