import { getUserByUsername } from "@/lib/actions";
import EmptyState from "@/components/empty-state";
import ProfileHeader from "./components/profile-header";
import ProfileEvents from "./components/profile-events";

type UserProfileProps = {
  params: {
    username: string;
  };
};

export async function generateMetadata({
  params: { username },
}: UserProfileProps) {
  const { data: profile, error } = await getUserByUsername(username);

  if (!profile || error) return { title: "User not found" };

  return {
    title: `${username} Profile`,
  };
}

export default async function UserProfile({
  params: { username },
}: UserProfileProps) {
  const { data: profile, error } = await getUserByUsername(username);

  if (!profile || error) {
    return (
      <div className="grid place-items-center min-h-main">
        <EmptyState title="User not found" state="search" />
      </div>
    );
  }

  return (
    <section className="py-10">
      <ProfileHeader profileData={profile} />
      <ProfileEvents userId={profile.user_id} />
    </section>
  );
}
