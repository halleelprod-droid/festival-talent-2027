# Contribuer à Festival Talent

## Avant de commencer

1. Lire [ARCHITECTURE.md](ARCHITECTURE.md) (décisions structurantes) et [STYLEGUIDE.md](STYLEGUIDE.md) (conventions).
2. Vérifier [COMPONENTS.md](COMPONENTS.md) avant de créer un composant — il existe peut-être déjà.
3. Le contenu éditorial (staff, partenaires, artistes) est verrouillé : voir CLAUDE.md/AGENTS.md pour les règles officielles et ne jamais présenter "Samba Peuzzi" comme seul artiste confirmé.

## Workflow

1. Brancher depuis `main` : `feat/...`, `fix/...`, `docs/...`.
2. Une modification = un objectif. Pas de refactor opportuniste mélangé à une feature.
3. Après **chaque** modification significative : `npm run build` doit rester vert. Ne jamais empiler des changements sur un build cassé.

## Checklist avant PR

- [ ] `npm run build` vert
- [ ] `npm run lint` : 0 erreur, 0 warning
- [ ] `npx vitest run` vert
- [ ] `npm run test:e2e` vert si la modification touche layout, navigation ou une page entière
- [ ] Un seul `<h1>` par page (les E2E le vérifient sur la home)
- [ ] Nouvelles données → `data/`, nouvelles constantes → `config/`, pas dans les composants
- [ ] Pas de valeur dorée en dur (`#C9A84C`) dans du nouveau code → tokens (`text-gold`...)
- [ ] Librairie lourde ajoutée → `next/dynamic`, jamais dans le chemin LCP
- [ ] Décision structurante prise ? → documentée dans ARCHITECTURE.md
- [ ] Schéma PostgreSQL/Drizzle modifié ? → migration générée et DATABASE.md mis à jour
- [ ] Entrée ajoutée dans CHANGELOG.md

## Questions d'arbitrage (si la réponse est non, ne pas faire la modification)

Cette modification améliore-t-elle réellement le produit ? Est-elle cohérente avec la vision du festival ? Maintenable ? Évolutive ? Performante ? Accessible ? Réutilisable ?

## Ce qu'il ne faut jamais casser

PostgreSQL/Drizzle (formulaire de pré-sélections en premier lieu), les routes existantes, les variables d'environnement, le déploiement Vercel et le build.
