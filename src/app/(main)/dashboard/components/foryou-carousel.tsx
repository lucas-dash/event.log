import { getUser } from "@/lib/actions";
import { Typography } from "@/components/ui/typography";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { findSimilarEvents } from "../actions";
import ForyouCard from "./foryou-card";

export default async function ForyouCarousel() {
  const { user } = await getUser();

  if (!user) return null;

  const { data, error } = await findSimilarEvents(user?.id);

  if (data?.length === 0 || error) return null;

  return (
    <section>
      <Badge variant="section">
        <Typography
          variant="h2"
          className="pb-0 text-2xl px-2 text-primary-content"
        >
          For you
        </Typography>
      </Badge>

      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="py-4">
          {data.map((event) => (
            <CarouselItem
              key={event.event_id}
              className="min-[672px]:basis-1/2 lg:basis-1/3 xl:basis-1/4"
            >
              <ForyouCard {...event} userId={user.id} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious variant="outline" />
        <CarouselNext variant="outline" />
      </Carousel>
    </section>
  );
}
