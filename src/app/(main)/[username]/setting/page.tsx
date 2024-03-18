import { Badge } from "@/components/ui/badge";
import { getUser, getUserByUsername } from "@/lib/actions";
import { redirect } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AccountSetting from "./components/account-setting";
import SecurityPrivacySetting from "./components/security-privacy-setting";
import AppSetting from "./components/app-setting";

type SettingProfileProps = {
  params: {
    username: string;
  };
};

export async function generateMetadata({
  params: { username },
}: SettingProfileProps) {
  const { user } = await getUser();

  const { data: profile, error } = await getUserByUsername(username);

  if (profile?.user_id !== user?.id || error)
    return { title: "User not found" };

  return {
    title: `${username} Profile Setting`,
    description: "Update your profile settings",
  };
}

export default async function Setting({
  params: { username },
}: SettingProfileProps) {
  const { user } = await getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const { data: profile, error } = await getUserByUsername(username);

  if (profile?.user_id !== user.id) throw new Error("Authorization error");

  if (error) throw new Error(error?.message);

  return (
    <section className="py-10">
      <Badge variant="section" className="text-2xl">
        Profile Setting
      </Badge>

      <Tabs defaultValue="app" className="flex max-sm:flex-col gap-5 py-8">
        <TabsList className="flex flex-wrap sm:flex-col h-max min-w-40 rounded-xl text-copy dark:text-copy-dark shadow-base dark:shadow-base-dark">
          <TabsTrigger value="app" className="text-base">
            App
          </TabsTrigger>
          <TabsTrigger value="account" className="text-base">
            Account
          </TabsTrigger>
          <TabsTrigger value="security" className="text-base">
            Security & Privacy
          </TabsTrigger>
        </TabsList>
        <TabsContent value="app" className="w-full">
          <AppSetting />
        </TabsContent>
        <TabsContent value="account" className="w-full">
          <AccountSetting />
        </TabsContent>
        <TabsContent value="security" className="w-full">
          <SecurityPrivacySetting email={profile.email} />
        </TabsContent>
      </Tabs>
    </section>
  );
}
