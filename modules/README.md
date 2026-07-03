# Modules

V7 introduit une architecture modulaire progressive. Les routes existantes restent dans `app/` pour eviter un refactor brutal, mais les nouveaux domaines doivent converger vers cette structure.

Chaque module est organise ainsi :

- `components/` : UI specifique au domaine.
- `hooks/` : hooks client du domaine, uniquement si necessaires.
- `services/` : orchestration et acces donnees cote serveur ou statique.
- `types/` : types propres au domaine.
- `data/` : donnees statiques du domaine.
- `utils/` : helpers purs.

Les deplacements depuis `app/` et `components/home/` doivent etre faits par petites PRs avec `npm run lint` et `npm run build` verts.
