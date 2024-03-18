import { getUser } from "@/lib/actions";
import FavoriteButton from "./favorite-button";
import JoinButton from "./join-button";

type EventActionsProps = {
  event_id: string;
  orientation?: "vertical" | "horizontal";
};
export default async function EventActions({
  event_id,
  orientation = "vertical",
}: EventActionsProps) {
  const { user } = await getUser();

  if (!user) return null;

  return (
    <div
      className={`flex gap-2 ${orientation === "vertical" ? "flex-col" : ""}`}
    >
      <FavoriteButton eventId={event_id} userId={user.id} />
      <JoinButton eventId={event_id} userId={user.id} />
    </div>
  );
}
