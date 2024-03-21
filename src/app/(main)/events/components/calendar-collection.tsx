import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import EventCollection from "@/components/event/event-collection";

type CalendarCollectionProps = {
  eventsByMonth: EventType[][];
};
export default function CalendarCollection({
  eventsByMonth,
}: CalendarCollectionProps) {
  return (
    <section className="pb-5 space-y-5">
      {eventsByMonth.map((eventsInMonth, index) => {
        const firstEventDate = eventsInMonth[0]?.date;

        const monthName = firstEventDate
          ? format(new Date(firstEventDate), "LLLL yyyy")
          : `Month ${index + 1}`;

        return (
          <section key={monthName} className="space-y-2">
            <Badge variant="calendar">
              <p>{monthName}</p>
            </Badge>

            <EventCollection data={eventsInMonth} />
          </section>
        );
      })}
    </section>
  );
}
