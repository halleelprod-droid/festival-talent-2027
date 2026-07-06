# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tickets.spec.ts >> tickets page clearly states no real payment is connected
- Location: e2e\tickets.spec.ts:26:5

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText(/QR Code officiel sera généré/i).first()
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByText(/QR Code officiel sera généré/i).first()

```

```yaml
- link "Instagram":
  - /url: https://instagram.com
- link "TikTok":
  - /url: https://tiktok.com
- link "YouTube":
  - /url: https://youtube.com
- link "Facebook":
  - /url: https://facebook.com
- button
- banner:
  - link "FT2027":
    - /url: /
  - navigation:
    - link "Accueil":
      - /url: /fr
    - link "Programme":
      - /url: /programme
    - link "Activités":
      - /url: /activites
    - link "Pré-sélections":
      - /url: /preselections
    - link "Artistes":
      - /url: /artists
    - link "Partenaires":
      - /url: /partners
    - button "Plus"
  - link "Réserver":
    - /url: /tickets
    - button "Réserver"
- main:
  - text: Experience officielle
  - heading "Festival Talent Tickets" [level=1]
  - paragraph: Reservez votre experience officielle Festival Talent 2027.
  - paragraph: Ici, le visiteur ne choisit pas seulement un billet. Il choisit un niveau d'experience, un acces, une emotion et une place dans l'histoire Festival Talent.
  - link "Reserver mon Pass":
    - /url: "#passes"
  - link "Decouvrir les Pass":
    - /url: "#comparatif"
  - text: Simulation securisee
  - paragraph: "Billetterie preparatoire : experience simulee, sans paiement reel, sans QR Code reel et sans transaction."
  - text: Ouverture prochaine
  - paragraph: Les tarifs, dates de vente et conditions seront annonces par les canaux officiels.
  - paragraph: Pass officiels
  - heading "Une experience pour chaque role" [level=2]
  - paragraph: Les pass sont prepares comme des niveaux d'experience. Ils ne sont pas encore vendus et ne declenchent aucune transaction.
  - article:
    - text: Bientot disponible
    - paragraph: Experience officielle
    - heading "Pass Standard" [level=3]
    - paragraph: Pour vivre Festival Talent 2027 avec un acces clair aux grands moments publics.
    - list:
      - listitem: Acces Festival
      - listitem: Concert
      - listitem: Village
      - listitem: Programme officiel
    - link "Reserver mon Pass":
      - /url: "#processus"
  - article:
    - text: Bientot disponible
    - paragraph: Confort renforce
    - heading "Pass Premium" [level=3]
    - paragraph: Pour profiter d'une experience plus fluide, plus confortable et plus proche des temps forts.
    - list:
      - listitem: Zone Premium
      - listitem: Acces rapide
      - listitem: Goodies
      - listitem: Support prioritaire
    - link "Decouvrir le Premium":
      - /url: "#processus"
  - article:
    - text: Sur demande
    - paragraph: Experience prestige
    - heading "Pass VIP" [level=3]
    - paragraph: Pour les invites, leaders, entrepreneurs et profils qui veulent vivre l'evenement au plus haut niveau.
    - list:
      - listitem: Lounge
      - listitem: Cocktail
      - listitem: Rencontre artistes
      - listitem: Parking
    - link "Demander l'acces VIP":
      - /url: "#processus"
  - article:
    - text: Sur demande
    - paragraph: Mission & impact
    - heading "Pass Partenaire" [level=3]
    - paragraph: Pour les partenaires qui rejoignent Festival Talent comme une mission, pas comme un simple evenement.
    - list:
      - listitem: Accueil dedie
      - listitem: Networking
      - listitem: Visibilite
      - listitem: Acces institutionnel
    - link "Contacter l'equipe":
      - /url: "#processus"
  - article:
    - text: Sur demande
    - paragraph: Media officiel
    - heading "Pass Presse" [level=3]
    - paragraph: Pour les journalistes, medias et createurs accredites par l'organisation.
    - list:
      - listitem: Accreditation
      - listitem: Zone media
      - listitem: Kit presse
      - listitem: Support interviews
    - link "Demander une accreditation":
      - /url: "#processus"
  - article:
    - text: Reserve
    - paragraph: Equipe Festival Talent
    - heading "Pass Staff" [level=3]
    - paragraph: Pour les equipes operationnelles, techniques, production et organisation.
    - list:
      - listitem: Acces equipe
      - listitem: Zones operationnelles
      - listitem: Support
      - listitem: Identification
    - link "Acces reserve":
      - /url: /contact
  - article:
    - text: Reserve
    - paragraph: Scene & production
    - heading "Pass Artiste" [level=3]
    - paragraph: Pour les artistes, talents programmes et profils valides par la production.
    - list:
      - listitem: Acces artiste
      - listitem: Backstage encadre
      - listitem: Production
      - listitem: Accueil dedie
    - link "Acces production":
      - /url: /contact
  - article:
    - text: Reserve
    - paragraph: Acces ultra limite
    - heading "Pass Backstage" [level=3]
    - paragraph: Pour les profils autorises uniquement par l'organisation et la production officielle.
    - list:
      - listitem: Backstage
      - listitem: Acces controle
      - listitem: Brief securite
      - listitem: Validation manuelle
    - link "Sur invitation":
      - /url: /contact
  - paragraph: Comparatif
  - heading "Choisir le bon niveau d'experience" [level=2]
  - paragraph: Ce tableau est une maquette preparatoire. Les avantages finaux seront confirmes avant l'ouverture officielle.
  - table "Comparatif des Pass Standard, Premium et VIP.":
    - caption: Comparatif des Pass Standard, Premium et VIP.
    - rowgroup:
      - row "Avantage Standard Premium VIP":
        - columnheader "Avantage"
        - columnheader "Standard"
        - columnheader "Premium"
        - columnheader "VIP"
    - rowgroup:
      - row "Acces Festival Inclus Inclus Inclus":
        - rowheader "Acces Festival"
        - cell "Inclus":
          - img "Inclus"
        - cell "Inclus":
          - img "Inclus"
        - cell "Inclus":
          - img "Inclus"
      - row "Concert Inclus Inclus Inclus":
        - rowheader "Concert"
        - cell "Inclus":
          - img "Inclus"
        - cell "Inclus":
          - img "Inclus"
        - cell "Inclus":
          - img "Inclus"
      - row "Village Inclus Inclus Inclus":
        - rowheader "Village"
        - cell "Inclus":
          - img "Inclus"
        - cell "Inclus":
          - img "Inclus"
        - cell "Inclus":
          - img "Inclus"
      - row "Zone Premium Non inclus Inclus Inclus":
        - rowheader "Zone Premium"
        - cell "Non inclus":
          - img "Non inclus"
        - cell "Inclus":
          - img "Inclus"
        - cell "Inclus":
          - img "Inclus"
      - row "Lounge Non inclus Non inclus Inclus":
        - rowheader "Lounge"
        - cell "Non inclus":
          - img "Non inclus"
        - cell "Non inclus":
          - img "Non inclus"
        - cell "Inclus":
          - img "Inclus"
      - row "Cocktail Non inclus Non inclus Inclus":
        - rowheader "Cocktail"
        - cell "Non inclus":
          - img "Non inclus"
        - cell "Non inclus":
          - img "Non inclus"
        - cell "Inclus":
          - img "Inclus"
      - row "Rencontre artistes Non inclus Non inclus Inclus":
        - rowheader "Rencontre artistes"
        - cell "Non inclus":
          - img "Non inclus"
        - cell "Non inclus":
          - img "Non inclus"
        - cell "Inclus":
          - img "Inclus"
      - row "Parking Non inclus Non inclus Inclus":
        - rowheader "Parking"
        - cell "Non inclus":
          - img "Non inclus"
        - cell "Non inclus":
          - img "Non inclus"
        - cell "Inclus":
          - img "Inclus"
      - row "Acces rapide Non inclus Inclus Inclus":
        - rowheader "Acces rapide"
        - cell "Non inclus":
          - img "Non inclus"
        - cell "Inclus":
          - img "Inclus"
        - cell "Inclus":
          - img "Inclus"
      - row "Goodies Non inclus Inclus Inclus":
        - rowheader "Goodies"
        - cell "Non inclus":
          - img "Non inclus"
        - cell "Inclus":
          - img "Inclus"
        - cell "Inclus":
          - img "Inclus"
  - paragraph: Processus simule
  - heading "De la selection au billet electronique" [level=2]
  - paragraph: Le parcours est prepare pour la future billetterie. Cette version ne collecte pas d'information, ne facture pas et ne genere aucun billet.
  - article:
    - text: "1"
    - heading "Choix du Pass" [level=3]
    - paragraph: Le visiteur compare les experiences et choisit le niveau adapte.
  - article:
    - text: "2"
    - heading "Informations" [level=3]
    - paragraph: Les informations seront collectees uniquement quand la billetterie sera ouverte.
  - article:
    - text: "3"
    - heading "Paiement (simulation)" [level=3]
    - paragraph: Aucun paiement n'est connecte dans cette version preparatoire.
  - article:
    - text: "4"
    - heading "Confirmation" [level=3]
    - paragraph: La confirmation officielle sera envoyee apres validation du futur systeme.
  - article:
    - text: "5"
    - heading "Billet electronique" [level=3]
    - paragraph: Le billet numerique sera genere uniquement dans la phase contractuelle paiement.
  - paragraph: Paiements prepares
  - heading "Aucun paiement n'est connecte" [level=2]
  - paragraph: Wave, Orange Money, Free Money, carte bancaire et wallets sont affiches uniquement comme architecture future. Aucune transaction n'est possible dans cette version.
  - heading "Wave" [level=3]
  - paragraph: Bientot
  - heading "Orange Money" [level=3]
  - paragraph: Bientot
  - heading "Free Money" [level=3]
  - paragraph: Bientot
  - heading "Carte Bancaire" [level=3]
  - paragraph: Bientot
  - heading "Stripe" [level=3]
  - paragraph: Prevu
  - heading "PayPal" [level=3]
  - paragraph: Prevu
  - heading "Apple Pay" [level=3]
  - paragraph: Prevu
  - heading "Google Pay" [level=3]
  - paragraph: Prevu
  - paragraph: Billet electronique
  - heading "Une preview premium, pas un vrai billet" [level=2]
  - paragraph: Le visuel ci-contre prepare l'experience Apple Wallet / Google Wallet et le controle d'acces futur. Il ne contient aucun QR Code reel et ne donne aucun droit d'entree.
  - paragraph: Festival Talent 2027
  - heading "Pass Premium" [level=3]
  - paragraph: Experience officielle
  - paragraph: "Statut : Simulation"
  - paragraph: "Edition : 2027"
  - paragraph: "Canal : Officiel"
  - paragraph: Le QR Code officiel sera genere apres l'ouverture de la billetterie.
  - paragraph: Compte utilisateur
  - heading "Maquettes uniquement" [level=2]
  - paragraph: Aucun espace personnel n'est active aujourd'hui. Ces blocs preparent l'architecture future sans authentification reelle.
  - heading "Mes billets" [level=3]
  - paragraph: Lister les futurs pass et leurs statuts.
  - heading "Historique" [level=3]
  - paragraph: Afficher les actions liees aux reservations futures.
  - heading "Factures" [level=3]
  - paragraph: Preparer les recus lorsque la facturation sera active.
  - heading "Telechargements" [level=3]
  - paragraph: Regrouper billets, justificatifs et documents.
  - heading "Wallet" [level=3]
  - paragraph: Preparer Apple Wallet et Google Wallet.
  - heading "Support" [level=3]
  - paragraph: Centraliser l'aide billetterie et les demandes.
  - paragraph: FAQ
  - heading "Questions essentielles" [level=2]
  - group: Puis-je transferer mon billet ?
  - group: Puis-je etre rembourse ?
  - group: Le billet est-il nominatif ?
  - group: Comment fonctionne le QR Code ?
  - group: Quels paiements seront disponibles ?
  - paragraph: Architecture future
  - heading "Pret a connecter, pas encore connecte" [level=2]
  - paragraph: La phase suivante devra etre contractualisee, auditee et securisee avant toute integration paiement, QR Code, PDF, emails ou wallet.
  - heading "QR Code" [level=3]
  - paragraph: Generation unique, signature serveur, expiration et controle anti-fraude.
  - paragraph: Risque eleve
  - heading "Validation & Scanner" [level=3]
  - paragraph: Application de scan, mode offline controle, synchronisation et audit logs.
  - paragraph: Risque eleve
  - heading "Paiement" [level=3]
  - paragraph: Prestataires locaux et internationaux connectes uniquement via contrat dedie.
  - paragraph: Risque eleve
  - heading "PDF" [level=3]
  - paragraph: Generation serveur des billets et recus avec stockage securise.
  - paragraph: Risque moyen
  - heading "Emails & Notifications" [level=3]
  - paragraph: Confirmation, rappel, support et alertes operationnelles centralisees.
  - paragraph: Risque moyen
  - heading "Wallet Apple / Google" [level=3]
  - paragraph: Pass numeriques signes, versionnes et compatibles mobile.
  - paragraph: Risque moyen
  - paragraph: Garde-fous de securite
  - heading "Billetterie non active" [level=2]
  - list:
    - listitem: Aucun paiement reel n'est connecte.
    - listitem: Aucun QR Code reel n'est genere.
    - listitem: Aucune transaction n'est effectuee.
    - listitem: Aucun billet PDF reel n'est emis.
    - listitem: Aucune donnee ticketing n'est stockee dans Supabase.
- contentinfo:
  - link "FT2027":
    - /url: /
    - heading "FT2027" [level=2]
  - paragraph: Festival Talent 2027 réunit musique, mode, culture, innovation et jeunesse dans une expérience immersive internationale.
  - paragraph: Navigation
  - link "Festival Talent OS":
    - /url: /os
  - link "Actualités":
    - /url: /news
  - link "Communauté":
    - /url: /communaute
  - link "Opportunités":
    - /url: /opportunites
  - link "Mentors & Coachs":
    - /url: /mentors
  - link "Équipe":
    - /url: /team
  - link "Espace candidat":
    - /url: /candidat
  - link "Statistiques":
    - /url: /stats
  - link "Contact":
    - /url: /contact
  - link "Activités":
    - /url: /activites
  - link "Pré-sélections":
    - /url: /preselections
  - link "Programme":
    - /url: /programme
  - link "Artistes":
    - /url: /artists
  - link "Partenaires":
    - /url: /partners
  - paragraph: Partenaires
  - paragraph: Union Européenne - Partenaire Officiel Majeur
  - paragraph: Sen Influenceurs - Partenaire Média & Influence Officiel
  - paragraph: PIN EVENTS - Partenaire Événementiel, Production & Relations Institutionnelles
  - paragraph: Val2Events - Partenaire associé
  - paragraph: Socials
  - link "Instagram":
    - /url: https://instagram.com
  - link "TikTok":
    - /url: https://tiktok.com
  - link "YouTube":
    - /url: https://youtube.com
  - link "Facebook":
    - /url: https://facebook.com
  - paragraph: Plateforme
  - link "Festival Talent OS":
    - /url: /os
  - link "Billetterie future":
    - /url: /billetterie
  - link "Festival TV":
    - /url: /tv
  - link "Académie":
    - /url: /academie
  - link "Portail partenaires":
    - /url: /portail-partenaires
  - link "Application mobile":
    - /url: /mobile
  - link "IA Festival Talent":
    - /url: /ia
  - paragraph: © 2027 Festival Talent. All rights reserved.
  - paragraph: Paris - Rome - Europe
  - link "Admin":
    - /url: /admin
- alert
```

# Test source

```ts
  1  | import { expect, test } from "@playwright/test";
  2  | 
  3  | const passNames = [
  4  |   "Pass Standard",
  5  |   "Pass Premium",
  6  |   "Pass VIP",
  7  |   "Pass Partenaire",
  8  |   "Pass Presse",
  9  |   "Pass Staff",
  10 |   "Pass Artiste",
  11 |   "Pass Backstage",
  12 | ];
  13 | 
  14 | test("tickets page renders hero and the 8 passes", async ({ page }) => {
  15 |   await page.goto("/tickets");
  16 | 
  17 |   await expect(page.getByRole("heading", { level: 1 })).toContainText(
  18 |     /tickets/i
  19 |   );
  20 | 
  21 |   for (const name of passNames) {
  22 |     await expect(page.getByText(name).first()).toBeVisible();
  23 |   }
  24 | });
  25 | 
  26 | test("tickets page clearly states no real payment is connected", async ({
  27 |   page,
  28 | }) => {
  29 |   await page.goto("/tickets");
  30 | 
  31 |   await expect(page.getByText(/aucun paiement/i).first()).toBeVisible();
  32 |   await expect(
  33 |     page.getByText(/QR Code officiel sera généré/i).first()
> 34 |   ).toBeVisible();
     |     ^ Error: expect(locator).toBeVisible() failed
  35 | });
  36 | 
  37 | test("/billetterie redirects to /tickets", async ({ page }) => {
  38 |   await page.goto("/billetterie");
  39 |   await expect(page).toHaveURL(/\/tickets$/);
  40 | });
  41 | 
```