import {
  Activity,
  Award,
  BookText,
  Clapperboard,
  Cpu,
  Handshake,
  LayoutDashboard,
  LucideIcon,
  Martini,
  Mic2,
  Music,
  Scissors,
  SwatchBook,
  Trophy,
} from "lucide-react";

export type TagType = {
  id: string;
  title: string;
  icon: LucideIcon;
  color: string;
};

export const tags: TagType[] = [
  {
    id: "music",
    title: "Music",
    icon: Music,
    color: "#38DD0D",
  },
  {
    id: "film festival",
    title: "Film Festival",
    icon: Clapperboard,
    color: "#ED4B3A",
  },
  {
    id: "tournament",
    title: "Tournament",
    icon: Trophy,
    color: "#FFA500",
  },
  {
    id: "sport",
    title: "Sport",
    icon: Award,
    color: "#4ade80",
  },
  {
    id: "technology",
    title: "Technology",
    icon: Cpu,
    color: "#38bdf8",
  },
  {
    id: "food & drink",
    title: "Food & Drink",
    icon: Martini,
    color: "#f97316",
  },
  {
    id: "art",
    title: "Art & Design",
    icon: SwatchBook,
    color: "#8b5cf6",
  },
  {
    id: "workshop",
    title: "Workshop",
    icon: BookText,
    color: "#60a5fa",
  },
  {
    id: "entertainment",
    title: "Entertainment",
    icon: Mic2,
    color: "#10b981",
  },
  {
    id: "fashion",
    title: "Fashion",
    icon: Scissors,
    color: "#d946ef",
  },
  {
    id: "health",
    title: "Health",
    icon: Activity,
    color: "#f43f5e",
  },
  {
    id: "community",
    title: "Community & Social",
    icon: Handshake,
    color: "#eab308",
  },
  {
    id: "other",
    title: "Other",
    icon: LayoutDashboard,
    color: "#a1a1aa",
  },
];
