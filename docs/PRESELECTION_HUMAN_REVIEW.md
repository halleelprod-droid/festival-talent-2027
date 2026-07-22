# Revue humaine des inscriptions avant import local

Ce flux prépare la revue humaine des inscriptions historiques (export Supabase)
**avant** tout import dans PostgreSQL local. Il ne modifie aucune base, n'envoie
aucun message et n'affiche jamais de donnée personnelle dans le terminal.

> **Contexte.** La table historique `preselections` ne stocke qu'un entier `age`,
> jamais de date de naissance. Le modèle local exige une `date_of_birth` réelle
> (source de vérité, aucune date fabriquée). Chaque inscription doit donc passer
> par une revue humaine avant d'être importable.

## 1. Fichiers produits (tous PRIVÉS, hors dépôt)

Générés par `preselections:generate-review` dans un dossier hors Git
(`C:\FestivalTalentData\exports-private`) :

| Fichier | Rôle |
| --- | --- |
| `preselections-human-review-<date>.csv` | Fichier maître édité par l'humain |
| `preselections-invalid-phones-<date>.csv` | Volet focalisé : téléphones invalides |
| `preselections-duplicate-review-<date>.csv` | Volet focalisé : arbitrage des doublons |
| `preselections-human-review-<date>.summary.json` | Compteurs uniquement (aucune donnée) |

Ces CSV contiennent des données réelles (nom, téléphone, e-mail) nécessaires à la
revue. **Ils ne doivent jamais être committés, ni affichés en clair, ni envoyés.**

### Colonnes du fichier maître

`review_id`, `source_id`, `full_name`, `phone_original`, `phone_normalized`,
`phone_status`, `email`, `age_legacy`, `date_of_birth`, `discipline`,
`created_at`, `duplicate_group_id`, `duplicate_reason`, `review_status`,
`review_decision`, `review_notes`.

`review_id` est stable (`FT-PSR-0001`…) ; `source_id` est l'`id` d'origine.
`date_of_birth`, `review_decision` et `review_notes` sont **vides au départ**.

## 2. Générer les fichiers

```bash
npm run preselections:generate-review -- \
  --source "C:/FestivalTalentData/exports-private/supabase-preselections-full-<date>.csv" \
  --out-dir "C:/FestivalTalentData/exports-private" \
  --date 2026-07-22
```

La sortie terminal ne contient que des compteurs.

## 3. Comment remplir les dates de naissance

- Renseigner `date_of_birth` au format **`YYYY-MM-DD`**, à partir d'une **source
  vérifiée** (pièce d'identité, confirmation du candidat, formulaire).
- **Interdictions absolues :**
  - ne jamais transformer `age=20` en une date approximative ;
  - ne jamais utiliser le 1er janvier par défaut ;
  - ne jamais utiliser « année courante moins l'âge » ;
  - ne jamais inventer un jour ou un mois.
- La validation vérifie : format, date réelle (rejette le 31 février et les faux
  29 février), pas de date future, année ≥ 1900 (limite technique), âge recalculé
  à la date de référence de l'édition, éligibilité (bornes d'âge).
- **Écart d'âge (`age_mismatch`).** Si l'âge recalculé diffère de `age_legacy`
  de plus de `AGE_MISMATCH_TOLERANCE_YEARS` (= 1 an), la ligne est signalée. Ce
  signal n'est **jamais** corrigé automatiquement : il exige une décision humaine
  explicite (`review_decision = approved` avec une note) pour être levé.

## 4. Comment corriger les téléphones

Dans `preselections-invalid-phones-<date>.csv`, renseigner `review_decision` :

| Décision | Sens |
| --- | --- |
| `confirmed_valid` | Le numéro est en fait valide |
| `corrected` | Numéro corrigé — saisir la valeur dans `suggested_format` |
| `unreachable` | Injoignable |
| `invalid` | Numéro invalide, non corrigeable |
| `needs_contact` | À recontacter |

Aucune correction automatique. Une valeur `corrected` doit être un numéro
sénégalais valide. Report the confirmed/corrected value into `phone_status`
(`confirmed_valid` ou `corrected`) et `phone_normalized` du fichier maître.

## 5. Comment arbitrer les doublons

Dans `preselections-duplicate-review-<date>.csv`, chaque groupe
(`duplicate_group_id`) porte un `match_type` (`phone_identical`, `email_identical`,
`name_and_city`, …). Renseigner `review_decision` :

| Décision | Sens |
| --- | --- |
| `same_person_keep_oldest` | Même personne, garder la plus ancienne |
| `same_person_keep_latest` | Même personne, garder la plus récente |
| `same_person_merge_manually` | Même personne, fusion manuelle |
| `distinct_people` | Personnes distinctes |
| `invalid_duplicate` | Faux doublon |
| `unresolved` | Non tranché (bloque l'import) |

**Aucune fusion automatique.** Un groupe ne peut pas mélanger `distinct_people`
et une décision `same_person_*`.

## 6. Valider

```bash
npm run preselections:validate-review -- \
  --file "C:/FestivalTalentData/exports-private/preselections-human-review-2026-07-22.csv" \
  --phones "C:/FestivalTalentData/exports-private/preselections-invalid-phones-2026-07-22.csv" \
  --duplicates "C:/FestivalTalentData/exports-private/preselections-duplicate-review-2026-07-22.csv"
```

La sortie et le rapport JSON (`preselections-review-validation.report.json`) ne
contiennent que des compteurs. Aucune donnée personnelle.

## 7. Critères pour être « importable »

Une ligne n'est prête (`ready`) que si **toutes** ces conditions sont réunies :

- `date_of_birth` valide, non future, ≥ 1900, âge éligible ;
- `age_mismatch` absent ou explicitement approuvé ;
- téléphone valide (`valid`, `confirmed_valid`, ou `corrected` avec numéro valide) ;
- doublon résolu (décision ≠ `unresolved`) ;
- `source_id` présent, `discipline` reconnue ;
- `review_decision = approved`.

Le fichier `preselections-import-ready-<date>.csv` n'est produit **que** si aucune
ligne ne reste non résolue et nécessite `--source` (export d'origine) pour
réassembler les colonnes d'import (dont `city`).

## 8. Interdictions permanentes

- Ne jamais inventer ni dériver une date de naissance depuis l'âge.
- Ne jamais présumer un consentement (la source historique n'en contient aucun ;
  aucun consentement transactionnel/opérationnel/marketing n'est déduit).
- Aucun SMS ni appel Twilio avant un import validé.
- Aucune donnée privée dans Git : fichiers de revue, exports, summaries privés et
  CSV d'import restent hors dépôt.
