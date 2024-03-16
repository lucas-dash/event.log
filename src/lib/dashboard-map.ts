type DashboardMapType = {
  id: string;
  label: string;
  link: boolean;
  filter: true | false;
} & WithFilter;

type WithFilter = {
  type: "gt" | "lt" | "eq" | "popular";
  cellRow?: string;
  script?: string;
};

export const dashboardMap: DashboardMapType[] = [
  {
    id: "popular",
    label: "Popular",
    link: true,
    filter: true,
    type: "popular",
    cellRow: undefined,
    script: undefined,
  },
  {
    id: "upcoming",
    label: "Upcoming",
    link: true,
    filter: true,
    type: "gt",
    cellRow: "date",
    script: new Date().toISOString(),
  },
  {
    id: "past",
    label: "Past events",
    link: true,
    filter: true,
    type: "lt",
    cellRow: "date",
    script: new Date().toISOString(),
  },
];
