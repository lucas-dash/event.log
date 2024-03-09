import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { format } from "date-fns";
import { Plus } from "lucide-react";
import Link from "next/link";

type EventFooterProps = {
  time: string;
  date: string;
  ticketsLink: string | null;
};
export default function EventFooter({
  date,
  time,
  ticketsLink,
}: EventFooterProps) {
  return (
    <>
      <div className="flex items-center gap-4 w-full flex-wrap justify-center pb-8">
        <div className="bg-secondary dark:bg-secondary-dark rounded-xl grid place-items-center min-w-[150px] p-3">
          <Typography className="text-secondary-content">Time</Typography>
          <Typography
            className="text-secondary-content text-xl font-bold [&:not(:first-child)]:mt-2"
            aria-label="Event Start Time"
            aria-description={time}
          >
            {time}
          </Typography>
        </div>

        <div className="bg-secondary dark:bg-secondary-dark rounded-xl grid place-items-center min-w-[150px] p-3">
          <Typography className="text-secondary-content">Date</Typography>
          <Typography
            className="text-secondary-content text-xl font-bold [&:not(:first-child)]:mt-2 break-words text-center"
            aria-label="Event Date"
            aria-description={format(date, "PPP")}
          >
            {format(date, "PPP")}
          </Typography>
        </div>
      </div>

      <div className="w-full flex items-center flex-wrap justify-center gap-4">
        <Button>
          <Plus size={20} />
          Join Event
        </Button>
        <Button asChild variant="outline">
          <Link href={ticketsLink || ""}>
            {ticketsLink ? "Get Tickets" : "Tickets on site"}
          </Link>
        </Button>
      </div>
    </>
  );
}
