import { getUser } from "@/lib/actions";
import { Typography } from "@/components/ui/typography";
import { Badge } from "@/components/ui/badge";
import { findSimilarEvents } from "../actions";
import ForyouCard from "./foryou-card";

export default async function ForyouCarousel() {
  const { user } = await getUser();

  if (!user) return null;

  const { data, error } = await findSimilarEvents(user?.id);

  if (data?.length === 0 || error) return null;

  return (
    <section className="space-y-2">
      <Badge variant="section">
        <Typography variant="h2" className="pb-0 px-2 text-primary-content">
          For you
        </Typography>
      </Badge>
      <section className="flex gap-5 overflow-hidden">
        {data?.map((event) => {
          return <ForyouCard key={event.event_id} {...event} />;
        })}
      </section>
    </section>
  );
}
