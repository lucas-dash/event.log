import EventSection from "@/components/event-section";
import { getEvents } from "@/lib/actions";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type ProfileEventsProps = {
  user_id: string;
};
export default async function ProfileEvents({ user_id }: ProfileEventsProps) {
  const supabase = createSupabaseServerClient();
  const { data: joined } = await supabase
    .from("joined")
    .select("event_id")
    .eq("user_id", user_id);

  const { data: events } = await getEvents();

  const userEvents =
    events?.filter((event) => {
      return joined?.some((ev) => ev.event_id === event.event_id);
    }) ?? null;

  return (
    <section className="py-8">
      <EventSection label="Joined Events" events={userEvents} filter={false} />
    </section>
  );
}
