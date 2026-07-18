# Authentification administrateur

L’administration utilise Auth.js avec sessions JWT sécurisées côté serveur. Les comptes applicatifs et rôles vivent dans `admin_users`; les empreintes bcrypt sont isolées dans `admin_credentials`. Il n’existe aucune inscription publique.

```bash
ADMIN_PASSWORD='mot-de-passe-long' npm run admin:create -- --email=admin@example.org --name='Nom Admin' --role=super_admin
```

Les routes `/admin` et `/api/admin/*` sont protégées par `proxy.ts`, et chaque route sensible refait un contrôle serveur de session et de rôle.


> **Modèle candidat** : `date_of_birth` remplace `age` (source de vérité ; âge calculé dynamiquement, aucune date fabriquée). Détails dans [DATABASE.md](../DATABASE.md#date-de-naissance-remplace-lâge).
