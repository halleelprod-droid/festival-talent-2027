# Collecte sécurisée des dates de naissance historiques

## Pourquoi cette collecte

Les ~31 inscriptions historiques (`preselections-export.csv`) ne contiennent souvent qu'un **âge**, pas une date de naissance. Un âge **ne permet pas** de reconstruire une date exacte : inventer `AAAA-01-01` produirait une donnée fausse. Ces lignes sont donc **bloquées à l'import** tant que leur date n'est pas collectée et vérifiée auprès des candidats.

Ce flux est **entièrement local et non destructif** : aucune base modifiée, aucun candidat contacté automatiquement, aucune date fabriquée.

## Flux en deux phases

```
Génération du fichier masqué → collecte humaine → validation locale → dry-run de mise à jour → exécution ultérieure (double confirmation)
```

### 1. Générer le fichier de revue (lecture seule)

```bash
npm run birth-dates:generate-review -- --source preselections-export.csv --output birth-date-review.csv --map birth-date-review-map.csv
```

Produit deux fichiers **privés** (ignorés par Git, voir plus bas) :

- `birth-date-review.csv` — colonnes : `review_id`, `source_row`, `masked_name`, `masked_phone`, `masked_email`, `discipline`, `historical_age`, `date_of_birth` (vide), `verification_method`, `verification_status` (`pending`), `review_notes`. Les identités sont **masquées** (`I******* F***`, `********8606`, `i***@domaine.com`).
- `birth-date-review-map.csv` — correspondance privée `review_id` ↔ `source_row` ↔ `source_fingerprint` (empreinte HMAC non réversible, salée par `CANDIDATE_REVIEW_SECRET` si défini). Ne contient **jamais** nom/téléphone/email/date en clair.

`historical_age` est **informatif uniquement** — jamais utilisé pour générer une date.

### 2. Collecte humaine

L'équipe contacte les candidats (hors de cet outil), obtient leur date exacte, puis complète pour chaque ligne :

- `date_of_birth` au format `AAAA-MM-JJ` (ex. `2005-04-17`) ;
- `verification_method` parmi : `candidate_confirmation`, `identity_document`, `parent_or_guardian_confirmation`, `registration_form`, `other_verified_source` ;
- `verification_status` = `verified` une fois confirmée.

### 3. Valider le fichier complété (lecture seule)

```bash
npm run birth-dates:validate-review -- --input birth-date-review.csv --map birth-date-review-map.csv
```

Vérifie : colonnes requises, `review_id` connus et non dupliqués, lignes ne ciblant pas deux fois la même inscription, dates civiles réelles (rejette `2005-02-31`, `17/04/2005`, `2005/04/17`, `04-17-2005`, dates futures), éligibilité, statut et méthode valides, cohérence avec l'âge historique (signal non bloquant). Produit un rapport **anonymisé** (compteurs seuls) et, si besoin, `birth-date-review-errors.csv` limité à `review_id`, `source_row`, `reason_code`.

Une ligne est **prête** si : date valide + non future + éligible, `verification_status = verified`, `verification_method` renseignée, `review_id` reconnu.

### 4. Dry-run de mise à jour

```bash
npm run birth-dates:update -- --input birth-date-review.csv
```

Par défaut **dry-run** : valide et compte les mises à jour potentielles, **n'écrit rien**.

### 5. Exécution ultérieure (production uniquement)

L'écriture exige les **deux** options explicites **et** un administrateur existant :

```bash
npm run birth-dates:update -- --input birth-date-review.csv --execute --confirm-birth-date-update --admin-email admin@example.com
```

L'écriture est refusée si le fichier contient une erreur, un `review_id` inconnu, un doublon, une date invalide, un statut non `verified`, une méthode manquante, ou un **conflit** avec une date déjà présente.

## Idempotence & conflits

- Date absente en base → mise à jour appliquée.
- Même date déjà présente → ignorée (déjà à jour).
- Autre date déjà présente → **conflit bloquant** (jamais écrasée sans contrôle).

## Journal d'audit

Une future exécution réelle écrit dans `audit_logs` l'action `candidate_birth_date_verified` avec `candidateId`, `reviewId`, `verificationMethod`, `source`, `adminUserId` et `changedFields` — **jamais** la date de naissance, l’e-mail administrateur ou une ancienne/nouvelle valeur en clair.

## Protection des fichiers privés

`birth-date-review.csv`, `birth-date-review-map.csv` et `birth-date-review-errors.csv` sont **ignorés par Git**. Ils :

- ne doivent jamais être committés, déposés sur un lien public, ni partagés dans un groupe public ;
- doivent transiter par un partage chiffré ou un espace restreint, accessibles aux seules personnes autorisées ;
- doivent être **supprimés après validation et sauvegarde sécurisée**.

## Page de collecte en ligne (non développée)

Une future page (ex. `/admin/candidates/birth-date-review` ou lien individuel signé) n'est **pas** développée ici : elle impliquerait authentification, expiration/anti-énumération des liens, consentement, validation juridique, journalisation et purge. Pour l'instant, on privilégie le fichier contrôlé hors ligne.

## Exemple synthétique (valeurs fictives)

```csv
review_id,source_row,masked_name,masked_phone,masked_email,discipline,historical_age,date_of_birth,verification_method,verification_status,review_notes
FT-DOB-0001,2,A***** D**,******1234,a***@example.com,Danse,18,2009-05-12,candidate_confirmation,verified,
FT-DOB-0002,3,M***** F***,******5678,m***@example.com,Musique,21,,,pending,
```
