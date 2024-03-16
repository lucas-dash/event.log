import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getPopularEvents } from "@/app/(main)/dashboard/actions";
import EventCard from "./event-card";
import { Typography } from "../ui/typography";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

type WithoutFilter = {
  type: "none";
  events: EventType[] | null;
};

export type WithFilter = {
  type: "gt" | "lt" | "eq" | "popular";
  cellRow?: string;
  script?: string;
};

type WithoutLink = {
  link?: false;
  linkId?: never;
};

type ActiveLink = {
  link: boolean;
  linkId: string;
};

type WithLink = WithoutLink | ActiveLink;

type EventSectionProps = {
  label: string;
} & (WithFilter | WithoutFilter) &
  WithLink;

export async function eventsFilter(
  type: WithFilter["type"],
  script: string = new Date().toISOString(),
  cellRow: string = "date",
  limit = 4,
) {
  const supabase = createSupabaseServerClient();

  if (type === "gt") {
    return supabase.from("event").select("*").gt(cellRow, script).limit(limit);
  }
  if (type === "lt") {
    return supabase.from("event").select("*").lt(cellRow, script).limit(limit);
  }

  if (type === "eq") {
    return supabase.from("event").select("*").eq(cellRow, script).limit(limit);
  }

  if (type === "popular") {
    return getPopularEvents();
  }
  return supabase.from("event").select("*").limit(limit);
}

/**
 * @params {string} label - The label of the section
 * @params {boolean} link - If the section should have a link to the events page
 * @params {string} linkId - The id of the page
 * **Type IS TRUE AND YOU HAVE NOT OWN DATA**
 * @params {string} type - The type of the event filter - greaterThan, lessThan, equal, popular
 * @params {string} (optional) script - The script to filter the events - default is today
 * @params {string} (optional) cellRow - The cell row from supabase to filter the events by - default is date
 * **FILTER IS NONE AND YOU HAVE OWN DATA**
 * @params {EventType[]} (optional) events - The events to be displayed
 */

export default async function EventSection({
  label,
  link,
  linkId,
  ...props
}: EventSectionProps) {
  let fetchEvents: EventType[] | null = null;

  if (props.type !== "none") {
    const { type, script, cellRow } = props;

    const { data, error } = await eventsFilter(type, script, cellRow);

    if (data?.length === 0 || error) return null;

    if (data) {
      fetchEvents = data;
    }
  }

  return (
    <section>
      <div className="flex justify-between items-center">
        <Badge variant="section">
          <Typography variant="h3" className="text-lg text-primary-content">
            {label}
          </Typography>
        </Badge>
        {link && linkId && (
          <Button asChild size="icon" variant="ghost" className="group">
            <Link
              href={`events/section/${linkId}?filter=${props.type}${props.type !== "none" && `&cellRow=${props?.cellRow}&script=${props?.script}`}`}
              aria-label={`Show more ${linkId} events`}
            >
              <ArrowRight className="group-hover:animate-pulse" />
            </Link>
          </Button>
        )}
      </div>
      <div className="grid md:grid-cols-2 gap-3 pt-3">
        {props.type === "none"
          ? props.events?.map((event) => (
              <EventCard key={event.event_id} {...event} />
            ))
          : fetchEvents?.map((event) => (
              <EventCard key={event.event_id} {...event} />
            ))}
      </div>
    </section>
  );
}
