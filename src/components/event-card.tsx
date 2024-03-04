import Image from "next/image";
import { CalendarClock, Image as ImageI, MapPin } from "lucide-react";
import { tags as allTags } from "@/lib/constants";
import { format } from "date-fns";
import Link from "next/link";
import { Typography } from "./ui/typography";
import Tag from "./tag";
import EventActions from "./features/event/event-actions";

export default function EventCard({
  cover,
  title,
  address,
  event_id,
  tags,
  date,
}: EventType) {
  const mainTag = allTags?.filter((tag) => {
    return tag.id === tags[0];
  });

  return (
    <article className="min-w-[280px] w-full max-[380px]:p-1 p-2 bg-foreground dark:bg-foreground-dark rounded-xl flex gap-2 sm:gap-3">
      <div className="max-w-32 w-full min-w-[80px] aspect-square border-border dark:border-border-dark border rounded-lg overflow-hidden grid place-items-center">
        {cover ? (
          <Image
            src={cover}
            alt={`${title} event cover`}
            width={110}
            height={110}
            loading="lazy"
            className="object-cover w-full h-full rounded-xl"
          />
        ) : (
          <ImageI size={32} />
        )}
      </div>

      <div className="flex justify-between w-full">
        <div className="flex gap-2 flex-col">
          <div className="space-y-2">
            <Link href={`/${title}`}>
              <Typography className="font-bold">{title}</Typography>
            </Link>
            <div className="flex flex-col items-start gap-2">
              <div className="flex items-start justify-center gap-1">
                <MapPin
                  size={20}
                  className="text-copy-light dark:text-copy-light-dark"
                />
                <Typography
                  variant="muted"
                  className="max-lg:max-w-[15ch] max-lg:truncate"
                >
                  {address}
                </Typography>
              </div>
              <div className="flex items-center justify-center gap-1">
                <CalendarClock
                  size={20}
                  className="text-copy-light dark:text-copy-light-dark"
                />
                <Typography variant="muted">{format(date, "PP")}</Typography>
              </div>
            </div>
          </div>

          <Link href={`events/${mainTag[0].id}`}>
            <Tag {...mainTag[0]} />
          </Link>
        </div>

        <EventActions event_id={event_id} />
      </div>
    </article>
  );
}
