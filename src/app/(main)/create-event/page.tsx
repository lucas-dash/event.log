import { Typography } from "@/components/ui/typography";
import CreateEventForm from "./components/create-event-form";
import AddThumbnail from "./components/add-thumbnail";

export default function CreateEvent() {
  return (
    <section className="my-8">
      <Typography variant="h2" className="pl-10">
        Create Event
      </Typography>
      <article className="bg-foreground dark:bg-foreground-dark rounded-2xl p-4 w-full sm:w-4/5 max-w-[820px] mx-auto space-y-4">
        <AddThumbnail />
        <CreateEventForm />
      </article>
    </section>
  );
}
