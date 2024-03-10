import { getUser } from "@/lib/actions";
import EventCover from "./event-cover";
import EventFooter from "./event-footer";
import EventHeader from "./event-header";
import DeleteEvent from "./delete-event";

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
  const { user } = await getUser();

  return (
    <article className="min-h-full flex flex-col bg-foreground dark:bg-foreground-dark rounded-3xl shadow-base dark:shadow-base-dark pb-8 relative">
      <DeleteEvent eventId={event_id} createdBy={created_by} user={user} />
      <EventCover cover_id={cover_id} title={title} />
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
