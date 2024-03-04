import { Button } from "@/components/ui/button";
import { Heart, Plus } from "lucide-react";

type EventActionsProps = {
  event_id: string;
};
export default function EventActions({ event_id }: EventActionsProps) {
  return (
    <div className="flex flex-col gap-2">
      <Button
        size="icon"
        variant="ghost"
        className="rounded-full"
        aria-label="Favorite"
        aria-describedby="Add event to favorite"
      >
        <Heart />
      </Button>
      <Button
        size="icon"
        variant="outline"
        className="rounded-full"
        aria-label="Join Event"
      >
        <Plus />
      </Button>
    </div>
  );
}
