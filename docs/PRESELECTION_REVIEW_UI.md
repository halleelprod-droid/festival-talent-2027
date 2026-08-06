# Interface locale de revue des présélections

Outil **local et privé** pour terminer la revue humaine des inscriptions sans
éditer les CSV à la main. Il ne se déploie pas, ne s'expose pas, n'utilise aucun
service distant, n'envoie aucun SMS et ne lance aucun import.

> ⚠️ Cet outil lit et écrit un fichier contenant des données personnelles. Il ne
> fonctionne que sur `127.0.0.1`, refuse la production, et ne journalise jamais
> de donnée personnelle. Les fichiers restent hors dépôt.

## Démarrage

1. Renseigner le chemin du fichier maître dans `.env.local` (ignoré par Git) :

   ```
   PRESELECTION_REVIEW_FILE=C:\FestivalTalentData\exports-private\preselections-human-review-2026-07-22.csv
   # Facultatif (pour import-ready) :
   PRESELECTION_SOURCE_FILE=C:\FestivalTalentData\exports-private\supabase-preselections-full-2026-07-22_04-46.csv
   ```

   Ne jamais mettre ce chemin dans un fichier suivi. `.env.example` ne contient
   que les clés vides.

2. Lancer le serveur local :

   ```bash
   npm run preselections:review-ui
   ```

   Le terminal n'affiche que : l'URL locale, le nombre total, le nom du fichier.
   Aucun secret, aucune donnée personnelle.

3. Ouvrir dans le navigateur : **http://127.0.0.1:4317**

Vérification rapide sans démarrer le serveur (compteurs seulement) :

```bash
npm run preselections:review-ui:check
```

## Sécurité

- Écoute uniquement sur `127.0.0.1:4317` ; refuse tout `Host`/`Origin` non local.
- Refuse `NODE_ENV=production` et les environnements Vercel.
- En-têtes : CSP stricte (aucun script/police/CDN distant), `X-Frame-Options: DENY`,
  `Referrer-Policy: no-referrer`, `Cache-Control: no-store`, `X-Content-Type-Options: nosniff`.
- Un **jeton éphémère** en mémoire est requis pour toute écriture ; il disparaît à
  l'arrêt du serveur, n'est jamais écrit dans Git ni dans le navigateur (mémoire JS
  uniquement).
- Aucune donnée n'est stockée dans `localStorage`/`sessionStorage` : tout est
  persisté dans le fichier local à chaque action.
- Aucune télémétrie, aucun appel réseau externe.

## Saisie de la date de naissance

- Champ `date_of_birth` au format `YYYY-MM-DD`, saisi depuis une source vérifiée.
- Contrôles affichés : âge recalculé au 2027-01-01, âge historique, écart,
  avertissements (date impossible, future, hors bornes 6–100, règle du 29 février).
- **Écart d'âge** > 1 an : avertissement `age_mismatch`, note humaine requise,
  approbation explicite nécessaire. La DOB n'est **jamais** corrigée automatiquement
  ni dérivée de l'âge.
- Actions : Enregistrer et suivant · Enregistrer · Mettre en attente · Rejeter ·
  Précédent.

## Téléphones

Statuts : `confirmed_valid`, `corrected` (numéro valide requis), `unreachable`,
`invalid`, `needs_contact`. `invalid`/`needs_contact` bloquent l'import. Aucune
correction automatique n'est considérée comme vérité.

## Doublons

Onglet **Doublons** : chaque groupe est affiché côte à côte avec la date de
création et le signal. Décisions : `same_person_keep_oldest`,
`same_person_keep_latest`, `same_person_merge_manually`, `distinct_people`,
`invalid_duplicate`, `unresolved`. La décision de groupe est appliquée par ligne
(la ligne conservée est approuvée, les autres rejetées ; une fusion manuelle met
en attente). Les lignes du CSV source ne sont **jamais** supprimées. Aucune
fusion automatique.

## Mode « À contacter »

Liste les candidats à contacter (DOB manquante, téléphone `needs_contact`, ou
décision manquante). Boutons **Copier le numéro** et **Copier le message** (modèle
opérationnel). Aucun envoi, aucune API SMS, aucun lien Twilio, aucun consentement
marketing présumé.

## Import de réponses manuelles

Onglet **Import réponses** : coller un CSV `review_id,date_of_birth,phone_corrected,
review_notes`. La clé est **obligatoirement `review_id`** (jamais nom ni téléphone).
Un aperçu affiche les compteurs (applicables, inconnus, DOB invalides, tél
invalides) avant confirmation locale.

## Sauvegardes

À chaque action : contrôle de version (SHA-256, refus d'écrasement concurrent),
sauvegarde horodatée dans `C:\FestivalTalentData\exports-private\review-backups`
(20 dernières conservées), écriture atomique (fichier temporaire puis renommage).
L'export Supabase original n'est jamais supprimé. Seul « Sauvegarde réussie »
s'affiche ; jamais le contenu.

### Récupération depuis une sauvegarde

Fermer le serveur, copier le backup souhaité
(`preselections-human-review-YYYY-MM-DD_HH-mm-ss.csv`) depuis `review-backups`
par-dessus le fichier maître, puis relancer l'interface.

## Validation & import-ready

Onglet **Validation** : « Valider la revue » exécute la même logique que
`npm run preselections:validate-review` et affiche uniquement des compteurs
(`pendingDob`, `validDob`, `ageMismatch`, `phoneUnresolved`, `duplicatePending`,
`approved`, `rejected`, `hold`, `ready`, `blocked`, `unresolved`).

« Générer le fichier import-ready » reste désactivé tant que `unresolved > 0`,
`pendingDob > 0`, `phoneUnresolved > 0`, `duplicatePending > 0`, ou `ready = 0`.
Une fois tout résolu, le CSV import-ready et son summary (SHA-256) sont créés hors
Git. **Aucun import n'est lancé.**

## Arrêt

`Ctrl + C` dans le terminal. Le jeton éphémère est détruit.

## Tests

```bash
npm test                              # tests unitaires (lib pure)
npm run preselections:review-ui:e2e   # Playwright, fixtures SYNTHÉTIQUES uniquement
```

Les tests Playwright n'utilisent jamais le vrai CSV : ils écrivent des fixtures
synthétiques dans un dossier temporaire.

## Rappels

- Ne pas déployer, ne pas exposer sur Internet, ne pas ajouter au site public.
- Aucune donnée privée dans Git (CSV, exports, backups, réponses restent hors dépôt).
