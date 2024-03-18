"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdatePasswordSchema } from "@/lib/validations/profile-validation";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { updateUserPassword, verifyCurrentPassword } from "../actions";

export default function ChangePasswordForm() {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof UpdatePasswordSchema>>({
    resolver: zodResolver(UpdatePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  function onSubmit(data: z.infer<typeof UpdatePasswordSchema>) {
    startTransition(async () => {
      const { error } = await verifyCurrentPassword(data.currentPassword);

      if (error?.message) {
        toast.warning("Wrong current password!");
        return;
      }

      const { error: UpdateError } = await updateUserPassword(data.newPassword);
      if (!UpdateError?.message) {
        toast.success("Password has been succesfully change!");
        form.reset();
      } else {
        toast.error(error?.message);
      }
    });
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-2 w-full sm:w-4/5 max-w-[320px] mx-auto"
      >
        <FormField
          control={form.control}
          name="currentPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="******"
                  {...field}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="******"
                  {...field}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmNewPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="******"
                  {...field}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full"
          disabled={isPending}
          aria-disabled={isPending}
        >
          {isPending && <Loader2 className="animate-spin mr-1" />}
          Update Password
        </Button>
      </form>
    </Form>
  );
}
