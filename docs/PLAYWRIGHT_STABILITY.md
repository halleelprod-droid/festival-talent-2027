# Stabilité Playwright

## Politique

- zéro retry configuré ;
- quatre workers locaux, deux en CI, pour éviter de saturer le serveur Next.js ;
- suite exhaustive responsive exécutée en série ;
- `prefers-reduced-motion` et CSS de neutralisation des animations ;
- attente déterministe du DOM, des polices et de deux frames de rendu ;
- aucun `waitForTimeout` arbitraire dans les audits responsive ;
- sélecteurs accessibles ou `data-testid` stables ;
- fixtures exclusivement synthétiques.

## Validation

Exécuter d'abord les routes historiquement instables, puis :

```powershell
npx playwright test --repeat-each=3
npx playwright test
```

Un échec ne doit pas être masqué en augmentant les retries. Conserver la trace sur
échec, identifier la route et le viewport, puis corriger la condition de course,
le chargement ou le sélecteur. Le serveur doit être construit avant le test et ne
doit pas dépendre d'une ressource distante pour atteindre un état stable.
