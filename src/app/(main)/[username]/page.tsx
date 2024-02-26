import SignOut from "@/components/sign-out";
import { getUser } from "@/lib/actions";
import { redirect } from "next/navigation";

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
      {`User: ${username}`}
      <SignOut />
    </section>
  );
}
