import Image from "next/image";
import { Typography } from "./ui/typography";
import { Badge } from "./ui/badge";

type EmptyStateProps = {
  title: string;
  state: "events" | "favorites" | "search";
};

export default function EmptyState({
  title,
  state = "events",
}: EmptyStateProps) {
  let image = "/events-empty.svg";

  if (state === "events") image = "/noevents.svg";
  if (state === "favorites") image = "/nofavorite.svg";
  if (state === "search") image = "/notfound.svg";

  return (
    <section className="flex items-center justify-center gap-5 flex-col py-10 w-full">
      <Badge variant="section">
        <Typography
          variant="h2"
          className="text-center pb-0 text-primary-content"
        >
          {title}
        </Typography>
      </Badge>

      <Image
        src={image}
        alt="No events found"
        width={300}
        height={300}
        className="h-[350px] w-[350px]"
      />
    </section>
  );
}
