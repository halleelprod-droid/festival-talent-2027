# Plan de bascule PostgreSQL

1. Créer la base cible, appliquer le schéma Drizzle et exécuter le dry-run CSV.
2. Sauvegarder, importer les 31 lignes avec confirmation explicite, puis contrôler volumes et signaux de doublons.
3. Valider le formulaire sur un environnement de préproduction ; une double écriture temporaire reste facultative mais n’est pas implémentée.
4. Basculer lectures et écritures applicatives vers PostgreSQL.
5. Activer Auth.js, les services Node de messagerie et confirmer l’absence d’usage Storage.
6. Effectuer les tests de production, dont formulaire, dashboard, export, mobile et journalisation.
7. Désactiver manuellement les anciens webhooks distants après validation.
8. Produire un dernier export et une sauvegarde vérifiée de l’ancien service.
9. Retirer manuellement les anciennes clés de l’hébergeur après bascule confirmée.
10. Fermer l’ancien projet uniquement sur décision humaine, après sauvegarde finale et test de restauration.

La présente mission s’arrête avant les étapes distantes 7 à 10 : aucun projet, table, webhook, fichier ou secret distant n’est supprimé.


> **Modèle candidat** : `date_of_birth` remplace `age` (source de vérité ; âge calculé dynamiquement, aucune date fabriquée). Détails dans [DATABASE.md](../DATABASE.md#date-de-naissance-remplace-lâge).
