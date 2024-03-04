import { getUser } from "@/lib/actions";
import { redirect } from "next/navigation";
import ProfileHeader from "./components/profile-header";
import ProfileEvents from "./components/profile-events";

export const revalidate = 60;

type UserProfileProps = {
  params: {
    username: string;
  };
};

export default async function UserProfile({
  params: { username },
}: UserProfileProps) {
  const { user } = await getUser();

  if (!user) {
    redirect("/auth");
  }

  return (
    <section>
      <ProfileHeader username={username} />
      <ProfileEvents user_id={user.id} />
    </section>
  );
}
