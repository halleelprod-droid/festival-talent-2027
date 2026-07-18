-- Remplacement de `age` par `date_of_birth` sur la table `candidates`.
--
-- STRATÉGIE A retenue : aucune donnée réelle n'a encore été importée en base
-- (aucun import exécuté). La colonne `age` peut donc être remplacée directement.
--
-- `date_of_birth` (type SQL `date` : date civile, sans heure ni fuseau) devient la
-- source de vérité. L'âge n'est plus persisté ; il est calculé dynamiquement à
-- partir de la date de naissance (voir src/lib/age.ts).
--
-- Aucune date de naissance n'est fabriquée à partir d'un âge : un âge seul ne
-- permet pas de reconstituer une date exacte, et inventer « AAAA-01-01 »
-- produirait une donnée fausse. Les lignes historiques ne disposant que d'un âge
-- sont importées avec `date_of_birth` NULL et signalées pour revue manuelle
-- (voir src/import/preselections.ts). C'est pourquoi la colonne reste nullable.

-- 1. Ajout de la nouvelle colonne (nullable).
ALTER TABLE "candidates" ADD COLUMN "date_of_birth" date;
--> statement-breakpoint
-- 2. Contrainte de sanité (bornes immuables ; pas de règle « futur » ici,
--    CURRENT_DATE n'étant pas immutable dans un CHECK PostgreSQL).
ALTER TABLE "candidates" ADD CONSTRAINT "candidates_dob_reasonable" CHECK ("candidates"."date_of_birth" IS NULL OR ("candidates"."date_of_birth" BETWEEN '1900-01-01' AND '2100-01-01'));
--> statement-breakpoint
-- 3. Retrait de l'ancienne contrainte puis de l'ancienne colonne `age`.
ALTER TABLE "candidates" DROP CONSTRAINT IF EXISTS "candidates_age_reasonable";
--> statement-breakpoint
ALTER TABLE "candidates" DROP COLUMN "age";
