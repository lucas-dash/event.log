import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  Options,
  getPaginatedFilteredEvents,
} from "@/app/(main)/events/actions";
import EventCollection from "./event-collection";
import { Typography } from "../ui/typography";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

type WithoutLink = {
  link?: false;
  linkPath?: never;
};

type ActiveLink = {
  link: boolean;
  linkPath: string;
};

type WithLink = WithoutLink | ActiveLink;

type WithoutFilter = {
  type: "noFilter";
  events: EventType[];
};

type WithFilter = {
  type: "filter";
  options: Options;
} & WithLink;

type EventShowcaseCollectionProps = {
  label: string;
  heading?: "h3" | "h4";
} & (WithFilter | WithoutFilter);

export default async function EventShowcaseCollection({
  label,
  heading = "h3",
  ...props
}: EventShowcaseCollectionProps) {
  let filterEvents: EventType[] = [];

  if (props.type === "filter") {
    const { data, error } = await getPaginatedFilteredEvents(
      1,
      props.options,
      4,
    );

    if (data?.length === 0) return null;

    if (error) {
      throw new Error("Error fetching events collection");
    }

    filterEvents = data;
  }

  return (
    <section className="space-y-4">
      <div className="flex justify-between items-center">
        <Badge variant="section">
          <Typography
            variant={heading}
            className="text-primary-content capitalize"
          >
            {label}
          </Typography>
        </Badge>

        {props.type === "filter" && props.link && (
          <Button asChild size="icon" variant="ghost" className="group">
            <Link
              href={`events/section/${props.linkPath}?options=${props.type === "filter" ? JSON.stringify(props.options) : ""}`}
              aria-label={`Show more ${label} events`}
            >
              <ArrowRight className="group-hover:animate-pulse" />
            </Link>
          </Button>
        )}
      </div>
      {props.type === "noFilter" ? (
        <EventCollection data={props.events} />
      ) : (
        <EventCollection data={filterEvents} />
      )}
    </section>
  );
}
