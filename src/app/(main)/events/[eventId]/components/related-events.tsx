import EventShowcaseCollection from "@/components/event/event-showcase-collection";
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
      <EventShowcaseCollection
        label="Related Events"
        events={relatedEvents}
        type="noFilter"
      />
    </section>
  );
}
