# Sauvegardes PostgreSQL locales

Les scripts PowerShell utilisent exclusivement `DATABASE_URL`, refusent tout hôte distant et n'inscrivent jamais les identifiants dans le nom du fichier ou dans Git.

## Sauvegarde

Préparer dans le processus courant une URL locale utilisant de préférence `festival_backup_local`, puis lancer :

```powershell
.\scripts\backup-database.ps1 -DryRun
.\scripts\backup-database.ps1
```

La base doit être `festival_talent_dev` ou `festival_talent_test`. Le fichier au format custom de `pg_dump` est créé dans `C:\FestivalTalentData\backups`. Les extensions de sauvegarde sont ignorées par Git. Conserver les sauvegardes hors du dépôt et protéger leur accès, car elles peuvent contenir des données personnelles.

## Restauration de contrôle

La restauration est volontairement limitée à `festival_talent_restore_test` sur localhost :

```powershell
.\scripts\restore-database.ps1 -BackupFile "C:\FestivalTalentData\backups\festival_talent_test_YYYY-MM-DD_HH-mm-ss.dump" -DryRun
.\scripts\restore-database.ps1 -BackupFile "C:\FestivalTalentData\backups\festival_talent_test_YYYY-MM-DD_HH-mm-ss.dump" -ConfirmRestore
```

La seconde commande est destructive uniquement pour la base locale isolée de restauration. Elle emploie `pg_restore --clean --if-exists --no-owner`. Après restauration, vérifier le nombre de migrations, la présence des tables attendues et les contraintes principales sans afficher de données personnelles.

## Procédure de reprise

1. Arrêter les écritures de l'application concernée.
2. Identifier une sauvegarde valide et contrôler sa taille.
3. Faire d'abord une restauration dans `festival_talent_restore_test`.
4. Vérifier le schéma, les migrations et quelques agrégats non sensibles.
5. Documenter l'incident et obtenir une validation explicite avant toute restauration hors environnement local.

Ne jamais modifier le schéma manuellement avec pgAdmin : toute évolution passe par une migration versionnée.
