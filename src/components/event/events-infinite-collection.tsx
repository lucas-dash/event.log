import {
  Options,
  getPaginatedFilteredEvents,
} from "@/app/(main)/events/actions";
import EventCard from "./event-card";
import LoadMore from "./load-more";
import EmptyState from "../empty-state";

type EventInfiniteScrollProps = {
  emptyStateTitle: string;
  options?: Options;
};

export default async function EventsInfiniteCollection({
  emptyStateTitle,
  options,
}: EventInfiniteScrollProps) {
  const { data, error } = await getPaginatedFilteredEvents(1, options);

  if (error) throw new Error(error.message);

  if (data.length === 0) return <EmptyState title={emptyStateTitle} />;

  return (
    <>
      <section className="grid md:grid-cols-2 gap-3">
        {data?.map((event) => {
          return <EventCard key={event.event_id} {...event} />;
        })}
      </section>
      <LoadMore options={options} />
    </>
  );
}
