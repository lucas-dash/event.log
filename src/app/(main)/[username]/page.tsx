import { getUser } from "@/lib/actions";
import { redirect } from "next/navigation";
import ProfileHeader from "./components/profile-header";

type UserIdProps = {
  params: {
    username: string;
  };
};

export default async function UserId({ params: { username } }: UserIdProps) {
  const { user } = await getUser();

  if (!user) {
    redirect("/auth");
  }

  return (
    <section>
      <ProfileHeader username={username} />
    </section>
  );
}
