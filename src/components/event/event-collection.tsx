import EventCard from "./EventCard/event-card";

type EventCollectionProps = {
  data: EventType[];
};

export default function EventCollection({ data }: EventCollectionProps) {
  return (
    <section className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5 sm:gap-3">
      {data?.map((event) => {
        return <EventCard key={event.event_id} {...event} />;
      })}
    </section>
  );
}
