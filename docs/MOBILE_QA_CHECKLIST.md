# Checklist QA mobile

## Viewports

320×568, 360×640, 375×667, 390×844, 412×915, 430×932, 768×1024,
1024×768 et 1440×900.

## Contrôles

- absence de scroll horizontal global ;
- descendants visibles contenus dans leur carte utile ;
- textes longs, badges et e-mails repliés ;
- checkbox/radio conservant une taille compacte ;
- inputs, selects et textarea contenus ;
- erreurs, consentements et boutons lisibles ;
- navigation, footer, tableaux scrollables et modales utilisables ;
- éléments absolus décoratifs exclus uniquement s'ils sont réellement masqués et
  non interactifs ;
- animations neutralisées dans les tests, puis vérifiées manuellement avec
  `prefers-reduced-motion`.

Le test `e2e/responsive-overflow.spec.ts` inventorie toutes les routes publiques et
compare à la fois le document et chaque élément visible. Le formulaire utilise en
plus des assertions internes sur les cartes de consentement. Les parcours admin
non authentifiés sont couverts dans `e2e/admin-local.spec.ts` avec des données
synthétiques uniquement.
