"use client";

import { signOut } from "@/app/(main)/auth/actions";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
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
    <Button
      variant="destructive"
      size="icon"
      onClick={handleSignOut}
      className="h-8 w-8"
    >
      <LogOut size={20} />
    </Button>
  );
}
