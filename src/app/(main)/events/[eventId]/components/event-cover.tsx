import { lazy, Suspense } from "react";
import { getEventCoverById } from "@/lib/actions";
import Image from "next/image";
import { Image as ImageIcon, Loader2 } from "lucide-react";
import { toast } from "sonner";

const CreateActions = lazy(() => import("./creator-actions"));

type EventCoverProps = {
  cover_id: string | null;
  title: string;
  eventId: string;
  createdBy: string;
};
export default async function EventCover({
  cover_id,
  title,
  createdBy,
  eventId,
}: EventCoverProps) {
  let coverName = null;
  let coverURL = "";

  if (cover_id) {
    const { data, error } = await getEventCoverById(cover_id);

    if (error) {
      toast.error("Error fetching event cover");
    } else {
      coverName = data.name;
      coverURL = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/covers/${data?.created_by}/${cover_id}/${data?.name}`;
    }
  }
  return (
    <div className="flex items-center justify-center w-full h-full min-h-[360px] border border-border dark:border-border-dark rounded-t-3xl overflow-hidden relative">
      <Suspense fallback={<Loader2 className="animate-spin" />}>
        <CreateActions
          createdBy={createdBy}
          eventId={eventId}
          coverId={cover_id}
          coverName={coverName}
        />
      </Suspense>

      {coverURL && (
        <Image
          src={`${coverURL}`}
          alt={`Cover for ${title}`}
          fill
          className="w-full h-full object-cover blur-2xl"
        />
      )}

      {coverURL ? (
        <div className="relative">
          <Image
            src={`${coverURL}`}
            alt={`Cover for ${title}`}
            width={600}
            height={500}
            priority
            className="object-cover rounded-xl"
          />
        </div>
      ) : (
        <ImageIcon size={32} />
      )}
    </div>
  );
}
