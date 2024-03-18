import FavoriteButton from "@/components/event/favorite-button";
import { Typography } from "@/components/ui/typography";
import { getEventCoverById } from "@/lib/actions";
import { currencyFormat, timeFormat } from "@/lib/utils";
import { format } from "date-fns";
import {
  CalendarClock,
  MapPin,
  Image as ImageIcon,
  Ticket,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type ForyouCoverProps = {
  coverId: string | null;
  title: string;
};
async function ForyouCover({ coverId, title }: ForyouCoverProps) {
  let cover = null;
  if (coverId) {
    const { data } = await getEventCoverById(coverId);
    cover = data;
  }
  return (
    <div className="h-full w-full relative">
      {cover ? (
        <Image
          src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/covers/${cover?.created_by}/${coverId}/${cover?.name}`}
          alt={`${title} event cover`}
          fill
          priority
          sizes="(max-width: 768px) 30vw, (max-width: 1200px) 25vw, 20vw"
          className="object-cover w-full h-full rounded-lg group-hover:scale-110 duration-300 transition-transform"
        />
      ) : (
        <div className="flex items-center justify-center min-h-[190px]">
          <ImageIcon size={32} />
        </div>
      )}
    </div>
  );
}

type ForyouContentProps = {
  title: string;
  date: string;
  time: string;
  isFree: boolean;
  place: string;
  price: string;
  price_from: boolean;
};
function ForyouContent({
  title,
  date,
  time,
  place,
  isFree,
  price_from,
  price,
}: ForyouContentProps) {
  return (
    <div className="absolute inset-x-0 bottom-0 bg-foreground/90 dark:bg-secondary-light/90 rounded-2xl p-2 min-h-[80px] group-hover:pb-8 -mb-5 duration-200 transition-all">
      <Typography variant="h4" className="px-2 truncate">
        {title}
      </Typography>
      <section className="flex gap-2 flex-wrap pt-1">
        <Typography
          variant="muted"
          className="max-lg:max-w-[15ch] max-lg:truncate flex items-center gap-1"
        >
          <MapPin size={20} />
          {place}
        </Typography>

        <div className="flex items-center gap-1">
          <Typography
            variant="muted"
            className="flex items-center gap-1"
            aria-label={format(date, "PP")}
          >
            <CalendarClock size={20} />
            {format(date, "PP")}
            <Typography
              variant="caption"
              className="text-sm max-sm:hidden text-inherit dark:text-inherit"
              aria-label={timeFormat(`${date} ${time}`)}
            >
              {timeFormat(`${date} ${time}`)}
            </Typography>
          </Typography>
        </div>
      </section>
      <Typography
        variant="muted"
        className="invisible group-hover:visible group-hover:fade-in fade-out-100 flex items-center gap-1 mt-1"
      >
        <Ticket size={20} />
        {currencyFormat(price, price_from, isFree)}
      </Typography>
    </div>
  );
}

type ForyouCardProps = {
  isFree: boolean;
  place: string;
  price: string;
  price_from: boolean;
  date: string;
  time: string;
  title: string;
  event_id: string;
  cover_id: string | null;
  userId: string;
};
export default function ForyouCard({
  event_id,
  cover_id,
  date,
  place,
  time,
  title,
  isFree,
  price,
  price_from,
  userId,
}: ForyouCardProps) {
  return (
    <article className="min-w-[290px] w-full min-h-[230px] h-full rounded-2xl relative overflow-hidden bg-slate-300 dark:bg-slate-700 group shadow-md">
      <FavoriteButton
        eventId={event_id}
        userId={userId}
        className="absolute top-2 right-2 z-50 dark:bg-secondary-light dark:hover:bg-secondary-light/80"
        variant="outline"
      />
      <Link href={`/events/${event_id}`}>
        <ForyouCover coverId={cover_id} title={title} />
        <ForyouContent
          title={title}
          date={date}
          time={time}
          place={place}
          isFree={isFree}
          price={price}
          price_from={price_from}
        />
      </Link>
    </article>
  );
}
