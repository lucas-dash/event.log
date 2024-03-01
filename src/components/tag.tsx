import { TagType } from "@/lib/constants";
import { Badge } from "./ui/badge";

export default function Tag({ title, icon, color }: TagType) {
  const Icon = icon;
  return (
    <Badge className="w-max text-base gap-2 py-1 bg-badge dark:bg-badge-dark">
      <div
        className="rounded-full p-2 flex items-center justify-center"
        style={{ backgroundColor: `${color}` }}
      >
        <Icon size={24} />
      </div>
      {title}
    </Badge>
  );
}
