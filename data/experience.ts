import {
  Briefcase,
  Brush,
  Camera,
  Gem,
  Globe2,
  HeartHandshake,
  Lightbulb,
  Mic2,
  Rocket,
  ShieldCheck,
  Shirt,
  Sparkles,
  Trophy,
  Users,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type TalentStory = {
  title: string;
  profile: string;
  story: string;
  icon: LucideIcon;
};

export type ImpactObjective = {
  value: string;
  label: string;
  description: string;
};

export type VisionPillar = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export const talentStories: TalentStory[] = [
  {
    title: "Futur artiste",
    profile: "Une voix entendue pour la premiere fois",
    story:
      "Il arrive avec une chanson en telephone, puis decouvre une scene, des retours, des coachs et une communaute qui l'aide a croire a son propre son.",
    icon: Mic2,
  },
  {
    title: "Futur entrepreneur",
    profile: "Une idee locale qui peut devenir une activite",
    story:
      "Elle porte une solution simple pour sa ville. Festival Talent lui donne un cadre, des rencontres et la confiance necessaire pour la presenter.",
    icon: Briefcase,
  },
  {
    title: "Future styliste",
    profile: "Un regard, une coupe, une identite",
    story:
      "Elle transforme son inspiration en collection, rencontre des professionnels et apprend a raconter son univers avec exigence.",
    icon: Shirt,
  },
  {
    title: "Futur danseur",
    profile: "Un talent de quartier qui represente sa zone",
    story:
      "Il danse deja partout ou l'espace existe. Les preselections lui offrent une scene, une discipline et une premiere reconnaissance.",
    icon: Zap,
  },
];

export const impactObjectives: ImpactObjective[] = [
  {
    value: "1000",
    label: "Jeunes accompagnes",
    description: "Objectif d'accompagnement progressif des talents detectes.",
  },
  {
    value: "14",
    label: "Regions",
    description: "Representer le Senegal dans sa diversite avant d'elargir la vision.",
  },
  {
    value: "10+",
    label: "Disciplines",
    description: "Musique, danse, mode, culture urbaine, innovation et plus.",
  },
  {
    value: "50",
    label: "Partenaires",
    description: "Construire un reseau d'entreprises, institutions et medias.",
  },
  {
    value: "500",
    label: "Benevoles",
    description: "Mobiliser une energie collective autour des talents.",
  },
  {
    value: "2030",
    label: "Horizon impact",
    description: "Installer une plateforme culturelle durable et mesurable.",
  },
];

export const visionPillars: VisionPillar[] = [
  {
    title: "Vision",
    description:
      "Faire de Festival Talent une plateforme africaine de reference pour detecter, accompagner et connecter les talents.",
    icon: Globe2,
  },
  {
    title: "Mission",
    description:
      "Transformer une opportunite artistique en parcours concret : inscription, preselections, coaching, scene et reseau.",
    icon: Rocket,
  },
  {
    title: "Valeurs",
    description:
      "Espoir, excellence, confiance, jeunesse, innovation et representation de l'Afrique moderne.",
    icon: Gem,
  },
  {
    title: "Impact",
    description:
      "Créer un pont entre talents, coachs, artistes, partenaires, institutions et opportunites professionnelles.",
    icon: HeartHandshake,
  },
  {
    title: "Afrique",
    description:
      "Commencer au Senegal, puis construire progressivement une vision ouverte aux talents africains.",
    icon: Sparkles,
  },
  {
    title: "Innovation",
    description:
      "Utiliser le digital, les medias et les donnees pour rendre l'accompagnement plus lisible et durable.",
    icon: Lightbulb,
  },
];

export const futureAfricaMarkers = [
  "Senegal",
  "Regions",
  "Diaspora",
  "Afrique de l'Ouest",
  "Afrique creative",
];

export const impactTrustPillars = [
  { title: "Objectifs", icon: Trophy },
  { title: "Jeunes accompagnes", icon: Users },
  { title: "Disciplines", icon: Brush },
  { title: "Partenaires", icon: ShieldCheck },
  { title: "Medias", icon: Camera },
];
