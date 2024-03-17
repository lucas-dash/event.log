import { Typography } from "@/components/ui/typography";
import { UserRound } from "lucide-react";
import { getUser } from "@/lib/actions";
import Image from "next/image";
import ProfileActions from "./profile-actions";

type ProfileHeaderProps = {
  profileData: Profile;
};
export default async function ProfileHeader({
  profileData,
}: ProfileHeaderProps) {
  const { user } = await getUser();

  const { avatar_url, username, user_id } = profileData;

  return (
    <section className="w-4/5 mx-auto flex items-center justify-center flex-col gap-4">
      <div className="w-52 h-52 rounded-full bg-foreground/60 dark:bg-foreground-dark/60 border-2 border-border dark:border-border-dark flex items-center justify-center">
        {avatar_url ? (
          <Image
            src={avatar_url}
            alt={`${username} profile image`}
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
        <Typography variant="h4">@{username}</Typography>
        {user?.id === user_id && <ProfileActions username={username} />}
      </div>
    </section>
  );
}
