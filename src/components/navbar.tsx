import {
  CalendarDays,
  CircleUser,
  Heart,
  LayoutGrid,
  MapPinned,
} from "lucide-react";
import NavLink from "./nav-link";

const navLinks = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: <LayoutGrid />,
  },
  {
    href: "/events",
    label: "Events",
    icon: <CalendarDays />,
  },
  {
    href: "/",
    label: "Map",
    icon: <MapPinned />,
  },
  {
    href: "/favorites",
    label: "Favorites",
    icon: <Heart />,
  },
  {
    href: "/profile",
    label: "Profile",
    icon: <CircleUser />,
  },
];

export default function Navbar({ vertical }: { vertical?: boolean }) {
  // todo position variant
  return (
    <nav className="bg-foreground dark:bg-foreground-dark text-copy dark:text-copy-dark py-2 px-2 w-max rounded-2xl shadow-base dark:shadow-base-dark absolute top-5 left-3">
      <ul className={`flex items-center gap-2 ${vertical && "flex-col"}`}>
        {navLinks.map(({ href, label, icon }) => {
          return (
            <li key={label}>
              <NavLink href={href} label={label} icon={icon} />
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
