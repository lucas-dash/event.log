"use client";

import { toast } from "sonner";
import { Trash2 } from "lucide-react";
import { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { deleteEvent } from "../../actions";

type Props = {
  eventId: string;
  createdBy: string;
  user: User | null;
};
export default function DeleteEvent({ eventId, user, createdBy }: Props) {
  const router = useRouter();

  const handleDeleteEvent = async () => {
    const { error } = await deleteEvent(eventId);
    if (error) {
      toast.error("Error deleting event");
    } else {
      toast.success("Event deleted");
      router.push("/events");
    }
  };

  if (user) {
    if (user?.id === createdBy) {
      return (
        <Button
          size="icon"
          variant="destructive"
          aria-label="Delete Event"
          onClick={handleDeleteEvent}
          className="absolute right-4 top-4 z-20"
        >
          <Trash2 />
        </Button>
      );
    }
  }
}
