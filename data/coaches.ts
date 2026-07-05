export type Coach = {
  name: string;
  role: string;
  initials: string;
  image?: string;
  focus: string[];
  description: string;
};

export const lifeCoaches: Coach[] = [
  {
    name: "Mister Moo",
    role: "Coach de vie & Developpement personnel",
    initials: "MM",
    image: "/images/speakers/mistermoo-mindset.jpg",
    focus: ["Confiance", "Leadership", "Vision"],
    description:
      "Accompagne les talents dans leur posture mentale, leur confiance en soi et leur capacite a transformer une ambition en discipline quotidienne.",
  },
  {
    name: "Oldy Sow",
    role: "Coach de vie & Motivation",
    initials: "OS",
    image: "/images/speakers/oldy-sow.jpg",
    focus: ["Motivation", "Discipline", "Prise de parole"],
    description:
      "Aide les candidats a garder le cap, a renforcer leur motivation et a developper une expression plus claire, plus stable et plus professionnelle.",
  },
];
