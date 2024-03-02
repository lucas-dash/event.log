import { Clapperboard, LucideIcon, Music } from "lucide-react";

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
];
