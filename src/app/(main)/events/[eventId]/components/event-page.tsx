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
  isFree,
  schedule,
  coordinates,
}: EventType) {
  return (
    <article className="max-w-[1000px] mx-auto flex flex-col bg-foreground dark:bg-foreground-dark rounded-3xl shadow-base dark:shadow-base-dark pb-3 md:pb-5 relative">
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
        coordinates={coordinates}
        priceFrom={price_from}
        isFree={isFree}
        tags={tags}
        title={title}
        date={date}
        time={time}
        ticketsLink={tickets_link}
      />
      <EventFooter
        description={description}
        homepage={homepage}
        alerts={alerts}
        schedule={schedule}
      />
    </article>
  );
}
