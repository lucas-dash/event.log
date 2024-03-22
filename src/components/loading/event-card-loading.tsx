import { Skeleton } from "../ui/skeleton";

export default function EventCardLoading() {
  return (
    <Skeleton className="min-h-72 w-full p-1.5 rounded-2xl relative">
      <Skeleton className="h-[190px] w-full bg-slate-300 rounded-xl dark:bg-secondary-light" />
      <div className="absolute inset-x-0 bottom-0 min-h-[88px] flex flex-col justify-between p-2">
        <div className="space-y-2">
          <Skeleton className="h-3 w-28 rounded-full bg-slate-300 dark:bg-secondary-light" />
          <Skeleton className="h-4 w-56 rounded-full bg-slate-300 dark:bg-secondary-light" />
        </div>
        <Skeleton className="h-5 w-24 rounded-full bg-slate-300 dark:bg-secondary-light" />
      </div>
    </Skeleton>
  );
}
