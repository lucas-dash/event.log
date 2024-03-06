import { getUser } from "@/lib/actions";
import { Typography } from "@/components/ui/typography";
import Uploader from "@/components/uploader";
import { redirect } from "next/navigation";
import CreateEventForm from "./components/create-event-form";

export default async function CreateEvent() {
  const { user } = await getUser();

  if (!user) {
    redirect("/auth");
  }

  return (
    <section className="py-8">
      <Typography variant="h2" className="pl-10">
        Create Event
      </Typography>
      <article className="bg-foreground dark:bg-foreground-dark rounded-2xl p-4 w-full sm:w-4/5 max-w-[820px] mx-auto space-y-4">
        <Uploader />
        <CreateEventForm />
      </article>
    </section>
  );
}
