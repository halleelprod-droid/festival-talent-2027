# Audit de sortie Supabase

Date : 17 juillet 2026.

## Dépendances historiques identifiées

Avant migration, quatre flux actifs dépendaient de Supabase :

1. le formulaire `PreselectionForm` insérait directement depuis le navigateur dans la table historique `preselections` ;
2. `LiveRegistrationCounter` lisait le compteur et écoutait Realtime ;
3. la route newsletter insérait dans `newsletter_subscribers` ;
4. le panneau admin utilisait Supabase Auth et invoquait des Edge Functions de messagerie.

Des Edge Functions, une migration SQL et une configuration locale avaient également été préparées pour les confirmations SMS. Le client partagé se trouvait dans `lib/supabase.ts`, les variables publiques dans `.env.example` et la dépendance JavaScript dans `package.json`.

## Résultat de l’audit

- Base : remplacée par PostgreSQL standard et Drizzle.
- Formulaire : remplacé par `POST /api/preselections`, sans accès base depuis le navigateur.
- Administration/authentification : remplacées par Auth.js et des lectures serveur.
- Messagerie : remplacée par des services Node indépendants et Twilio.
- Statistiques : agrégats PostgreSQL server-only.
- Newsletter : PostgreSQL server-only.
- Storage : aucun appel actif trouvé ; les médias du site sont locaux sous `public/`.
- Webhooks : aucun webhook actif trouvé hors du prototype historique de messagerie.
- RLS/Realtime : retirés de l’architecture applicative ; la sécurité repose sur les routes serveur, les rôles Auth.js et les permissions PostgreSQL.

Les mentions de Supabase dans ce document sont strictement historiques. Aucun service distant n’a été modifié ou supprimé pendant la migration.


> **Modèle candidat** : `date_of_birth` remplace `age` (source de vérité ; âge calculé dynamiquement, aucune date fabriquée). Détails dans [DATABASE.md](../DATABASE.md#date-de-naissance-remplace-lâge).
