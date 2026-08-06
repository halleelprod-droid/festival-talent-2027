# Runbook d'import des présélections

## Statut actuel

L'organisation annonce 36 inscriptions, mais aucun export complet et récent de
36 lignes n'est présent localement au 22 juillet 2026. L'ancien export de 31
inscriptions ne doit pas être importé. La décision actuelle est donc **no-go**.

## Phases obligatoires

1. **Dry-run** : contrôler le format, les compteurs, les dates, les disciplines et
   les doublons sans aucune écriture.
2. **Import local de test** : seulement vers `festival_talent_test`, après un dump
   custom non vide et après validation humaine de la source et des doublons.
3. **Production future** : procédure distincte, autorisation humaine écrite et
   sauvegarde vérifiée. Cette phase est hors périmètre de l'audit local.

## Conditions go/no-go

Toutes les conditions suivantes sont obligatoires : source complète et fiable,
total confirmé, mapping validé, date de naissance présente pour chaque ligne
importable, discipline connue, doublons classés, cible triple-vérifiée sur
`localhost/festival_talent_test`, sauvegarde réussie et `MESSAGING_ENABLED=false`.

Un import doit être transactionnel, idempotent via `source + source_id`, audité,
sans suppression, sans fusion automatique et sans création automatique d'une
discipline inconnue. Les confirmations éventuelles restent `suppressed`; aucun
SMS ni appel Twilio n'est permis. Après import, le même fichier est relancé en
dry-run : zéro insertion nouvelle est exigée. Sinon, arrêt et restauration du
dump dans `festival_talent_restore_test` pour diagnostic.

## Rollback

Ne jamais restaurer sur `festival_talent_dev` ou `festival_talent_test` sans
confirmation explicite. Tester le dump dans `festival_talent_restore_test`, puis
vérifier les 12 tables, les 6 migrations, `date_of_birth`, l'absence de colonne
`age` et les droits des rôles.

Les règles d'âge 2027-01-01, 6–100 sont techniques et provisoires. Elles ne sont
pas un règlement officiel et ne doivent jamais servir à supprimer une inscription.
