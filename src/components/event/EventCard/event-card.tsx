"use client";

import { getEventCoverById } from "@/lib/actions";
import { useEffect, useState } from "react";
import Link from "next/link";
import EventCardThumbnail from "./event-card-thumbnail";
import EventCardContent from "./event-card-content";
import EventActions from "../event-actions";

export default function EventCard({
  cover_id,
  title,
  event_id,
  tags,
  date,
  place,
  time,
  price,
  price_from,
  isFree,
}: EventType) {
  const [cover, setCover] = useState<Covers | null>(null);

  useEffect(() => {
    const getEventThumbnail = async () => {
      if (cover_id) {
        const { data } = await getEventCoverById(cover_id);
        setCover(data);
      }
    };
    getEventThumbnail();
  }, [cover_id]);

  return (
    <article className="min-h-[280px] min-w-[280px] h-full w-full rounded-2xl p-1.5 hover:p-0 transition-all bg-foreground dark:bg-secondary-light relative overflow-hidden shadow-base dark:shadow-base-dark group">
      <EventActions
        event_id={event_id}
        className="absolute top-2.5 right-2.5 z-30 bg-badge/90 dark:bg-badge-dark/90"
      />
      <Link href={`/events/${event_id}`}>
        <EventCardThumbnail
          title={title}
          createdBy={cover?.created_by}
          cover_id={cover?.id}
          name={cover?.name}
        />
      </Link>
      <EventCardContent
        eventId={event_id}
        title={title}
        place={place}
        date={date}
        time={time}
        tags={tags}
        price={price}
        price_from={price_from}
        isFree={isFree}
      />
    </article>
  );
}
