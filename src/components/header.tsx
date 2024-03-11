import Image from "next/image";
import Link from "next/link";
import Navbar from "./navbar";

export default function Header() {
  return (
    <header className="w-full h-full flex items-center justify-end min-[331px]:justify-between sm:container max-sm:px-2 py-2">
      <div className="w-12 h-12 bg-foreground rounded-full max-[330px]:hidden relative flex items-center justify-center">
        <Link
          href="/dashboard"
          className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:rounded-2xl focus-visible:ring-offset-2 ring-offset-white dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 overflow-hidden"
        >
          <Image
            src="/event-log-icon.jpg"
            alt="Event log logo"
            className="rounded-2xl"
            width={120}
            height={120}
            priority
          />
          <span className="sr-only">Dashboard</span>
        </Link>
      </div>
      <Navbar />
    </header>
  );
}
