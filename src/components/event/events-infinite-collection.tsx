import {
  Options,
  getPaginatedFilteredEvents,
} from "@/app/(main)/events/actions";
import LoadMore from "./load-more";
import EmptyState from "../empty-state";
import EventCollection from "./event-collection";
import { Badge } from "../ui/badge";
import { Typography } from "../ui/typography";

type EventsInfiniteCollectionProps = {
  label: string;
  heading?: "h3" | "h4";
  emptyStateTitle: string;
  options?: Options;
};

export default async function EventsInfiniteCollection({
  label,
  heading = "h3",
  emptyStateTitle,
  options,
}: EventsInfiniteCollectionProps) {
  const { data, error } = await getPaginatedFilteredEvents(1, options);

  if (error) throw new Error(error.message);

  if (data.length === 0) return <EmptyState title={emptyStateTitle} />;

  return (
    <>
      <Badge variant="section" className="mb-4">
        <Typography
          variant={heading}
          className="text-primary-content capitalize"
        >
          {label}
        </Typography>
      </Badge>
      <EventCollection data={data} />
      <LoadMore options={options} />
    </>
  );
}
