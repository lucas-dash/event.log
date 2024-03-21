import { Typography } from "@/components/ui/typography";
import { timeFormat } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarClock, MapPin } from "lucide-react";

type EventCardHeaderProps = {
  title: string;
  place: string | null;
  date: string;
  time: string;
};
export default function EventCardHeader({
  title,
  date,
  time,
  place,
}: EventCardHeaderProps) {
  return (
    <header className="space-y-1">
      <div className="flex items-center flex-wrap gap-2">
        <div className="flex items-center gap-1">
          <CalendarClock
            size={20}
            className="text-copy-light dark:text-copy-light-dark"
          />
          <Typography variant="muted">
            {format(date, "PP")}
            <Typography
              variant="caption"
              className="text-sm pl-1 text-copy-light dark:text-copy-light-dark"
              aria-label={timeFormat(`${date} ${time}`)}
            >
              {timeFormat(`${date} ${time}`)}
            </Typography>
          </Typography>
        </div>
        <div className="flex items-center gap-1">
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
      </div>
      <Typography variant="h4" className="text-nowrap truncate">
        {title}
      </Typography>
    </header>
  );
}
