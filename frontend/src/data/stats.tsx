import { Users, Lightbulb, Radio, Briefcase, BookOpen } from "lucide-react";
import type { StatItem, ContribCard } from "../types";

export const contribCards: ContribCard[] = [
  {
    icon: Users,
    title: "Learn, lead, grow with us",
    points: [
      "Build tech communities by bringing your peers together",
      "Host regular workshops and events focused on skill building",
      "Learn design, technology, and business from industry professionals",
    ],
  },
  {
    icon: Lightbulb,
    title: "Make a difference",
    points: [
      "Close the gap between industry and academia",
      "Take new learnings to build solutions for real life problems",
      "Strengthen your skill set while building future leaders",
    ],
  },
];

export const stats: StatItem[] = [
  { icon: Users, target: 95, suffix: "", label: "Student Partners enrolled" },
  {
    icon: Radio,
    target: 80,
    suffix: "+",
    label: "Knowledge sharing sessions delivered",
  },
  { icon: Briefcase, target: 5, suffix: "", label: "Student Partners hired" },
  {
    icon: BookOpen,
    target: 2100,
    suffix: "+",
    label: "Students impacted by LSPs",
  },
];
