"use client";

import { Button } from "@/components/ui/button";
import { disconnectFromEvent, isJoinedByUser, joinEvent } from "@/lib/actions";
import { CalendarCheck2, CalendarPlus, Loader2 } from "lucide-react";
import { memo, useCallback, useEffect, useState, useTransition } from "react";

type JoinButtonProps = {
  eventId: string;
  userId: string;
};
const JoinedButton = memo(function JoinButton({
  eventId,
  userId,
}: JoinButtonProps) {
  const [joined, setJoined] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [loading, setLoading] = useState(false);

  const toggleJoinEvent = () => {
    startTransition(async () => {
      if (joined) {
        const { error } = await disconnectFromEvent(eventId, userId);
        if (error) {
          throw new Error(error?.message);
        } else {
          setJoined(false);
        }
      } else if (!joined) {
        const { error } = await joinEvent(eventId);
        if (error) {
          throw new Error(error?.message);
        } else {
          setJoined(true);
        }
      }
    });
  };

  const checkIsJoined = useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    const { data } = await isJoinedByUser(eventId, userId);
    if (data) {
      setJoined(true);
    } else {
      setJoined(false);
    }
    setLoading(false);
  }, [eventId, userId]);

  useEffect(() => {
    checkIsJoined();
  }, [checkIsJoined]);

  if (!userId) return null;

  return (
    <Button
      size="icon"
      variant={`${joined ? "joined" : "outline"}`}
      className="rounded-full max-md:h-9 max-md:w-9"
      aria-label="Join Event"
      onClick={toggleJoinEvent}
      disabled={isPending || loading}
      aria-disabled={isPending || loading}
    >
      {isPending && <Loader2 className="animate-spin" />}
      <span className={`${isPending ? "hidden" : ""}`}>
        {joined ? <CalendarCheck2 /> : <CalendarPlus />}
      </span>
    </Button>
  );
});

export default JoinedButton;
