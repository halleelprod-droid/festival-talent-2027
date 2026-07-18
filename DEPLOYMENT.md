# Déploiement

Le site cible Vercel et une base PostgreSQL standard (Neon, Railway, Render ou auto-hébergée).

Variables obligatoires : `DATABASE_URL`, `AUTH_SECRET`, `AUTH_URL`, `INTERNAL_API_SECRET`. Variables de messagerie : `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_FROM_NUMBER`, `CRON_SECRET`. Garder `MESSAGING_ENABLED=false` jusqu’à validation opérationnelle.

Avant déploiement : sauvegarder la base, appliquer `npm run db:migrate`, exécuter les tests, le lint et le build, puis vérifier qu’aucun secret n’est suivi. Les migrations doivent être appliquées avant le trafic applicatif. Le domaine canonique reste `https://festivaltalentofficial.com`.

Les migrations `0003` et `0004` remplacent `age` par `date_of_birth` et corrigent sa contrainte durable. Aucune migration n’est appliquée automatiquement. Avant l’import historique, collecter les dates manquantes via le flux de revue local (`birth-dates:generate-review`, `birth-dates:validate-review`, puis `birth-dates:update` en dry-run) ; les lignes sans date valide sont bloquées. Détails : [docs/CANDIDATE_BIRTH_DATE_REVIEW.md](docs/CANDIDATE_BIRTH_DATE_REVIEW.md) et [docs/CANDIDATE_DATE_OF_BIRTH_MIGRATION.md](docs/CANDIDATE_DATE_OF_BIRTH_MIGRATION.md).
