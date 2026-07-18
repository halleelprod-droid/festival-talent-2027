# Enterprise Architecture

## Analytics

Preparer une couche centrale capable de recevoir :

- Google Analytics
- Matomo
- Plausible
- clics CTA
- conversions
- telechargements
- inscriptions

Les composants ne doivent pas appeler directement les fournisseurs. Ils doivent passer par un service analytics.

## Notifications

Canaux cibles :

- email
- WhatsApp
- SMS
- push

Les notifications doivent etre declenchees par des evenements metier, pas par des composants UI.

## Intelligence Artificielle

Assistants prevus :

- candidat
- partenaire
- media
- FAQ IA
- recherche intelligente
- orientation automatique

Les assistants ne doivent jamais recevoir de donnees privees sans consentement, role et journalisation.

## Mobile et Offline

Le code doit rester compatible avec :

- React Native
- Flutter
- PWA
- service worker
- cache offline
- synchronisation future

Les modules doivent donc isoler la logique metier des composants Next.js.

## Securite

Fondations attendues :

- RBAC
- permissions
- roles
- audit logs
- validation
- rate limiting
- rôles Auth.js et autorisations côté serveur
- accès PostgreSQL uniquement côté serveur

## Cloud

Preparer :

- CDN
- storage images
- storage videos
- streaming
- cache edge
- optimisation media
