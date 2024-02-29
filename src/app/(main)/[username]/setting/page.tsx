import { getUser } from "@/lib/actions";
import { redirect } from "next/navigation";

export default async function Setting() {
  const { user } = await getUser();

  if (!user) {
    redirect("/auth/login");
  }

  return <div>Setting</div>;
}
