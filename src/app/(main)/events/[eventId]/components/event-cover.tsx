import { getEventCoverById } from "@/lib/actions";
import Image from "next/image";
import { Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";

type EventCoverProps = {
  cover_id: string | null;
  title: string;
};
export default async function EventCover({ cover_id, title }: EventCoverProps) {
  let cover = <ImageIcon size={32} />;

  if (cover_id) {
    const { data, error } = await getEventCoverById(cover_id);

    if (error) {
      toast.error("Error fetching event cover");
    }

    cover = (
      <Image
        src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/covers/${data?.created_by}/${cover_id}/${data?.name}`}
        alt={`Cover for ${title}`}
        width={600}
        height={300}
        className="object-cover rounded-2xl"
      />
    );
  }
  return (
    <div className="flex items-center justify-center w-full h-full min-h-[330px] border border-border dark:border-border-dark rounded-t-3xl overflow-hidden">
      {cover}
    </div>
  );
}
