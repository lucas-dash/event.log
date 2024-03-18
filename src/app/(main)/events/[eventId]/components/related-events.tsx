import { Badge } from "@/components/ui/badge";
import { Typography } from "@/components/ui/typography";
import EventCard from "@/components/event/event-card";
import { findRelatedEvents } from "../../actions";

type RelatedEventsProps = {
  eventId: string;
  tagId: string[];
};
export default async function RelatedEvents({
  eventId,
  tagId,
}: RelatedEventsProps) {
  const { data: relatedEvents, error } = await findRelatedEvents(
    eventId,
    tagId,
  );

  if (relatedEvents?.length === 0 || error) return null;

  return (
    <section className="py-10">
      <Badge variant="section">
        <Typography variant="h3">Related Events</Typography>
      </Badge>

      <div className="grid md:grid-cols-2 gap-3 mt-3">
        {relatedEvents.map((event) => (
          <EventCard key={event.event_id} {...event} />
        ))}
      </div>
    </section>
  );
}
