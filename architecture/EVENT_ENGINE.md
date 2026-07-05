# Event Engine

L'Event Engine modelise tous les evenements Festival Talent comme des objets metier.

## Contrat

Le type `FestivalEvent` est defini dans `types/events.ts`.

Champs requis :

- id
- editionId
- slug
- kind
- title
- description
- date
- time
- location
- capacity
- images
- sponsors
- partners
- cta
- status

## Types d'evenements

- battle
- concert
- karting
- jet-ski
- masterclass
- defile
- conference
- projection
- networking

## Source actuelle

Les evenements initiaux vivent dans `data/events.ts`.

## Evolution attendue

1. Validation schema par evenement.
2. Liaison editions, lieux, sponsors et partenaires.
3. Capacites et inscriptions par evenement.
4. Publication CMS.
5. Export mobile/PWA.
