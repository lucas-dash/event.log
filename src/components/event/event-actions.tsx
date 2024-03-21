"use client";

import useUser from "@/lib/hooks/useUser";
import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import FavoriteButton from "./favorite-button";
import JoinButton from "./join-button";

type EventActionsProps = {
  event_id: string;
  orientation?: "vertical" | "horizontal";
};
export default function EventActions({
  event_id,
  orientation = "vertical",
  className,
  ...props
}: EventActionsProps & HTMLAttributes<HTMLDivElement>) {
  const user = useUser();

  if (!user) return null;

  return (
    <div
      className={cn(
        `flex gap-2 bg-badge dark:bg-badge-dark rounded-xl p-1 shadow-base dark:shadow-base-dark ${orientation === "vertical" ? "flex-col" : ""}`,
        className,
      )}
      {...props}
    >
      <FavoriteButton eventId={event_id} userId={user.id} />
      <JoinButton eventId={event_id} userId={user.id} />
    </div>
  );
}
