# Lightweight CMS Architecture

Le CMS leger separe les contenus editoriaux du code React.

## Collections

- texts
- partners
- artists
- activities
- programme
- faq
- news

## Source actuelle

Les premiers contenus CMS vivent dans `content/cms/site-content.ts`.

## Regles

- Un composant ne doit pas contenir de longs textes metier en dur.
- Une collection doit etre typable et validable.
- Les contenus publics peuvent etre statiques.
- Les contenus admin/candidats restent proteges.
- Les futures mutations passeront par une API authentifiee.

## Evolution

1. Ajouter schemas par collection.
2. Ajouter workflow draft/published.
3. Ajouter historique de modifications.
4. Ajouter preview protegee.
5. Migrer progressivement FAQ, programme, partenaires, artistes et actualites.
