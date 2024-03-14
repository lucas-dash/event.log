import { ArrowRight } from "lucide-react";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import Link from "next/link";
import { getPopularEvents } from "@/app/(main)/dashboard/actions";
import EventCard from "./event-card";
import { Typography } from "../ui/typography";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

type WithFilter = {
  filter: false;
  events: EventType[] | null;
};

type WithoutFilter = {
  filter: true;
  type: "greaterThan" | "lessThan" | "equal" | "popular";
  argument?: string;
  script?: string;
};

type EventSectionProps = {
  label: string;
  link?: boolean;
} & (WithFilter | WithoutFilter);

async function eventsFilter(
  type: WithoutFilter["type"],
  script: string = new Date().toISOString(),
  argument: string = "date",
) {
  const supabase = createSupabaseServerClient();

  if (type === "greaterThan") {
    return supabase.from("event").select("*").gt(argument, script).limit(4);
  }
  if (type === "lessThan") {
    return supabase.from("event").select("*").lt(argument, script).limit(4);
  }

  if (type === "equal") {
    return supabase.from("event").select("*").eq(argument, script).limit(4);
  }

  if (type === "popular") {
    return getPopularEvents();
  }
  return supabase.from("event").select("*").limit(4);
}

/**
 * @params {string} label - The label of the section
 * @params {boolean} link - If the section should have a link to the events page
 * @params {boolean} filter - If the section  have data - default is false
 * **FILTER IS TRUE AND YOU HAVE NOT OWN DATA**
 * @params {string} type - The type of the event filter - greaterThan, lessThan, equal
 * @params {string} (optional) script - The script to filter the events - default is today
 * @params {string} (optional) argument - The argument to filter the events - default is date
 * **FILTER IS FALSE AND YOU HAVE OWN DATA**
 * @params {EventType[]} (optional) events - Your fetching events to be displayed
 */

export default async function EventSection({
  label,
  link,
  ...props
}: EventSectionProps) {
  let fetchEvents: EventType[] | null = null;

  if (props.filter === true) {
    const { type, script, argument } = props;

    const { data, error } = await eventsFilter(type, script, argument);

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
        {link && (
          <Button asChild size="icon" variant="ghost" className="group">
            <Link
              href={`/${label.toLowerCase()}`}
              aria-label={`Show more ${label} events`}
            >
              <ArrowRight className="group-hover:animate-pulse" />
            </Link>
          </Button>
        )}
      </div>
      <div className="grid md:grid-cols-2 gap-3 pt-3">
        {!props.filter
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
