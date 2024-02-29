import { getUser } from "@/lib/actions";
import { redirect } from "next/navigation";

export default async function Favorite() {
  const { user } = await getUser();

  if (!user) {
    redirect("/auth/login");
  }

  return <section>Favorite</section>;
}
