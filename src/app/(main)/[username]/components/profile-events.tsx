import EmptyState from "@/components/empty-state";
import EventSection from "@/components/event/event-section";
import { listJoinedEvents } from "@/lib/actions";

type ProfileEventsProps = {
  userId: string;
};
export default async function ProfileEvents({ userId }: ProfileEventsProps) {
  const { data: events } = await listJoinedEvents(userId);

  if (events?.length === 0 || !events)
    return <EmptyState title="No events Found" />;

  return (
    <section className="py-8">
      <EventSection label="Joined Events" events={events} type="none" />
    </section>
  );
}
