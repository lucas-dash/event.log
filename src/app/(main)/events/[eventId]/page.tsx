import { getEventById } from "@/lib/actions";
import { notFound } from "next/navigation";
import EventPage from "./components/event-page";

type EventIdProps = {
  params: {
    eventId: string;
  };
};

export async function generateMetadata({ params: { eventId } }: EventIdProps) {
  const { data } = await getEventById(eventId);

  if (!data) {
    return {
      title: "Event not found",
    };
  }

  if (!data.title) {
    notFound();
  }

  return {
    title: `${data.title}`,
    description: `${data.title} event`,
  };
}

export default async function EventId({ params: { eventId } }: EventIdProps) {
  const { data, error } = await getEventById(eventId);

  if (!data) {
    notFound();
  }
  if (error) {
    throw new Error("Event not found");
  }

  return (
    <section className="py-5">
      <EventPage {...data} />
    </section>
  );
}
