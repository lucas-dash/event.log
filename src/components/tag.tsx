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
    <Badge variant="tag" className={cn("text-sm", className)} {...props}>
      <div
        className="rounded-full p-1.5 flex items-center justify-center"
        style={{ backgroundColor: `${color}` }}
      >
        <Icon size={20} />
      </div>
      <p>{title}</p>
    </Badge>
  );
}
