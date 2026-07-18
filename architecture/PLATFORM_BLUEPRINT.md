# Festival Talent Platform Blueprint

Festival Talent doit evoluer comme une plateforme culturelle multi-edition, multi-pays et multi-produit. Le site public reste une surface d'acquisition, mais le coeur produit doit vivre dans des domaines independants.

## Principes

- Les pages consomment des modules, elles ne portent pas la logique metier.
- Les donnees candidates, admin, finance et tickets restent privees par defaut.
- Toute API interne expose un contrat stable, versionne et documente.
- Les contenus editoriaux doivent pouvoir changer sans modifier les composants.
- Une edition, un pays, une langue et une marque sont des donnees, pas des forks du site.

## Domaines

Les domaines cibles sont declares dans `data/platform-architecture.ts` et exportes via `modules/index.ts`.

Chaque domaine suit la meme structure :

```txt
modules/<domain>/
  components/
  services/
  types/
  hooks/
  api/
  validators/
  schemas/
  utils/
  tests/
```

## Donnees sensibles

Les domaines suivants ne doivent jamais exposer leurs donnees reelles sans authentification, RBAC et RLS :

- candidates
- preselections
- sponsors
- ticketing
- finance
- users
- notifications
- messages
- administration

## API interne

La premiere version expose des endpoints GET non sensibles sous `/api/*`.

Les endpoints proteges retournent uniquement un statut preparatoire tant que l'authentification admin n'est pas en place.

## Roadmap technique

1. Migrer les donnees dupliquees vers les modules.
2. Remplacer les cartes/boutons locaux par le design system.
3. Ajouter schemas et validators par domaine.
4. Ajouter tests unitaires par module.
5. Connecter PostgreSQL uniquement côté serveur avec Auth.js et des rôles explicites.
6. Ajouter cache, analytics, notifications et observabilite.
