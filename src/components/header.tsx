import Image from "next/image";
import Navbar from "./navbar";

export default function Header() {
  return (
    <header className="w-full flex items-center justify-end min-[321px]:justify-between sm:container max-sm:px-2 fixed top-3 left-0 right-0 z-50">
      <div className="w-12 h-12 bg-primary-light rounded-full max-[320px]:hidden relative flex items-center justify-center">
        <Image src="/logo.svg" alt="Event log logo" width={40} height={40} />
      </div>
      <Navbar />
    </header>
  );
}
