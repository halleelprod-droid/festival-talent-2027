# Base de données PostgreSQL

Le schéma versionné se trouve dans `src/db/schema/index.ts`, les migrations dans `drizzle/`, et la connexion server-only dans `src/db/index.ts`. L’unique variable de connexion est `DATABASE_URL`.

```bash
npm run db:generate
npm run db:migrate
npm run import:preselections -- --dry-run
```

Le navigateur ne se connecte jamais à PostgreSQL. Les écritures publiques passent par des routes validées avec Zod ; les lectures privées exigent une session Auth.js et un rôle. Voir `docs/SUPABASE_EXIT_AUDIT.md` pour l’architecture historique remplacée.

## Environnement PostgreSQL local Windows

Le poste de développement utilise PostgreSQL 18 sur `localhost:5432`. Le serveur n'est pas exposé sur le réseau. Les bases locales sont `festival_talent_dev`, `festival_talent_test` et `festival_talent_restore_test`.

- `festival_owner_local` possède les objets et sert uniquement aux migrations et aux opérations d'administration locales contrôlées ;
- `festival_app_local` est le compte normal de l'application et dispose des droits CRUD nécessaires ;
- `festival_backup_local` est limité à la lecture pour les sauvegardes.

Les mots de passe et URL complètes restent uniquement dans l'environnement local ignoré par Git. Pour le détail de l'installation, de pgAdmin et des commandes d'exploitation, voir [docs/LOCAL_POSTGRESQL_WINDOWS.md](docs/LOCAL_POSTGRESQL_WINDOWS.md).

## Date de naissance (remplace l’âge)

Depuis la migration `drizzle/0003_candidate-date-of-birth.sql`, la colonne `candidates.date_of_birth` (type SQL `date`, sans heure ni fuseau) est **la seule donnée de naissance persistée**. L’ancienne colonne `age` a été retirée.

- **L’âge n’est jamais stocké** : il est calculé dynamiquement via `src/lib/candidate-date-of-birth.ts` (`calculateAgeOnDate`), qui compare année, mois puis jour sans conversion de fuseau horaire.
- **Date de référence d’éligibilité** : centralisée dans `src/config/edition.ts` (`ageReferenceDate`, actuellement `2027-01-01`). Cette date et les limites 6–100 sont une **règle technique provisoire en attente de validation par l’organisation** ; elles ne constituent pas le règlement officiel. L’éligibilité (`isCandidateAgeEligible`) se calcule à cette date. Ces règles pourront migrer vers la table `editions` quand elles deviendront spécifiques par édition.
- **Borne SQL durable** : `date_of_birth >= '1900-01-01'` quand la date est renseignée. La migration corrective `0004` retire la borne supérieure statique `2100`, qui ne protégeait pas contre une date future aujourd’hui. La règle « pas dans le futur » vit côté application (`CURRENT_DATE` n’est pas immutable dans un CHECK).
- **Imports CSV avec seulement un âge** : aucune date n’est fabriquée à partir d’un âge (ce serait une donnée fausse). La ligne est bloquée avant écriture et signalée `manual_birth_date_review_required` dans le dry-run (`npm run import:preselections -- --dry-run`). Si un âge et une date incohérents coexistent, la date fait foi et l’écart est signalé `age_date_of_birth_mismatch` sans correction silencieuse.
- **Confidentialité** : la date de naissance est une donnée personnelle. Elle n’apparaît jamais dans les logs, les SMS, ni les routes publiques. La date complète et l’âge calculé ne sont visibles que dans le tableau admin (route protégée) et l’export CSV audité (`date_of_birth`, `calculated_age`, `age_reference_date`, `birth_date_review_required`), réservés aux rôles autorisés.
- **Détails complets** : voir [docs/CANDIDATE_DATE_OF_BIRTH_MIGRATION.md](docs/CANDIDATE_DATE_OF_BIRTH_MIGRATION.md) (convention 29 février, complétion des lignes historiques, stratégie `NOT NULL` future).
