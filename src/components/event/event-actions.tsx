import { getUser } from "@/lib/actions";
import FavoriteButton from "./favorite-button";
import JoinButton from "./join-button";

type EventActionsProps = {
  event_id: string;
};
export default async function EventActions({ event_id }: EventActionsProps) {
  const { user } = await getUser();

  if (!user) return null;

  return (
    <div className="flex flex-col gap-2">
      <FavoriteButton eventId={event_id} userId={user.id} />
      <JoinButton eventId={event_id} userId={user.id} />
    </div>
  );
}
