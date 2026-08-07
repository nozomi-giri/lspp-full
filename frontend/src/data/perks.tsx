import { Users, Briefcase, Gift, Sparkles } from "lucide-react";
import type { Perk } from "../types";

export const perks: Perk[] = [
  {
    title: "Become a Leader",
    description:
      "Get mentorship from industry experts and empower your peers through knowledge sharing sessions.",
    icon: <Users size={28} />,
  },
  {
    title: "Professional Exposure",
    description:
      "Step into the professional world and network with experienced tech professionals.",
    icon: <Briefcase size={28} />,
  },
  {
    title: "Exclusive Rewards",
    description:
      "Access curated trainings, courses, and resources, plus certificates and goodies.",
    icon: <Gift size={28} />,
  },
  {
    title: "Personal Growth",
    description:
      "Get guidance on your own projects while developing essential soft skills.",
    icon: <Sparkles size={28} />,
  },
];
