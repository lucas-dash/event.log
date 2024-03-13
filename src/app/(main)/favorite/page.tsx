import EventSection from "@/components/event/event-section";
import { getFavoriteEventsByUserId, getUser } from "@/lib/actions";
import { redirect } from "next/navigation";
import EmptyState from "@/components/empty-state";

export default async function Favorite() {
  const { user } = await getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const { data: favorite, error } = await getFavoriteEventsByUserId(user.id);

  if (favorite?.length === 0)
    return (
      <div className="flex items-center justify-center min-h-main">
        <EmptyState title="No Favorite Events yet." />
      </div>
    );

  if (error) {
    throw new Error(error?.message);
  }

  return (
    <section className="py-10">
      <EventSection events={favorite} label="Favorite Events" filter={false} />
    </section>
  );
}
