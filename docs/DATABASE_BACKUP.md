# Sauvegardes PostgreSQL

Les scripts utilisent exclusivement `DATABASE_URL` et n’inscrivent jamais la connexion dans le nom du fichier.

## Sauvegarde

```bash
DATABASE_URL='…' ./scripts/backup-database.sh
```

Le format `pg_dump --format=custom` permet une restauration contrôlée. Programmer une sauvegarde quotidienne, conserver 30 jours, et sauvegarder avant chaque migration. Si une sauvegarde quitte le fournisseur, elle doit être chiffrée au repos et en transit.

## Restauration

Tester périodiquement sur une base isolée :

```bash
DATABASE_URL='…' ./scripts/restore-database.sh backups/festival-talent-YYYYMMDDTHHMMSSZ.dump --confirm-restore
```

La restauration utilise `--clean --if-exists` et ne doit jamais viser la production sans fenêtre de maintenance, sauvegarde préalable et validation explicite.
