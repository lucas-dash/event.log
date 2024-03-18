import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import ChangePasswordForm from "./change-password-form";

type SecurityPrivacySettingProps = {
  email: string;
};

export default function SecurityPrivacySetting({
  email,
}: SecurityPrivacySettingProps) {
  return (
    <ul className="bg-foreground dark:bg-foreground-dark rounded-xl px-3 divide-y-2 divide-border dark:divide-border-dark shadow-base dark:shadow-base-dark">
      <li className="flex items-center flex-wrap gap-2 justify-between py-2">
        <Typography variant="body" className="font-medium text-lg">
          E-mail address
        </Typography>
        <Typography variant="muted">{email}</Typography>
      </li>
      <li className="flex flex-col gap-2 py-2">
        <Typography variant="body" className="font-medium text-lg">
          Change password
        </Typography>
        <ChangePasswordForm />
      </li>
      <li className="flex items-center justify-between py-2">
        <Typography variant="body" className="font-medium text-lg">
          Delete account
        </Typography>
        <Button variant="destructive">Delete</Button>
      </li>
    </ul>
  );
}
