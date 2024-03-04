"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  LogOut,
  Moon,
  MoreVertical,
  Settings,
  Sun,
  SunMoon,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signOut } from "@/app/(main)/auth/actions";

type ProfileActionsProps = {
  username: string;
};

export default function ProfileActions({ username }: ProfileActionsProps) {
  const { setTheme } = useTheme();
  const router = useRouter();

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      throw new Error(error.message);
    }
    router.push("/auth/login");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          aria-label="Profile Actions"
          className="h-8 w-8"
        >
          <MoreVertical />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link
              href={`/${username}/setting`}
              className="flex items-center w-full"
            >
              <Settings className="mr-2" size={18} />
              <span>Settings</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 mr-2" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 mr-2" />
            <span>Theme</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem
                onClick={() => setTheme("light")}
                className="cursor-pointer"
              >
                <Sun className="mr-2 h-4 w-4" />
                <span>Light</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setTheme("dark")}
                className="cursor-pointer"
              >
                <Moon className="mr-2 h-4 w-4" />
                <span>Dark</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => setTheme("system")}
                className="cursor-pointer"
              >
                <SunMoon className="mr-2 h-4 w-4" />
                <span>System</span>
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>

        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleSignOut}
          className="cursor-pointer focus:bg-red-500 dark:focus:bg-primary-dark"
        >
          <LogOut className="mr-2" size={18} />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
