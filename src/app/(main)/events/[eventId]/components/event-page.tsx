import EventCover from "./event-cover";
import EventFooter from "./event-footer";
import EventHeader from "./event-header";

export default async function EventPage({
  event_id,
  cover_id,
  title,
  description,
  place,
  price,
  price_from,
  tags,
  homepage,
  alerts,
  time,
  date,
  tickets_link,
  created_by,
}: EventType) {
  return (
    <article className="max-w-[900px] mx-auto flex flex-col bg-foreground dark:bg-foreground-dark rounded-3xl shadow-base dark:shadow-base-dark pb-8 relative">
      <EventCover
        cover_id={cover_id}
        title={title}
        createdBy={created_by}
        eventId={event_id}
      />
      <EventHeader
        eventId={event_id}
        place={place}
        price={price}
        priceFrom={price_from}
        tags={tags}
        title={title}
        description={description}
        homepage={homepage}
        alerts={alerts}
      />
      <EventFooter date={date} time={time} ticketsLink={tickets_link} />
    </article>
  );
}
