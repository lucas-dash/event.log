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
import { Textarea } from "@/components/ui/textarea";

export default function CreateEventForm() {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof eventSchema>>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: "",
      description: "",
      address: "",
      date: "",
      time: "",
      tickets_link: "",
      homepage: "",
      // organizer: "",
      price: 0,
      schedule: "",
      // faq: "",
      // alerts: "",
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Art Festival"
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
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Place</FormLabel>
              <FormControl>
                <Input
                  placeholder="Select"
                  {...field}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center gap-3 w-full justify-center">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Date</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Select"
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
            name="time"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Time</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Select"
                    {...field}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="About event"
                  maxLength={300}
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
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price per ticket</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="$19.99"
                  min={0}
                  {...field}
                  onChange={(e) => {
                    field.onChange(Number(e.target.value));
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tickets_link"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ticket Link</FormLabel>
              <FormControl>
                <Input
                  type="url"
                  placeholder="https://"
                  {...field}
                  value={field.value ?? ""}
                  // onChange={field.onChange}
                  onChange={(e) => {
                    const value = e.target.value === "" ? null : e.target.value;
                    field.onChange(value);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="homepage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Homepage</FormLabel>
              <FormControl>
                <Input
                  type="url"
                  placeholder="https://"
                  {...field}
                  value={field.value ?? ""}
                  // onChange={field.onChange}
                  onChange={(e) => {
                    const value = e.target.value === "" ? null : e.target.value;
                    field.onChange(value);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="schedule"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Schedule</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Start: 19:00..."
                  maxLength={500}
                  {...field}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          {isPending && <Loader2 className="animate-spin mr-1" />}
          Create Event
        </Button>
      </form>
    </Form>
  );
}
