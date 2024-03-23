import EmptyState from "@/components/empty-state";
import EventShowcaseCollection from "@/components/event/event-showcase-collection";
import { getJoinedEventIdsByUserId } from "@/lib/actions";

type ProfileEventsProps = {
  userId: string;
};
export default async function ProfileEvents({ userId }: ProfileEventsProps) {
  const joinedId = await getJoinedEventIdsByUserId(userId);

  if (joinedId?.length === 0)
    return <EmptyState title="No events Found" state="events" />;

  return (
    <section className="py-8 space-y-4">
      <EventShowcaseCollection
        label="Joined Events"
        type="filter"
        options={{
          greaterThan: { cell: "date", value: new Date().toISOString() },
          inEvents: joinedId,
        }}
        getAll
      />
      <EventShowcaseCollection
        label="Past Events"
        type="filter"
        options={{
          lessThan: { cell: "date", value: new Date().toISOString() },
          inEvents: joinedId,
        }}
        getAll
      />
    </section>
  );
}
