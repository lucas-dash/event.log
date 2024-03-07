import Image from "next/image";
import { CalendarClock, Image as ImageIcon, MapPin } from "lucide-react";
import { tags as allTags } from "@/lib/constants";
import { format } from "date-fns";
import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { Typography } from "../ui/typography";
import Tag from "../tag";
import EventActions from "./event-actions";

type EventCoverProps = {
  title: string;
  createdBy: string | null | undefined;
  cover_id: string | null | undefined;
  name: string | null | undefined;
};

function EventCover({ title, createdBy, cover_id, name }: EventCoverProps) {
  return (
    <div className="max-w-32 w-full min-w-[80px] aspect-square border-border dark:border-border-dark border rounded-lg overflow-hidden grid place-items-center">
      {createdBy ? (
        <Image
          src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/covers/${createdBy}/${cover_id}/${name}`}
          alt={`${title} event cover`}
          width={150}
          height={150}
          loading="lazy"
          className="object-cover w-full h-full rounded-xl"
        />
      ) : (
        <ImageIcon size={32} />
      )}
    </div>
  );
}

type EventContentProps = {
  title: string;
  place: string | null;
  date: string;
  time: string;
  tags: string[];
};

function EventContent({ title, place, date, time, tags }: EventContentProps) {
  const mainTag = allTags?.filter((tag) => {
    return tag.id === tags[0];
  });

  return (
    <div className="flex gap-2 flex-col">
      <div className="space-y-2">
        <Link href={`/${title}`}>
          <Typography className="font-bold text-lg">{title}</Typography>
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
              {place}
            </Typography>
          </div>
          <div className="flex items-center justify-center gap-1">
            <CalendarClock
              size={20}
              className="text-copy-light dark:text-copy-light-dark"
            />
            <Typography variant="muted">
              {format(date, "PP")}
              <Typography
                variant="caption"
                className="text-sm max-sm:hidden pl-1"
              >
                {time}
              </Typography>
            </Typography>
          </div>
        </div>
      </div>
      <Link href={`events/${mainTag[0].id}`} className="w-max">
        <Tag {...mainTag[0]} />
      </Link>
    </div>
  );
}

export default async function EventCard({
  cover_id,
  title,
  event_id,
  tags,
  date,
  place,
  time,
}: EventType) {
  const supabase = createSupabaseServerClient();
  let cover: Covers | null = null;

  if (cover_id) {
    const { data } = await supabase
      .from("covers")
      .select("*")
      .eq("id", cover_id)
      .single();

    cover = data;
  }

  return (
    <article className="min-w-[280px] w-full max-[380px]:p-1 p-2 bg-foreground dark:bg-foreground-dark rounded-xl flex gap-2 sm:gap-3">
      <EventCover
        title={title}
        createdBy={cover?.created_by}
        cover_id={cover?.id}
        name={cover?.name}
      />

      <div className="flex justify-between w-full">
        <EventContent
          place={place}
          title={title}
          date={date}
          time={time}
          tags={tags}
        />
        <EventActions event_id={event_id} />
      </div>
    </article>
  );
}
