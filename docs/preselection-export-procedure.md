# Procédure d'export actualisé des présélections (36 inscriptions annoncées)

> Statut vérifié le 22 juillet 2026 : **CAS C — aucun nouvel export complet disponible**.
> Le dossier `C:\FestivalTalentData\exports-private\` est vide. La seule source
> candidate présente localement est l'ancien export de revue (31 lignes de données),
> qui **ne doit pas** servir de source actuelle. Aucun import ni dry-run réel n'a été
> exécuté. L'audit candidat reste **en attente du fichier source**.

Ce document décrit la procédure exacte pour produire l'export complet et contrôlé,
sans jamais committer de données personnelles.

## 1. Fichier attendu (hors Git)

```
C:\FestivalTalentData\exports-private\preselections-full-YYYY-MM-DD.csv
```

- Une ligne par inscription (en-tête + N lignes de données).
- Ne mettre `36` dans le nom **que si** le fichier contient exactement 36 inscriptions.
- Ne jamais committer ce fichier (voir `.gitignore`).

## 2. Colonnes requises

Format attendu par `scripts/import-preselections.ts` (via `src/import/preselections`) :

| Colonne | Notes |
|---|---|
| `legacyId` / identifiant source | déduplication + `onConflictDoNothing` |
| `createdAt` (date de création) | ISO |
| `fullName` (nom complet) | |
| `phoneRaw` (téléphone) | normalisé + validé à l'import |
| `email` | |
| `city` (ville) | |
| `discipline` | mappée vers `disciplines.slug` |
| `dateOfBirth` (`YYYY-MM-DD`) | si disponible ; sinon → revue humaine |
| consentements | |
| statut | |

**Ne pas exporter** : secrets, hashes, tokens, mots de passe, logs techniques.

## 3. Métadonnées non nominatives (hors Git)

```
C:\FestivalTalentData\exports-private\preselections-full-YYYY-MM-DD.summary.json
```

Contenu autorisé uniquement : date d'export, nombre de lignes, liste des colonnes,
source, empreinte SHA-256 du CSV. **Aucune** donnée candidat.

Empreinte :

```powershell
Get-FileHash -Algorithm SHA256 "C:\FestivalTalentData\exports-private\preselections-full-YYYY-MM-DD.csv"
```

## 4. Export PostgreSQL local en lecture seule

Vérifier d'abord le total sans créer de fichier :

```powershell
npm run export:preselections -- --dry-run
```

Créer ensuite un export privé uniquement si la base locale est la source humaine validée :

```powershell
npm run export:preselections -- --output C:\FestivalTalentData\exports-private\preselections-full-YYYY-MM-DD.csv
```

Le script refuse par défaut les hôtes non locaux, les destinations situées dans le
dépôt et l'écrasement d'un fichier existant. Il ouvre une session PostgreSQL en
lecture seule, ferme toujours la connexion et n'affiche que les compteurs, chemins
et empreintes. Le drapeau `--allow-remote` existe pour une procédure future avec
autorisation explicite ; il est interdit dans l'audit courant.

## 5. Dry-run de la source (aucune écriture)

Une fois l'export réel présent, exécuter **uniquement** un dry-run local
(statistiques anonymisées, aucune insertion/modification/suppression, aucun SMS) :

```
npm run import:preselections -- --file=C:\FestivalTalentData\exports-private\preselections-full-YYYY-MM-DD.csv --dry-run
```

> Le script existant n'imprime jamais les données sensibles (fullName, téléphone,
> email, date de naissance) dans le terminal.

## 6. Règles bloquantes (rappel)

- Date de naissance manquante → **bloquer l'import**, créer une ligne de revue humaine ;
  ne jamais dériver la date depuis un âge, ne jamais inventer jour/mois, ne jamais
  stocker un âge à la place (la colonne `age` persistée ne doit pas réapparaître).
- Doublons potentiels (téléphone / email / nom / nom+téléphone / nom+email / id source)
  → marqués pour revue, **jamais** fusionnés automatiquement.
- Règles d'âge provisoires **non officielles** : réf. 2027-01-01, min 6, max 100,
  29 févr. → 1er mars en année non bissextile. Ne pas les modifier ni les déclarer
  officielles.

## 7. Critères « prêt à importer » (tous requis)

- [ ] Nouvel export complet présent et son total vérifié.
- [ ] Doublons traités (revue humaine).
- [ ] Dates de naissance obligatoires présentes ou résolues officiellement.
- [ ] Dry-run sans erreur bloquante.

Tant que ces cases ne sont pas cochées, **aucun import réel**.
