"use client";

import { Button } from "@/components/ui/button";
import { Check, Loader2, Plus } from "lucide-react";
import { useState, useTransition } from "react";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { disconnectFromEvent, joinEvent } from "./actions";

type JoinButtonProps = {
  event_id: string;
  user_id: string;
  joinedRes: PostgrestSingleResponse<{
    event_id: string;
    user_id: string;
  }>;
};
export default function JoinButton({
  event_id,
  user_id,
  joinedRes,
}: JoinButtonProps) {
  const { data: isJoined } = joinedRes;

  const [joined, setJoined] = useState(Boolean(isJoined));
  const [isPending, startTransition] = useTransition();

  const toggleJoinEvent = () => {
    startTransition(async () => {
      if (joined) {
        const { error } = await disconnectFromEvent(event_id, user_id);
        if (error) {
          throw new Error(error?.message);
        } else {
          setJoined(false);
        }
      } else if (!joined) {
        const { error } = await joinEvent(event_id);
        if (error) {
          throw new Error(error?.message);
        } else {
          setJoined(true);
        }
      }
    });
  };

  return (
    <Button
      size="icon"
      variant={`${joined ? "joined" : "outline"}`}
      className="rounded-full max-md:h-8 max-md:w-8 group"
      aria-label="Join Event"
      onClick={toggleJoinEvent}
    >
      {isPending && <Loader2 className="animate-spin" />}
      <span className={`${isPending ? "hidden" : ""}`}>
        {joined ? (
          <Check className="group-hover:scale-75 transition-transform" />
        ) : (
          <Plus className="group-hover:scale-125 group-hover:rotate-90 transition-transform" />
        )}
      </span>
    </Button>
  );
}
