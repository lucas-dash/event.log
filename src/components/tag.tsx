import { TagType } from "@/lib/tags";
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
      className={cn("", className)}
      {...props}
      aria-label={`${title} tag`}
    >
      <div
        className="rounded-full p-1 flex items-center justify-center"
        style={{ backgroundColor: `${color}` }}
      >
        <Icon size={20} />
      </div>
      <p className="text-nowrap">{title}</p>
    </Badge>
  );
}
