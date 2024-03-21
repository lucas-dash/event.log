"use client";

import Link from "next/link";
import EventCardFooter from "./event-card-footer";
import EventCardHeader from "./event-card-header";

type EventCardContentProps = {
  eventId: string;
  title: string;
  place: string | null;
  date: string;
  time: string;
  tags: string[];
  price: string;
  price_from: boolean;
  isFree: boolean;
};
export default function EventCardContent({
  eventId,
  title,
  place,
  date,
  time,
  tags,
  price,
  price_from,
  isFree,
}: EventCardContentProps) {
  return (
    <section className="absolute bottom-0 inset-x-0 rounded-2xl bg-foreground dark:bg-foreground-dark border border-border dark:border-border-dark p-2 space-y-2">
      <Link href={`/events/${eventId}`}>
        <EventCardHeader title={title} date={date} time={time} place={place} />
      </Link>
      <EventCardFooter
        tags={tags}
        price={price}
        price_from={price_from}
        isFree={isFree}
      />
    </section>
  );
}
