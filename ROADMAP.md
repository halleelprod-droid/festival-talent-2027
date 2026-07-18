# Roadmap produit — Festival Talent 2027 → 2030

Vision : passer d'un site événementiel à la **plateforme culturelle de référence en Afrique de l'Ouest**, capable de porter chaque édition annuelle sans réécriture. La roadmap technique détaillée (phases, dépendances) vit dans [ARCHITECTURE.md](ARCHITECTURE.md) ; ce document donne la trajectoire produit.

## Versioning

- **v3** — site vitrine initial (sections home et premier formulaire de pré-sélections).
- **v4** *(livrée, 2026-07)* — activation premium : chrome global, design system (fondations), newsletter réelle, compteur live, carte Mapbox, typographie Inter/Anton, perf (bundle −1,9 Mo), A11y ciblée, tests scaffoldés, docs. Détail dans [CHANGELOG.md](CHANGELOG.md).
- **v5** *(en cours de cadrage)* — voir "Édition 2027" ci-dessous.
- **v6+** — plateforme multi-éditions.

## Édition 2027 (v5) — avant janvier 2027

Priorités produit, dans l'ordre :
1. **Migration Design System complète** (~20 sections restantes) + narration home intentionnelle (découverte → vision → fondatrice → battles → pré-sélections → activités → programme → artistes → staff → partenaires → inscription → gratitude).
2. **A11y WCAG AA bout en bout** (clavier, focus, formulaires) — condition de crédibilité institutionnelle (UE partenaire majeur).
3. **SEO international** : JSON-LD par page, breadcrumbs, requêtes cibles ("Festival Talent Sénégal", "Battle Dance Sénégal", "Festival culture Afrique").
4. **Sécurité** : bump Next.js (vulnérabilité high connue), audit RLS, validation Zod des inputs API.
5. **Multilingue FR/EN/IT** (next-intl, fichiers `messages/` déjà prêts) — puis ES.
6. **Pages activité enrichies** (programme, galerie, FAQ par activité : Battle, Karting, Jet Ski, Fashion, Musique, Influence, Lutte, Italie).

## Édition 2028 (v6)

- **Architecture multi-éditions** : les contenus 2027 (artistes, programme, partenaires) deviennent des données datées ; une édition = une configuration, pas un fork du code. C'est LA condition du "sans réécriture jusqu'en 2035".
- **Dashboard admin** (validation candidatures, gestion partenaires/artistes/programme) — Auth.js v5 et rôles PostgreSQL en place, extensions métier à poursuivre.
- **Billetterie réelle** : tickets, QR codes, paiement (prestataire à choisir : Wave/Orange Money indispensables pour le marché sénégalais, + carte internationale), contrôle d'accès.
- **Portail partenaires** (espace privé, stats de visibilité).

## Édition 2029 (v7)

- **API publique** (couche services + endpoints REST) → **application mobile compagnon** (React Native/Flutter) : programme personnel, notifications, billets.
- **Centre média** : espace presse, kits téléchargeables, galeries par édition.
- **Espace candidat** : suivi de candidature, documents, notifications.

## Édition 2030 (v8)

- **Recherche & recommandation IA** (FAQ intelligente, recherche artistes/activités) — dépend du contenu structuré des phases précédentes.
- **Statistiques temps réel publiques** (billets, inscriptions par région, audience).
- **Archives vivantes** : chaque édition passée reste navigable (2027, 2028, 2029...).

## Principes de arbitrage (dans l'ordre)

1. Ne jamais casser une édition en cours pour préparer la suivante.
2. Chaque fonctionnalité doit servir un utilisateur identifiable (candidat, visiteur, partenaire, équipe) — pas de feature "vitrine technique".
3. Infrastructure avant fonctionnalité : multi-éditions (v6) avant app mobile (v7), contenu structuré avant IA (v8).
