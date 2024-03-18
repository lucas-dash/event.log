import { Typography } from "@/components/ui/typography";
import ThemeSwitcher from "../../components/theme-switcher";

export default function AppSetting() {
  return (
    <ul className="bg-foreground dark:bg-foreground-dark rounded-xl px-3 divide-y-2 divide-border dark:divide-border-dark shadow-base dark:shadow-base-dark">
      <li className="flex items-center justify-between flex-wrap py-2">
        <Typography variant="body" className="font-medium text-lg">
          Theme setting
        </Typography>
        <ThemeSwitcher />
      </li>
      <li className="flex items-center justify-between py-2">
        <Typography variant="body" className="font-medium text-lg">
          Default Currency
        </Typography>
        <Typography variant="muted">USD</Typography>
      </li>
      <li className="flex items-center justify-between py-2">
        <Typography variant="body" className="font-medium text-lg">
          Date Localize
        </Typography>
      </li>
    </ul>
  );
}
