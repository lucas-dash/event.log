"use client";

import { signOut } from "@/app/(main)/auth/actions";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export default function SignOut() {
  const router = useRouter();

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      throw new Error(error.message);
    }
    router.push("/auth/login");
  };

  return (
    <Button variant="destructive" onClick={handleSignOut}>
      Sign Out
    </Button>
  );
}
