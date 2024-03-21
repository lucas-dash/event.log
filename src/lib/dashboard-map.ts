import { Options } from "@/app/(main)/events/actions";

type DashboardMapType = {
  label: string;
  link: boolean;
  linkPath: string;
  type: "filter";
  options: Options;
};

export const dashboardMap: DashboardMapType[] = [
  {
    label: "Popular Events",
    link: true,
    linkPath: "popular",
    type: "filter",
    options: { popular: true, byDate: false },
  },
  {
    label: "Upcoming Events",
    link: true,
    linkPath: "upcoming",
    type: "filter" as const,
    options: { greaterThan: { cell: "date", value: new Date().toISOString() } },
  },
  {
    label: "Past events",
    link: true,
    linkPath: "past-events",
    type: "filter",
    options: {
      lessThan: { cell: "date", value: new Date().toISOString() },
      ascending: false,
    },
  },
];
