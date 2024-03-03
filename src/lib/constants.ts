import {
  Award,
  Clapperboard,
  LayoutDashboard,
  LucideIcon,
  Music,
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
    icon: Award,
    color: "#FFA500",
  },
  {
    id: "other",
    title: "Other",
    icon: LayoutDashboard,
    color: "#d1d5db",
  },
];
