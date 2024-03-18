import { Input } from "@/components/ui/input";
import { Typography } from "@/components/ui/typography";

export default function AccountSetting() {
  return (
    <ul className="bg-foreground dark:bg-foreground-dark rounded-xl px-3 divide-y-2 divide-border dark:divide-border-dark shadow-base dark:shadow-base-dark">
      <li className="flex items-center justify-between py-2 flex-wrap">
        <Typography variant="body" className="font-medium text-lg">
          Change Avatar
        </Typography>
        <Input type="file" className="w-min" />
      </li>
      <li className="flex items-center justify-between py-2 flex-wrap">
        <Typography variant="body" className="font-medium text-lg">
          Change Username
        </Typography>
        <Input type="text" placeholder="john-doe" className="w-max" />
      </li>
    </ul>
  );
}
