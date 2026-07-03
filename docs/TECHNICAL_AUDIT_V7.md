# Audit technique V7

## Constats

- Plusieurs pages sont encore volumineuses : `app/programme/page.tsx`, `app/preselections/page.tsx`, `app/partners/PartnersPageClient.tsx`, `app/media/MediaPageClient.tsx`.
- Des constantes editoriales restent dans des composants historiques. La V7 introduit `modules/`, `services/` et de nouvelles primitives UI pour les extraire progressivement.
- Les routes sensibles Supabase et pre-selections ne doivent pas etre refactorees brutalement.
- Les pages publiques sont majoritairement statiques, ce qui reste favorable a la performance.

## Actions V7

- Ajout d'une architecture modulaire progressive dans `modules/`.
- Ajout de services de lecture par domaine dans `services/`.
- Ajout de primitives Design System reutilisables.
- Ajout de helpers JSON-LD centralises.
- Ajout des roadmaps 2027, 2028 et 2030.

## Dette restante

- Decouper les pages les plus grosses en composants de domaine.
- Migrer les constantes restantes vers `data/` ou `modules/*/data`.
- Ajouter tests E2E clavier/accessibilite pour navbar, footer, formulaire et pages plateforme.
- Auditer les images lourdes et generer des variantes optimisees.
