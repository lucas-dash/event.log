import EmptyState from "@/components/empty-state";
import EventShowcaseCollection from "@/components/event/event-showcase-collection";
import { listUserJoinedEvents } from "@/lib/actions";

type ProfileEventsProps = {
  userId: string;
};
export default async function ProfileEvents({ userId }: ProfileEventsProps) {
  const { data: events } = await listUserJoinedEvents(userId);

  if (events?.length === 0 || !events)
    return <EmptyState title="No events Found" state="events" />;

  return (
    <section className="py-8">
      <EventShowcaseCollection
        label="Joined Events"
        type="noFilter"
        events={events}
      />
    </section>
  );
}
