# Migration candidat : `age` → `date_of_birth`

## Pourquoi l'âge n'est plus stocké

Un âge est une donnée **périssable** : il change chaque année et ne permet pas de reconstituer une date exacte. Stocker un âge fige une information fausse dès le lendemain de l'inscription. La **date de naissance** est stable, vérifiable et constitue la seule source de vérité pertinente.

## Comment l'âge est calculé

L'âge n'est jamais persisté : il est calculé dynamiquement par `src/lib/candidate-date-of-birth.ts` (`calculateAgeOnDate(dateOfBirth, referenceDate)`), par comparaison purement numérique année / mois / jour — sans objet `Date`, donc **sans dépendance au fuseau horaire**.

- **Type** : chaîne civile `AAAA-MM-JJ` (colonne SQL `date`, `mode: "string"` côté Drizzle). Jamais `timestamp`.
- **Convention 29 février** : pour une personne née un 29 février, en année non bissextile l'anniversaire est atteint le **1er mars** (le 28 février reste « avant »). Décision documentée et testée.

## Date de référence de l'éligibilité

L'âge d'éligibilité est calculé à la **date de début de l'édition**, pas à la date de remplissage du formulaire. Cette date est centralisée dans `src/config/edition.ts` :

```ts
currentEdition.ageReferenceDate // "2027-01-01" (à confirmer avec l'organisation)
```

> À remplacer par la date issue de la table `editions` (`starts_at`) lorsque les éditions seront entièrement administrables. Aucune autre copie de cette date ne doit exister ailleurs.

## Limites d'âge

Centralisées dans `src/config/edition.ts` (`minimumAge` / `maximumAge`). Valeurs actuelles **6–100** : bornes de sanité provisoires, volontairement permissives (identiques à l'ancienne contrainte SQL) pour ne rejeter aucun profil réel tant que la règle métier officielle n'est pas fixée. **À valider par l'organisation.**

## Décision métier en attente

- La date de référence officielle n'est pas confirmée.
- L'âge minimum officiel n'est pas confirmé.
- L'âge maximum officiel n'est pas confirmé.
- L'existence de règles différentes selon les disciplines n'est pas confirmée.
- Les valeurs actuelles (`2027-01-01`, minimum 6, maximum 100) sont strictement provisoires et techniques ; elles ne constituent pas un règlement officiel.
- La mise en production du parcours d'inscription doit rester bloquée jusqu'à validation écrite de ces règles par l'organisation.

La fiche de décision à compléter est disponible dans [AGE_ELIGIBILITY_DECISION.md](AGE_ELIGIBILITY_DECISION.md).

## Colonne nullable : pourquoi

`candidates.date_of_birth` est **nullable** uniquement pour permettre la revue des données historiques : les anciennes lignes ne disposant que d'un âge ne peuvent pas recevoir de date inventée. La couche applicative (Zod + route API) **exige** une date valide pour toute nouvelle inscription. La colonne pourra passer `NOT NULL` plus tard, une fois toutes les dates historiques complétées manuellement.

## Traitement des candidats historiques (~31 lignes CSV)

Une date de naissance **ne peut pas** être reconstruite depuis un âge : ce serait une donnée fausse. L'import (`src/import/preselections.ts`) applique donc, par ligne :

| Situation | Code de revue | Import exécutable |
|---|---|---|
| Date valide et éligible | — (ou `age_date_of_birth_mismatch`, signal non bloquant) | ✅ importable |
| Date valide hors limites provisoires | `candidate_age_not_eligible` | ⛔ bloquée |
| Âge seul, pas de date | `manual_birth_date_review_required` | ⛔ bloquée |
| Date invalide | `invalid_date_of_birth` | ⛔ bloquée |
| Date future | `future_date_of_birth` | ⛔ bloquée |

Les lignes bloquées **ne sont jamais insérées automatiquement**. Elles nécessitent une complétion humaine.

### Compléter les dates manquantes

Le flux complet de collecte sécurisée (génération d'un fichier masqué, validation stricte, dry-run de mise à jour) est décrit dans [CANDIDATE_BIRTH_DATE_REVIEW.md](CANDIDATE_BIRTH_DATE_REVIEW.md) :

```bash
npm run birth-dates:generate-review -- --source preselections-export.csv --output birth-date-review.csv
npm run birth-dates:validate-review -- --input birth-date-review.csv
npm run birth-dates:update -- --input birth-date-review.csv   # dry-run
```

Aucune date n'est fabriquée à partir d'un âge ; l'écriture réelle exige `--execute --confirm-birth-date-update --admin-email`.

La migration `0004_candidate-date-of-birth-constraint.sql` corrige la contrainte durable sans réécrire `0003` : seule la borne minimale fixe reste en SQL. Le futur est contrôlé par validation applicative par rapport à la date civile du jour.

## Données personnelles & confidentialité

La date de naissance est une donnée personnelle. Elle n'apparaît **jamais** dans les logs, les SMS, les clés d'idempotence, ni les routes publiques. Le tableau d'administration (route protégée par session + rôle) affiche la date et l'âge calculé ; l'export CSV admin (`date_of_birth`, `calculated_age`, `age_reference_date`, `birth_date_review_required`) reste authentifié, limité aux rôles autorisés et journalisé dans `audit_logs`.

## Exemple de payload public

```json
{ "dateOfBirth": "2004-09-23" }
```

L'ancien format `{ "age": 22 }` n'est plus accepté ; le serveur recalcule toujours l'âge depuis la date de naissance et ne fait jamais confiance à un âge transmis par le client.
