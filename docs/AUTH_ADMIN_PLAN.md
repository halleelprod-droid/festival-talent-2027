# Plan de securisation admin

Ce document prepare la securisation future de `/admin` sans activer d'acces aux donnees reelles dans la V6.

## Objectif

Proteger le dashboard admin avant toute lecture de la table `preselections`.

## Etapes recommandees

1. Activer Supabase Auth pour les comptes administrateurs.
2. Ajouter un role admin dans les metadata utilisateur ou dans une table dediee.
3. Proteger `/admin` cote serveur avec une verification de session.
4. Mettre en place des policies RLS strictes sur `preselections`.
5. Lire les statistiques uniquement depuis du code serveur authentifie.
6. Utiliser la service role key uniquement cote serveur, jamais dans un composant client, jamais dans le navigateur, jamais dans une variable `NEXT_PUBLIC_*`.
7. Ajouter une page de connexion admin separee avec redirection apres auth.
8. Journaliser les acces sensibles et limiter les exports de donnees.

## Regles de securite

- Ne jamais exposer les donnees candidates publiquement.
- Ne jamais importer une cle service role dans du code client.
- Ne jamais contourner RLS depuis une route publique.
- Ne jamais afficher telephone, email, message ou portfolio sans auth admin.
- Garder `lib/supabase.ts` pour le client public existant sans le casser.

## V6

La V6 affiche un dashboard visuel preparatoire avec donnees mockees. Les fonctions dans `services/preselections.ts` sont volontairement serveur-only et retournent des valeurs neutres tant que l'auth admin n'est pas active.
