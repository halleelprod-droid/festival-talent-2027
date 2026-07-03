# Déploiement

Le site est conçu pour **Vercel** (framework preset Next.js, zéro configuration de build spécifique — `vercel.json` présent à la racine).

## Variables d'environnement

| Variable | Fichier local | Rôle | État |
|---|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | `.env.local` | URL du projet Supabase | **Requis** — le build échoue sans (throw dans `lib/supabase.ts`) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `.env.local` | Clé anonyme Supabase (publique par design, protégée par RLS) | **Requis** |
| `RESEND_API_KEY` | `.env` | Envoi de l'email de confirmation newsletter | Optionnel — sans clé, l'inscription fonctionne mais aucun email n'est envoyé (dégradation silencieuse volontaire) |
| `NEXT_PUBLIC_MAPBOX_TOKEN` | `.env` | Carte interactive Paris–Rome | Optionnel — sans token, `TourMap` rend `null` et la section retombe sur la grille statique |

Sur Vercel : Settings → Environment Variables, renseigner les 4 pour Production (et Preview si souhaité). Après modification d'une variable, redéployer.

## Checklist avant déploiement

1. `npm run build` vert en local.
2. `npm run lint` : 0 erreur, 0 warning.
3. `npx vitest run` : tests unitaires verts.
4. `npm run test:e2e` : E2E verts (optionnel en urgence, obligatoire pour un changement de layout/navigation).
5. Vérifier qu'aucun secret n'est commité (`.env*` sont dans `.gitignore`).

## Monitoring

`@vercel/analytics` et `@vercel/speed-insights` sont montés dans `app/layout.tsx`. Les données apparaissent dans le dashboard Vercel (onglets Analytics / Speed Insights) **uniquement en production sur Vercel** — silencieux en local, aucun impact de perf.

## Domaine

`lib/seo.ts` déclare `siteUrl = https://festivaltalentofficial.com` — c'est la base du sitemap, du canonical et des JSON-LD. Si le domaine change, c'est le **seul** endroit à modifier.

## Rollback

Vercel garde chaque déploiement : Dashboard → Deployments → "..." → Promote to Production sur un déploiement antérieur. Aucune migration de base à rejouer (le schéma Supabase est géré à la main, voir DATABASE.md).
