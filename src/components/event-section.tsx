import { ArrowRight } from "lucide-react";
import Link from "next/link";
import EventCard from "./event-card";
import { Typography } from "./ui/typography";
import { Button } from "./ui/button";

type EventSectionProps = {
  label: string;
  events: EventType[] | null;
  userEvents?: boolean;
};
export default function EventSection({
  label,
  events,
  userEvents,
}: EventSectionProps) {
  return (
    <section>
      <div className="flex justify-between items-center">
        <div className="bg-primary dark:bg-primary-dark w-max rounded-full px-2 py-1 flex items-center justify-center">
          <Typography variant="h4" className="text-secondary-content">
            {label}
          </Typography>
        </div>
        {!userEvents && (
          <Button asChild size="icon" variant="ghost">
            <Link
              href={`/${label.toLowerCase()}`}
              aria-label={`Show more ${label} events`}
            >
              <ArrowRight />
            </Link>
          </Button>
        )}
      </div>
      <div className="grid min-[680px]:grid-cols-2 gap-3 pt-3">
        {events?.map((event) => <EventCard key={event.event_id} {...event} />)}
      </div>
    </section>
  );
}
