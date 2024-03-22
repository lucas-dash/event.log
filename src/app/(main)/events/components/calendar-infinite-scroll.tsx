import EmptyState from "@/components/empty-state";
import { getPaginatedEventsByMonth } from "../actions";
import CalendarCollection from "./calendar-collection";
import LoadMoreMonths from "./load-more-months";

export default async function CalendarInfiniteScroll() {
  const eventsByMonth = await getPaginatedEventsByMonth(1);

  if (eventsByMonth.length === 0)
    return <EmptyState title="No events found" state="events" />;

  return (
    <>
      <CalendarCollection eventsByMonth={eventsByMonth} />
      <LoadMoreMonths />
    </>
  );
}
