import { lazy, Suspense } from "react";
import { getEventCoverById } from "@/lib/actions";
import Image from "next/image";
import { Image as ImageIcon, Loader2 } from "lucide-react";
import { toast } from "sonner";

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
  const DeleteEventLazy = lazy(() => import("./delete-event"));

  let cover = <ImageIcon size={32} />;
  let coverName = "";

  if (cover_id) {
    const { data, error } = await getEventCoverById(cover_id);

    if (error) {
      toast.error("Error fetching event cover");
    } else {
      coverName = data.name;
    }

    cover = (
      <Image
        src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/covers/${data?.created_by}/${cover_id}/${data?.name}`}
        alt={`Cover for ${title}`}
        width={600}
        height={300}
        className="object-cover"
      />
    );
  }
  return (
    <div className="flex items-center justify-center w-full h-full min-h-[330px] border border-border dark:border-border-dark rounded-t-3xl overflow-hidden">
      <Suspense fallback={<Loader2 className="animate-spin" />}>
        <DeleteEventLazy
          createdBy={createdBy}
          eventId={eventId}
          coverId={cover_id}
          coverName={coverName}
        />
      </Suspense>
      {cover}
    </div>
  );
}
