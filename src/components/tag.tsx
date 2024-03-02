import { TagType } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";
import { Badge } from "./ui/badge";

export default function Tag({
  title,
  icon,
  color,
  className,
  ...props
}: TagType & HTMLAttributes<HTMLDivElement>) {
  const Icon = icon;
  return (
    <Badge
      variant="tag"
      className={cn(
        "w-max text-base gap-2 py-1 bg-badge dark:bg-badge-dark text-copy-dark dark:text-copy shadow-base dark:shadow-base-dark",
        className,
      )}
      {...props}
    >
      <div
        className="rounded-full p-1.5 flex items-center justify-center"
        style={{ backgroundColor: `${color}` }}
      >
        <Icon size={24} />
      </div>
      {title}
    </Badge>
  );
}
