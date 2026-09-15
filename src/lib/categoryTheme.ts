import { GraduationCap, Cpu, Factory, Stethoscope, Users2, LucideIcon } from "lucide-react";
import { CategoryId } from "@/data/types";

/**
 * All class strings here are written out in full (no runtime string
 * concatenation of Tailwind variants) so Tailwind's content scanner can
 * find every literal token — dynamically building `hover:${x}` etc. would
 * silently produce no CSS.
 */
export interface CategoryTheme {
  icon: LucideIcon;
  /** Small badge/chip: border + bg + text */
  badge: string;
  /** Solid button/tile background, with hover */
  solid: string;
  /** Icon tile background used on the category grid */
  iconTile: string;
  /** Active pill/tab background */
  activePill: string;
  /** Left accent bar / dot color */
  dot: string;
  /** Complete hover-ring utility for the category grid card */
  cardHoverRing: string;
  /** Top accent border strip for cards tied to this category */
  topBorder: string;
}

const THEMES: Record<CategoryId, CategoryTheme> = {
  medical: {
    icon: Stethoscope,
    badge: "border-teal-200 bg-teal-50 text-teal-700",
    solid: "bg-teal-600 hover:bg-teal-700",
    iconTile: "bg-teal-100 text-teal-600",
    activePill: "border-teal-600 bg-teal-600 text-white",
    dot: "bg-teal-500",
    cardHoverRing: "hover:ring-teal-300",
    topBorder: "border-t-teal-500",
  },
  "engineering-independent": {
    icon: Cpu,
    badge: "border-indigo-200 bg-indigo-50 text-indigo-700",
    solid: "bg-indigo-600 hover:bg-indigo-700",
    iconTile: "bg-indigo-100 text-indigo-600",
    activePill: "border-indigo-600 bg-indigo-600 text-white",
    dot: "bg-indigo-500",
    cardHoverRing: "hover:ring-indigo-300",
    topBorder: "border-t-indigo-500",
  },
  "engineering-cluster": {
    icon: Factory,
    badge: "border-violet-200 bg-violet-50 text-violet-700",
    solid: "bg-violet-600 hover:bg-violet-700",
    iconTile: "bg-violet-100 text-violet-600",
    activePill: "border-violet-600 bg-violet-600 text-white",
    dot: "bg-violet-500",
    cardHoverRing: "hover:ring-violet-300",
    topBorder: "border-t-violet-500",
  },
  "general-independent": {
    icon: GraduationCap,
    badge: "border-blue-200 bg-blue-50 text-blue-700",
    solid: "bg-blue-600 hover:bg-blue-700",
    iconTile: "bg-blue-100 text-blue-600",
    activePill: "border-blue-600 bg-blue-600 text-white",
    dot: "bg-blue-500",
    cardHoverRing: "hover:ring-blue-300",
    topBorder: "border-t-blue-500",
  },
  "general-cluster": {
    icon: Users2,
    badge: "border-fuchsia-200 bg-fuchsia-50 text-fuchsia-700",
    solid: "bg-fuchsia-600 hover:bg-fuchsia-700",
    iconTile: "bg-fuchsia-100 text-fuchsia-600",
    activePill: "border-fuchsia-600 bg-fuchsia-600 text-white",
    dot: "bg-fuchsia-500",
    cardHoverRing: "hover:ring-fuchsia-300",
    topBorder: "border-t-fuchsia-500",
  },
};

export function getCategoryTheme(id: CategoryId): CategoryTheme {
  return THEMES[id];
}
