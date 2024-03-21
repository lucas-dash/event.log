"use client";

import Image from "next/image";
import { Image as ImageIcon } from "lucide-react";

type EventCardThumbnailProps = {
  title: string;
  createdBy: string | null | undefined;
  cover_id: string | null | undefined;
  name: string | null | undefined;
};
export default function EventCardThumbnail({
  title,
  cover_id,
  createdBy,
  name,
}: EventCardThumbnailProps) {
  return (
    <div className="h-full w-full rounded-xl relative bg-copy-lighter dark:bg-copy-lighter-dark overflow-hidden">
      {createdBy ? (
        <Image
          src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/covers/${createdBy}/${cover_id}/${name}`}
          alt={`${title} event cover`}
          fill
          priority
          sizes="(max-width: 768px) 30vw, (max-width: 1200px) 25vw, 20vw"
          className="object-cover w-full h-full rounded-lg group-hover:scale-110 duration-300 transition-transform"
        />
      ) : (
        <div className="flex items-center justify-center min-h-[152px]">
          <ImageIcon size={32} />
        </div>
      )}
    </div>
  );
}
