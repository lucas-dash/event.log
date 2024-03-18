"use client";

import { toast } from "sonner";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { deleteCover, deleteEvent } from "../../actions";

type DeleteEventProps = {
  eventId: string;
  createdBy: string;
  coverId: string | null;
  coverName: string | null;
};
export default function DeleteEvent({
  eventId,
  createdBy,
  coverId,
  coverName,
}: DeleteEventProps) {
  const router = useRouter();

  const handleDeleteEvent = async () => {
    const { error } = await deleteEvent(eventId);
    if (error) {
      toast.error("Error deleting event");
    } else {
      if (coverId && coverName) {
        const { coversError, storageError } = await deleteCover(
          coverId,
          createdBy,
          coverName,
        );
        if (storageError.error || coversError.error) {
          toast.error(coversError.error?.message);
          toast.error(storageError.error?.message);
        }
      }

      toast.success("Event deleted");
      router.push("/events");
    }
  };

  return (
    <Button
      size="icon"
      variant="destructive"
      aria-label="Delete Event"
      onClick={handleDeleteEvent}
    >
      <Trash2 />
    </Button>
  );
}
