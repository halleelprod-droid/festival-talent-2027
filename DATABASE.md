# Base de données — Supabase

Le schéma est géré **manuellement dans le dashboard Supabase** (SQL Editor). Il n'y a volontairement pas d'ORM ni de fichiers de migration dans le repo (Prisma a été retiré en 2026-07, aucun cas d'usage — voir ARCHITECTURE.md). Ce document est la source de vérité du schéma : **toute modification de table doit être reflétée ici**.

Client unique : `lib/supabase.ts` (clé anonyme, côté client et API routes). Règle : ne jamais écrire de requête Supabase directement dans un composant de section — passer par un composant dédié (`PreselectionForm`, `LiveRegistrationCounter`) ou une API route. Si le nombre de points d'accès grandit, extraire vers `services/supabase/` (pas justifié aujourd'hui avec 3 points d'accès).

## Tables

### `preselections`
Inscriptions aux pré-sélections (formulaire `components/preselections/PreselectionForm.tsx`).

| Colonne | Type | Note |
|---|---|---|
| `full_name` | text | requis (validé côté client) |
| `phone` | text | requis |
| `email` | text | optionnel |
| `age` | text/int | optionnel |
| `city` | text | requis |
| `discipline` | text | requis |
| `experience` | text | optionnel |
| `portfolio_link` | text | optionnel |
| `message` | text | optionnel |

Consommateurs :
- `PreselectionForm` — INSERT (anon).
- `LiveRegistrationCounter` — SELECT count (anon, `head: true`) + **Supabase Realtime** sur INSERT (`channel: preselections-live-count`). Pour que le live fonctionne, la table doit être ajoutée à la publication Realtime : Dashboard → Database → Replication → activer `preselections` (ou `ALTER PUBLICATION supabase_realtime ADD TABLE preselections;`).

### `newsletter_subscribers`
Emails newsletter (API route `app/api/newsletter/route.ts`).

| Colonne | Type | Note |
|---|---|---|
| `id` | uuid PK | `gen_random_uuid()` |
| `email` | text UNIQUE | le code traite le code d'erreur `23505` (doublon) comme un succès ("déjà inscrit") |
| `created_at` | timestamptz | `now()` |

SQL de création (si la table n'existe pas encore) :
```sql
create table if not exists newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default now()
);
alter table newsletter_subscribers enable row level security;
create policy "Allow public insert" on newsletter_subscribers
  for insert to anon with check (true);
```

## RLS (Row Level Security)

Modèle en vigueur : **insertion publique, lecture non publique** (sauf le count sur `preselections`). La clé `NEXT_PUBLIC_SUPABASE_ANON_KEY` est exposée au navigateur par design — la sécurité repose entièrement sur les policies RLS, jamais sur le secret de la clé. Ne jamais créer de policy `SELECT` publique sur des données personnelles (noms, téléphones, emails).

## Évolutions prévues (voir ROADMAP.md)

- Tables billetterie (tickets, QR, paiements) — non créées, à modéliser avec la décision de prestataire de paiement.
- Tables admin (validation des candidatures) — dépend du choix d'authentification (non tranché).
