import SignOut from "@/components/sign-out";
import { getUser } from "@/lib/actions";
import { redirect } from "next/navigation";

type UserIdProps = {
  params: {
    userId: string;
  };
};

export default async function UserId({ params: { userId } }: UserIdProps) {
  const { user, error } = await getUser();

  if (!user) {
    redirect("/auth/login");
  }

  if (error) {
    throw new Error(error.message);
  }

  return (
    <section>
      {`User: ${userId}`}
      <SignOut />
    </section>
  );
}
