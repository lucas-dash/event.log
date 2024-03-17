import { Skeleton } from "../ui/skeleton";

export default function EventCardLoading() {
  return (
    <Skeleton className="p-2 flex gap-2 sm:gap-3 min-h-36">
      <Skeleton className="max-w-32 min-w-[80px] w-full rounded-lg bg-slate-300 dark:bg-secondary-light" />
      <div className="space-y-2">
        <Skeleton className="h-3 w-36 rounded-full bg-slate-300 dark:bg-secondary-light" />
        <Skeleton className="h-3 w-24 rounded-full bg-slate-300 dark:bg-secondary-light" />
      </div>
    </Skeleton>
  );
}
