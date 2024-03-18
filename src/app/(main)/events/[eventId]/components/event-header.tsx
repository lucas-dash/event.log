import EventActions from "@/components/event/event-actions";
import TagsRenderer from "@/components/tags-renderer";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { currencyFormat, timeFormat } from "@/lib/utils";
import { format } from "date-fns";
import { MapPin, MapPinned, Ticket } from "lucide-react";
import Link from "next/link";

type EventInfoProps = {
  eventId: string;
  title: string;
  place: string;
  coordinates: number[] | null;
  price: string;
  priceFrom: boolean;
  isFree: boolean;
  tags: string[];
  time: string;
  date: string;
  ticketsLink: string | null;
};
export default async function EventHeader({
  eventId,
  place,
  price,
  priceFrom,
  isFree,
  tags,
  title,
  date,
  time,
  ticketsLink,
  coordinates,
}: EventInfoProps) {
  const supabse = createSupabaseServerClient();

  const { data: joined, error } = await supabse
    .from("joined")
    .select("event_id")
    .eq("event_id", eventId);

  return (
    <section className="p-3 md:p-5 flex flex-col gap-5">
      <header>
        <Typography variant="h2">{title}</Typography>

        {joined && !error && (
          <div>
            <Typography variant="muted" className="text-base">
              <span className="font-bold text-copy dark:text-copy-dark">
                {joined?.length}
              </span>{" "}
              people joined
            </Typography>
          </div>
        )}
      </header>

      <div className="flex justify-between">
        <article className="flex flex-col gap-2">
          <div className="flex items-center gap-1">
            <MapPin className="text-copy-lighter dark:text-copy-lighter-dark" />
            <Typography variant="muted" className="text-base">
              {place}
            </Typography>
          </div>

          <div className="flex items-center gap-1">
            <Ticket className="text-copy-lighter dark:text-copy-lighter-dark" />
            <Typography variant="muted" className="text-base">
              {currencyFormat(price, priceFrom, isFree)}
            </Typography>
          </div>

          {coordinates && (
            <div className="flex items-center gap-1">
              <MapPinned className="text-copy-lighter dark:text-copy-lighter-dark" />
              <Link
                href={`/?lat=${coordinates[0]}&lon=${coordinates[1]}`}
                className="text-copy-light dark:text-copy-light-dark"
              >
                Show on Map
              </Link>
            </div>
          )}
        </article>
        <EventActions event_id={eventId} />
      </div>

      <TagsRenderer eventTags={tags} />

      <div className="flex items-center gap-4 w-full flex-wrap justify-center px-2">
        <div className="bg-secondary dark:bg-secondary-dark rounded-xl grid place-items-center min-w-[150px] p-3">
          <Typography className="text-secondary-content">Time</Typography>
          <Typography
            className="text-secondary-content text-xl font-bold [&:not(:first-child)]:mt-2"
            aria-label="Event Start Time"
            aria-description={time}
          >
            {timeFormat(`${date} ${time}`)}
          </Typography>
        </div>

        <div className="bg-secondary dark:bg-secondary-dark rounded-xl grid place-items-center min-w-[150px] p-3">
          <Typography className="text-secondary-content">Date</Typography>
          <Typography
            className="text-secondary-content text-xl font-bold [&:not(:first-child)]:mt-2 break-words text-center"
            aria-label="Event Date"
            aria-description={format(date, "PP")}
          >
            {format(date, "PP")}
          </Typography>
        </div>
      </div>

      <div className="w-full flex items-center flex-wrap justify-center gap-4">
        <Button variant="outline">Join Event</Button>
        <Button asChild>
          <Link href={ticketsLink || ""} target="_blank" rel="noreferrer">
            {ticketsLink ? "Get Tickets" : "Tickets on site"}
          </Link>
        </Button>
      </div>
    </section>
  );
}
