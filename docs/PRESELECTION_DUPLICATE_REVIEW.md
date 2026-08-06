# Revue des doublons de présélections

Les doublons sont des signaux de revue, jamais une autorisation de fusion ou de
suppression automatique.

## Classes

- **Exact** : même `source_id`, ou empreinte identique de tous les identifiants
  principaux normalisés.
- **Fort** : même téléphone, même e-mail, nom+téléphone ou nom+e-mail.
- **Potentiel** : variation orthographique du nom, contact partiellement proche
  ou autre similarité nécessitant une décision humaine.

## Décisions humaines autorisées

`keep_first`, `keep_latest`, `merge_manually`, `distinct_people`,
`invalid_duplicate`, `unresolved`.

Chaque décision doit être auditée avec les identifiants techniques, le type de
signal, la décision et l'horodatage. Les rapports Git restent anonymisés. Le CSV
privé de revue reste sous `C:\FestivalTalentData\exports-private`, n'est jamais
affiché et n'est jamais ajouté à Git.
