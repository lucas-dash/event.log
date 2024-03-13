import { Typography } from "@/components/ui/typography";
import { getEventCoverById } from "@/lib/actions";
import { format } from "date-fns";
import { CalendarClock, MapPin, Image as ImageIcon } from "lucide-react";
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
    <div>
      {cover ? (
        <Image
          src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/covers/${cover?.created_by}/${coverId}/${cover?.name}`}
          alt={`${title} event cover`}
          fill
          loading="lazy"
          className="object-cover w-full h-full rounded-lg"
        />
      ) : (
        <div className="flex items-center justify-center min-h-[190px]">
          <ImageIcon size={32} />
        </div>
      )}
    </div>
  );
}

type ForyouCardProps = {
  place: string;
  date: string;
  time: string;
  title: string;
  event_id: string;
  cover_id: string | null;
};
export default function ForyouCard({
  cover_id,
  date,
  event_id,
  place,
  time,
  title,
}: ForyouCardProps) {
  return (
    <article className="min-w-[300px] w-full max-w-[360px] min-h-[230px] h-full rounded-2xl relative overflow-hidden shadow-base dark:shadow-base-dark bg-badge dark:bg-secondary">
      <Link href={`/events/${event_id}`} className="h-max">
        <ForyouCover coverId={cover_id} title={title} />

        <div className="absolute right-0 left-0 bottom-0 bg-foreground/90 dark:bg-foreground-dark/90 rounded-2xl p-2 min-h-[80px]">
          <Typography variant="h4" className="px-2 truncate">
            {title}
          </Typography>
          <div className="flex gap-2 flex-wrap pt-2">
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
                  className="text-sm max-sm:hidden pl-1 text-copy-light dark:text-copy-light-dark"
                >
                  {time}
                </Typography>
              </Typography>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
