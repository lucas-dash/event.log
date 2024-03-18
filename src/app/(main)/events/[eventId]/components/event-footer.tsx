import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";

type EventFooterProps = {
  description: string;
  homepage: string | null;
  alerts: string | null;
  schedule: string | null;
};
export default function EventFooter({
  description,
  homepage,
  alerts,
  schedule,
}: EventFooterProps) {
  return (
    <article className="px-5 pt-8 flex flex-col gap-5">
      <div>
        <Typography variant="h4">Description</Typography>
        <Typography variant="body" className="[&:not(:first-child)]:mt-2">
          {description}
        </Typography>
      </div>

      {schedule && (
        <div>
          <Typography variant="h4">Schedule</Typography>
          <Typography variant="body" className="[&:not(:first-child)]:mt-2">
            {schedule}
          </Typography>
        </div>
      )}

      <div>
        {homepage && (
          <div className="flex flex-col w-full items-start">
            <Typography variant="h5">Homepage</Typography>
            <Button asChild variant="link" className="p-0">
              <Link href={homepage} className="break-all text-wrap">
                {homepage}
              </Link>
            </Button>
          </div>
        )}
        {alerts && (
          <div className="flex flex-col w-full items-start">
            <Typography variant="h5" className="flex items-center gap-1">
              <AlertTriangle size={20} />
              Alerts
            </Typography>
            <Typography variant="body" className="[&:not(:first-child)]:mt-2">
              {alerts}
            </Typography>
          </div>
        )}
      </div>
    </article>
  );
}
