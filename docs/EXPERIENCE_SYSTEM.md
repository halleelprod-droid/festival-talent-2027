# Festival Talent Experience System

Festival Talent utilise une couche d'interactions premium réutilisable pour garder une expérience institutionnelle cohérente sans dupliquer la logique dans chaque composant.

## Cartes premium

Ajouter `world-card` et `data-premium-card` sur une carte interactive :

```tsx
<article data-premium-card className="world-card ...">
  ...
</article>
```

Effets inclus :

- léger tilt 3D au hover ;
- halo doré ;
- ombre dynamique ;
- effet verre ;
- interaction avec le curseur premium desktop.

## Images vivantes

Ajouter `world-image` sur les images contenues dans une carte :

```tsx
<Image className="world-image object-cover" ... />
```

L'image reçoit un zoom subtil au hover de la carte, avec respect de `prefers-reduced-motion`.

## Sections cinématiques

Ajouter `section-cinema` aux grandes sections pour obtenir une séparation lumineuse sobre :

```tsx
<section className="section-cinema ...">
  ...
</section>
```

## Accessibilité et performance

- Les effets continus sont désactivés ou fortement réduits avec `prefers-reduced-motion`.
- Le curseur premium est desktop uniquement, pointeur fin uniquement.
- Les interactions sont CSS-first pour limiter le coût JavaScript.
- Ne pas appliquer ces effets aux formulaires critiques ou aux composants qui demandent une lecture longue.
