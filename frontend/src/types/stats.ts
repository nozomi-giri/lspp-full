import type { LucideIcon } from "lucide-react";

export interface StatItem {
  icon: LucideIcon;
  target: number;
  suffix: string;
  label: string;
}

export interface ContribCard {
  icon: LucideIcon;
  title: string;
  points: string[];
}
