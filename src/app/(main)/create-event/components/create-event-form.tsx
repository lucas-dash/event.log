"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { eventSchema } from "@/lib/validations/event-validation";
import { Loader2 } from "lucide-react";
import { useTransition } from "react";

export default function CreateEventForm() {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof eventSchema>>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: "",
      description: "",
      adress: "",
      date: "",
      time: "",
      tickets_link: "",
      homepage: "",
      organizer: "",
      price: 0,
      schedule: "",
      faq: "",
      alerts: "",
    },
  });

  function onSubmit(values: z.infer<typeof eventSchema>) {
    startTransition(async () => {
      console.log(values);
      // const { error } = await loginWithEmail(values);
      // if (error) {
      //   throw new Error(error.message);
      // }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input
                  placeholder="name@email.com"
                  autoComplete="email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          {isPending && <Loader2 className="animate-spin mr-1" />}
          Login
        </Button>
      </form>
    </Form>
  );
}
