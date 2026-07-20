# PostgreSQL local sous Windows

## Configuration validée

- PostgreSQL 18.4 natif Windows ;
- service `postgresql-x64-18` en démarrage automatique ;
- écoute limitée à `localhost:5432` ;
- authentification locale SCRAM-SHA-256 ;
- binaires PostgreSQL 18 ajoutés au `PATH` utilisateur ;
- pgAdmin installé pour l'inspection locale uniquement.

Les données d'exploitation hors dépôt se trouvent sous `C:\FestivalTalentData` : sauvegardes, tests de restauration, exports privés, journaux et copies de configuration. Aucun de ces fichiers ne doit être ajouté à Git.

## Bases et rôles

| Ressource | Usage |
| --- | --- |
| `festival_talent_dev` | développement local |
| `festival_talent_test` | tests et validation locale |
| `festival_talent_restore_test` | restauration isolée |
| `festival_owner_local` | propriétaire du schéma et migrations |
| `festival_app_local` | connexion applicative normale, droits CRUD |
| `festival_backup_local` | lecture seule et sauvegardes |

Tous les rôles applicatifs sont sans privilège superutilisateur, création de rôle, création de base ou réplication. `.env.local` doit viser `festival_talent_test` avec `festival_app_local` pour l'usage courant. Les migrations sont lancées temporairement avec le rôle propriétaire, sans enregistrer son secret dans un fichier suivi.

## Commandes usuelles

```powershell
pg_isready -h localhost -p 5432
npm run db:migrate
npm test -- --run
npm run lint
npm run build
npx tsc --noEmit
```

`npm run db:migrate` exige une `DATABASE_URL` locale du propriétaire. Une fois la migration terminée, restaurer la connexion applicative normale. Les migrations `0000` à `0005` constituent l'historique attendu.

## pgAdmin

Enregistrer le serveur avec l'hôte `localhost`, le port `5432` et le rôle minimal adapté à la tâche. Ne jamais utiliser pgAdmin pour modifier manuellement une table, une contrainte ou un index : le schéma est piloté exclusivement par les migrations dans `drizzle/`.

## Sécurité fonctionnelle

- `MESSAGING_ENABLED=false` reste obligatoire pendant les tests locaux ;
- aucun identifiant Twilio réel n'est requis ;
- aucun CSV historique ne doit être importé pendant la validation d'infrastructure ;
- les règles d'âge 2027 demeurent provisoires tant que l'organisation ne les a pas validées par écrit ;
- les comptes et inscriptions de validation emploient uniquement des identités synthétiques en `.invalid`.

Les sauvegardes et restaurations sont décrites dans [DATABASE_BACKUP.md](DATABASE_BACKUP.md).
