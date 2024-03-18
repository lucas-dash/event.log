import { getUser } from "@/lib/actions";
import DeleteEvent from "./delete-event";
import EditEvent from "./edit-event";

type CreatorActionsProps = {
  eventId: string;
  createdBy: string;
  coverId: string | null;
  coverName: string | null;
};
export default async function CreatorActions({
  eventId,
  coverId,
  coverName,
  createdBy,
}: CreatorActionsProps) {
  const { user } = await getUser();

  if (user?.id !== createdBy) return null;

  return (
    <div className="bg-foreground dark:bg-foreground-dark rounded-xl flex flex-col gap-2 absolute right-4 top-4 z-40 p-1">
      <EditEvent eventId={eventId} />
      <DeleteEvent
        coverId={coverId}
        coverName={coverName}
        createdBy={createdBy}
        eventId={eventId}
      />
    </div>
  );
}
