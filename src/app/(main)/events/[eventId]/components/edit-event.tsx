import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import Link from "next/link";

type EditEventProps = {
  eventId: string;
};
export default function EditEvent({ eventId }: EditEventProps) {
  return (
    <Button asChild variant="ghost" size="icon">
      <Link href={`/update-event/${eventId}`}>
        <Edit />
      </Link>
    </Button>
  );
}
