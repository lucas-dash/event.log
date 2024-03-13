import { getUser } from "@/lib/actions";
import FavoriteButton from "./favorite-button";
import {
  getSingleFavoriteEventById,
  getSingleJoinedEventById,
} from "./actions";
import JoinButton from "./join-button";

type EventActionsProps = {
  event_id: string;
};
export default async function EventActions({ event_id }: EventActionsProps) {
  const { user } = await getUser();

  if (!user) {
    return null;
  }

  const isFavorite = getSingleFavoriteEventById(event_id, user.id);
  const isJoined = getSingleJoinedEventById(event_id, user.id);

  const [favoriteResponse, joinedResponse] = await Promise.all([
    isFavorite,
    isJoined,
  ]);

  return (
    <div className="flex flex-col gap-2">
      <FavoriteButton
        event_id={event_id}
        user_id={user.id}
        favoriteRes={favoriteResponse}
      />
      <JoinButton
        event_id={event_id}
        user_id={user.id}
        joinedRes={joinedResponse}
      />
    </div>
  );
}
