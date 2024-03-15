import Image from "next/image";
import { Typography } from "./ui/typography";

type EmptyStateProps = {
  title: string;
};

export default function EmptyState({ title }: EmptyStateProps) {
  return (
    <section className="flex items-center justify-center flex-col py-10">
      <Typography variant="h2" className="text-center">
        {title}
      </Typography>
      <Image src="/nofavorite.svg" alt="No events" width={200} height={200} />
    </section>
  );
}
