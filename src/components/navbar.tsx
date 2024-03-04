import {
  CalendarDays,
  CircleUser,
  Heart,
  LayoutGrid,
  MapPinned,
} from "lucide-react";
import { getUser, getUserProfileById } from "@/lib/actions";
import NavLink from "./nav-link";

type NavbarProps = {
  vertical?: boolean;
  withoutMap?: boolean;
};

export default async function Navbar({ vertical, withoutMap }: NavbarProps) {
  const { user } = await getUser();
  let userProfile = "auth";

  if (user) {
    const { data } = await getUserProfileById(user?.id);
    if (data) {
      userProfile = data?.username;
    }
  }
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
      href: "/favorite",
      label: "Favorite",
      icon: <Heart />,
    },
    {
      href: `/${userProfile}`,
      label: `${userProfile} profile`,
      icon: <CircleUser />,
    },
  ];

  const filteredNavLinks = withoutMap
    ? navLinks.filter((link) => link.label !== "Map")
    : navLinks;

  return (
    <nav
      className={`bg-foreground dark:bg-secondary-light text-copy dark:text-copy-dark py-2 px-2 w-max rounded-2xl shadow-base dark:shadow-base-dark ${vertical && "absolute top-5 left-3"}`}
    >
      <ul className={`flex items-center gap-2 ${vertical && "flex-col"}`}>
        {filteredNavLinks.map(({ href, label, icon }) => {
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
