# Confirmations des pré-sélections

## Architecture

Le flux temps réel est séparé du fournisseur :

1. `POST /api/preselections` valide la demande.
2. Une transaction PostgreSQL crée le candidat, l'inscription, les consentements et un `message_logs` au statut `pending` (ou `suppressed`). Si elle échoue, aucune de ces écritures ne subsiste.
3. Après le commit seulement, Next.js `after()` peut déclencher une tentative courte lorsque `MESSAGING_ENABLED=true`. L'échec du SMS n'annule jamais l'inscription.
4. Le dispatcher reprend les lignes `pending` et les `retry_scheduled` arrivées à échéance, par lots bornés à 50. Le dépôt PostgreSQL utilise `FOR UPDATE SKIP LOCKED` et passe les lignes à `processing` avant tout appel fournisseur.
5. Twilio retourne un identifiant stocké dans `provider_message_id`. Le callback signé met ensuite à jour l'état, sans permettre à un ancien callback de rétrograder `delivered`.

Le corps du SMS n'est pas conservé en base ni dans les audits. Les résumés et audits excluent téléphone, nom, e-mail, date de naissance et erreur fournisseur brute.

## Idempotence, statuts et reprises

La clé unique est `preselection_confirmation:{registrationId}:{channel}:{templateVersion}`. La version actuelle est `preselection-confirmation-v1`. Elle ne contient aucune donnée personnelle. La contrainte unique empêche deux créations concurrentes et `SKIP LOCKED` empêche deux workers de traiter la même ligne.

Statuts canoniques : `pending`, `processing`, `accepted`, `sent`, `delivered`, `retry_scheduled`, `failed`, `undelivered`, `suppressed`, `cancelled`. `queued` reste uniquement pour la compatibilité des anciennes lignes et la migration 0005 le transforme en `pending`.

Les erreurs temporaires sont reprises après 5 minutes, 30 minutes puis 2 heures, pour un maximum de quatre tentatives en comptant l'envoi initial. Les erreurs permanentes, de configuration et les désabonnements ne sont pas repris. Le code Twilio de désabonnement est converti en `suppressed`.

## Consentement

Trois finalités sont distinctes :

- `transactional_registration_confirmation` : accusé lié à l'inscription ;
- `operational_preselection_updates` : rappels opérationnels futurs ;
- `marketing` : communication promotionnelle, jamais déduite automatiquement de l'inscription.

Un consentement transactionnel requis absent produit `suppressed`. Les retraits gérés par le Messaging Service Twilio remontent au callback ou au provider ; ils produisent également `suppressed`, sans boucle de retry.

## Configuration et activation progressive

Variables : `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, puis de préférence `TWILIO_MESSAGING_SERVICE_SID` (sinon `TWILIO_PHONE_NUMBER`), `TWILIO_STATUS_CALLBACK_URL`, `INTERNAL_API_SECRET` et `MESSAGING_ENABLED`. Garder `MESSAGING_ENABLED=false` tant que les validations de production ne sont pas terminées. Le provider réel n'est alors pas instancié.

La route `POST /api/internal/messages/preselection-confirmation` exige `x-internal-secret`, limite le débit et accepte un `limit` de 1 à 50. Elle répond `disabled` sans toucher à la file quand la messagerie est désactivée. Elle est prête pour un cron, mais aucun cron distant n'est configuré par le dépôt.

Le callback est `POST /api/webhooks/twilio/message-status`. Configurer son URL publique exacte dans Twilio et dans `TWILIO_STATUS_CALLBACK_URL`, car cette URL participe au calcul de la signature. Les requêtes sans `X-Twilio-Signature` valide sont refusées.

Ordre d'activation recommandé : migrations validées, variables provisionnées, callback public vérifié, test vers un numéro interne autorisé, activation sur une inscription de test, observation de `accepted` puis `delivered`, activation générale, puis seulement campagne historique séparée. Pour revenir en arrière, remettre `MESSAGING_ENABLED=false` ; les inscriptions continuent et les travaux restent reprenables.

## Nouvel export et inscriptions reçues depuis l'historique

Ne pas supposer que l'ancien `preselections-export.csv` contient les nouvelles lignes ni que le prochain total sera exactement 34 :

1. créer un nouvel export de la source de production active et le conserver sous un nom horodaté dans un emplacement privé ignoré par Git ;
2. lancer l'importeur sans `--execute` et sans aucun indicateur de confirmation ;
3. comparer uniquement les compteurs avec le précédent lot historique de 31 lignes ;
4. examiner les signaux de doublon sans fusion automatique ;
5. valider ou collecter les dates de naissance manquantes par le workflow privé documenté ;
6. répéter le dry-run ;
7. planifier ultérieurement un import contrôlé, après sauvegarde et validation humaine.

Aucune donnée candidat ne doit être copiée dans un ticket, un log ou une documentation.

## Campagne historique séparée

Les nouvelles inscriptions créent leur propre confirmation automatiquement. Les anciennes inscriptions passent uniquement par `scripts/send-existing-confirmations.ts`, après import et validation. Le script sélectionne les téléphones valides et les travaux `pending`/`retry_scheduled`, ce qui exclut les confirmations réussies, les numéros invalides et les travaux `suppressed`. La clé unique garantit la seconde exécution sans doublon.

Dry-run uniquement :

```bash
npm run messages:confirmations -- --limit=10
```

Le mode réel existe mais exige simultanément `--execute`, `--confirm-send`, une configuration complète et `MESSAGING_ENABLED=true`. Il ne doit être utilisé qu'après validation opérationnelle.

## Administration et audit

Le tableau de bord expose uniquement des compteurs anonymisés : pending, processing, accepted, sent, delivered, failed/undelivered, suppressed et retry scheduled. La route protégée `POST /api/admin/messages/{id}/retry` est réservée aux rôles de messagerie ; elle ne remet en file que les erreurs temporaires éligibles et écrit `preselection_confirmation_manual_retry` dans l'audit.

Les événements techniques sont : `preselection_confirmation_queued`, `preselection_confirmation_dispatched`, `preselection_confirmation_failed`, `preselection_confirmation_retried`, `preselection_confirmation_suppressed` et `preselection_confirmation_manual_retry`.

## Vérifications avant production

- sauvegarde PostgreSQL et plan de retour arrière validés ;
- migration 0005 relue puis appliquée dans l'environnement prévu ;
- secrets absents de Git et configurés dans l'hébergeur ;
- signature du callback vérifiée avec l'URL canonique exacte ;
- route interne inaccessible sans secret ;
- fournisseur simulé, tests, lint, TypeScript et build verts ;
- monitoring des volumes `pending`, `retry_scheduled`, `failed` et `suppressed` ;
- aucun lancement de campagne historique depuis le flux d'inscription.
