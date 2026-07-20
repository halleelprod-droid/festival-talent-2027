# Déploiement

Le site cible Vercel et une base PostgreSQL standard (Neon, Railway, Render ou auto-hébergée).

Pour la messagerie, configurer `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_MESSAGING_SERVICE_SID` (préféré) ou `TWILIO_PHONE_NUMBER`, `TWILIO_STATUS_CALLBACK_URL` et `INTERNAL_API_SECRET`. Garder `MESSAGING_ENABLED=false` jusqu'à la validation opérationnelle : dans cet état, aucun provider réel n'est instancié.

Variables obligatoires hors messagerie : `DATABASE_URL`, `AUTH_SECRET`, `AUTH_URL`. `CRON_SECRET` reste réservé aux tâches planifiées générales ; aucun cron de messagerie distant n'est configuré ici.

Avant déploiement : sauvegarder la base, appliquer `npm run db:migrate`, exécuter les tests, le lint et le build, puis vérifier qu’aucun secret n’est suivi. Les migrations doivent être appliquées avant le trafic applicatif. Le domaine canonique reste `https://festivaltalentofficial.com`.

Les migrations `0003` et `0004` remplacent `age` par `date_of_birth` et corrigent sa contrainte durable. Aucune migration n’est appliquée automatiquement. Avant l’import historique, collecter les dates manquantes via le flux de revue local (`birth-dates:generate-review`, `birth-dates:validate-review`, puis `birth-dates:update` en dry-run) ; les lignes sans date valide sont bloquées. Détails : [docs/CANDIDATE_BIRTH_DATE_REVIEW.md](docs/CANDIDATE_BIRTH_DATE_REVIEW.md) et [docs/CANDIDATE_DATE_OF_BIRTH_MIGRATION.md](docs/CANDIDATE_DATE_OF_BIRTH_MIGRATION.md).

La migration `0005_message-dispatch-automation.sql` prépare la file de confirmations, les reprises et le suivi Twilio ; elle doit être relue et appliquée avant toute activation. L'URL du callback doit être exactement celle de `TWILIO_STATUS_CALLBACK_URL`. L'activation progressive, le retour arrière avec `MESSAGING_ENABLED=false` et la campagne historique sont décrits dans [docs/PRESELECTION_MESSAGING.md](docs/PRESELECTION_MESSAGING.md).

L'environnement PostgreSQL Windows documenté dans [docs/LOCAL_POSTGRESQL_WINDOWS.md](docs/LOCAL_POSTGRESQL_WINDOWS.md) est strictement local. Ses comptes, bases et sauvegardes ne doivent jamais être réutilisés en production. Aucun déploiement ne doit recopier `.env.local` ni un fichier de `C:\FestivalTalentData`.
