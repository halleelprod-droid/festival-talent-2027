# Messagerie des présélections

Les confirmations sont désormais gérées par `src/services/messaging`. Une inscription valide crée un journal `queued` après validation transactionnelle. Le traitement est séparé de la transaction d’inscription et reste désactivé tant que `MESSAGING_ENABLED` n’est pas exactement `true`.

La commande historique est sécurisée par défaut :

```bash
npm run messages:confirmations -- --dry-run --limit=10
npm run messages:confirmations -- --execute --limit=10 --confirm-send
```

Le second mode exige aussi une configuration Twilio complète et `MESSAGING_ENABLED=true`. La route interne `POST /api/internal/messages/preselection-confirmation` exige `x-internal-secret`. Les erreurs enregistrées ne contiennent pas de numéro complet.
