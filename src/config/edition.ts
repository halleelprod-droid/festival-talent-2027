// Règles d'éligibilité de l'édition courante — source unique de vérité.
//
// Évolution prévue : ces règles pourront migrer vers la table `editions`
// (colonne `starts_at` déjà présente + futures colonnes d'âge) lorsqu'elles
// deviendront spécifiques par édition. Tant qu'elles restent globales, on évite
// une migration inutile et on les centralise ici. Cf. DATABASE.md.

export const currentEdition = {
  year: 2027,

  // RÈGLES TECHNIQUES TEMPORAIRES.
  // Ces valeurs ne constituent pas les règles officielles d'éligibilité du
  // Festival Talent. Elles ne doivent être remplacées qu'après validation
  // écrite par l'organisation.

  // Date de référence pour le calcul de l'âge = début de l'édition.
  // L'éligibilité est calculée à cette date, PAS à la date de remplissage du
  // formulaire : un candidat est éligible selon son âge au jour du festival.
  ageReferenceDate: "2027-01-01",

  // Bornes de sanité provisoires (identiques à l'ancienne contrainte 6..100),
  // volontairement permissives pour ne rejeter aucun profil réel tant que la
  // règle métier d'âge définitive n'est pas fixée par l'organisation.
  minimumAge: 6,
  maximumAge: 100,
} as const;
