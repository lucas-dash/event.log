import { Typography } from "@/components/ui/typography";
import { getUserByUsername } from "@/lib/actions";
import { UserRound } from "lucide-react";
import Image from "next/image";
import ProfileActions from "./profile-actions";

type ProfileHeaderProps = {
  username: string;
};
export default async function ProfileHeader({ username }: ProfileHeaderProps) {
  const { data, error } = await getUserByUsername(username);

  if (!data) {
    throw new Error("User not found!");
  }

  if (error) {
    throw new Error(error.message);
  }

  return (
    <section className="w-4/5 mx-auto flex items-center justify-center flex-col gap-4">
      <div className="w-52 h-52 rounded-full bg-foreground/60 dark:bg-foreground-dark/60 border-2 border-border dark:border-border-dark flex items-center justify-center">
        {data.avatar_url ? (
          <Image
            src={data.avatar_url}
            alt={`${data.username} profile image`}
            width={250}
            height={250}
            loading="lazy"
            className="rounded-full"
          />
        ) : (
          <UserRound size={28} className="w-20 h-20" />
        )}
      </div>
      <div className="flex items-center gap-2">
        <Typography variant="h4">@{data?.username}</Typography>
        <ProfileActions username={data.username} />
      </div>
    </section>
  );
}
