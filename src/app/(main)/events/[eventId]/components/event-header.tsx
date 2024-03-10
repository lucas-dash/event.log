import EventActions from "@/components/event/event-actions";
import TagsRenderer from "@/components/tags-renderer";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { AlertTriangle, MapPin, Ticket } from "lucide-react";
import Link from "next/link";

type EventInfoProps = {
  eventId: string;
  title: string;
  place: string;
  price: number;
  priceFrom: boolean;
  tags: string[];
  description: string;
  homepage: string | null;
  alerts: string | null;
};
export default async function EventHeader({
  eventId,
  place,
  price,
  priceFrom,
  tags,
  title,
  description,
  homepage,
  alerts,
}: EventInfoProps) {
  const supabse = createSupabaseServerClient();

  const { data: joined, error } = await supabse
    .from("joined")
    .select("event_id")
    .eq("event_id", eventId);

  return (
    <section className="p-3 md:p-5">
      <section className="flex justify-between">
        <article className="flex flex-col gap-4">
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

          <div className="flex items-center gap-2 divide-x-2 divide-copy-lighter dark:divide-copy-lighter-dark">
            <div className="flex items-center gap-1">
              <MapPin className="text-copy-lighter dark:text-copy-lighter-dark" />
              <Typography variant="muted" className="text-base">
                {place}
              </Typography>
            </div>
            <div className="flex items-center gap-1 pl-2">
              <Ticket className="text-copy-lighter dark:text-copy-lighter-dark" />
              <Typography variant="muted" className="text-base">
                {priceFrom ? "From" : ""} ${price}
              </Typography>
            </div>
          </div>
          <TagsRenderer eventTags={tags} />
        </article>
        <EventActions event_id={eventId} />
      </section>

      <div className="px-4 pt-4 flex flex-col gap-3">
        <div>
          <Typography variant="h4">Description</Typography>
          <Typography variant="body" className="[&:not(:first-child)]:mt-2">
            {description}
          </Typography>
        </div>

        <div>
          {homepage && (
            <div className="flex flex-col w-full items-start">
              <Typography variant="h5">Homepage</Typography>
              <Button asChild variant="link" className="p-0">
                <Link href={homepage}>{homepage}</Link>
              </Button>
            </div>
          )}
          {alerts && (
            <div className="flex flex-col w-full items-start">
              <Typography variant="h5" className="flex items-center gap-1">
                <AlertTriangle size={20} />
                Alerts
              </Typography>
              <Typography variant="body" className="[&:not(:first-child)]:mt-2">
                {alerts}
              </Typography>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
