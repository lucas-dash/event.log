import { createSupabaseServerClient } from "@/lib/supabase/server";
import { format } from "date-fns";
import EmptyState from "../empty-state";
import EventCard from "./event-card";
import { Badge } from "../ui/badge";
import { Typography } from "../ui/typography";

export default async function EventInfiniteScroll() {
  const supabase = createSupabaseServerClient();

  const { data, error } = await supabase.from("event").select("*").limit(10);

  if (data?.length === 0) return <EmptyState title="No events found" />;

  if (error) {
    throw new Error(error?.message);
  }
  const eventsByDate = data.reduce(
    (groups: { [key: string]: EventType[] }, event) => {
      const { date } = event;
      if (!groups[date]) {
        // eslint-disable-next-line no-param-reassign
        groups[date] = [];
      }
      groups[date].push(event);
      return groups;
    },
    {},
  );

  const sortedDates = Object.keys(eventsByDate).sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime(),
  );

  return (
    <section className="flex flex-col gap-6">
      {sortedDates.map((date) => (
        <section key={date} className="space-y-2">
          <Badge variant="section">
            <Typography
              variant="h3"
              className="text-base text-primary-content"
              aria-describedby="Events Date section"
            >
              {format(date, "PPP")}
            </Typography>
          </Badge>
          <section
            className={`grid ${eventsByDate[date].length > 1 ? "md:grid-cols-2" : ""} gap-3 `}
          >
            {eventsByDate[date].map((event) => (
              <EventCard key={event.event_id} {...event} />
            ))}
          </section>
        </section>
      ))}
    </section>
  );
}
