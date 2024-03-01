import { Clapperboard, LucideIcon, Music } from "lucide-react";

export type TagType = {
  id: number;
  title: string;
  icon: LucideIcon;
  color: string;
};

export const tags: TagType[] = [
  {
    id: 0,
    title: "Music",
    icon: Music,
    color: "#38DD0D",
  },
  {
    id: 1,
    title: "Film Festival",
    icon: Clapperboard,
    color: "#ED4B3A",
  },
];
