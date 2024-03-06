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
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { eventSchema } from "@/lib/validations/event-validation";
import { AlertTriangle, Asterisk, CalendarIcon, Loader2 } from "lucide-react";
import { useState, useTransition } from "react";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import SearchPlacesInput from "@/components/search-places-input";
import { tags } from "@/lib/constants";
import { Checkbox } from "@/components/ui/checkbox";
import Tag from "@/components/tag";
import { createEvent } from "../actions";

export default function CreateEventForm() {
  const [isPending, startTransition] = useTransition();
  const [coord, setCoord] = useState([0, 0]);
  const [address, setAddress] = useState("");

  const form = useForm<z.infer<typeof eventSchema>>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: "",
      description: "",
      date: undefined,
      time: "",
      tags: [],
      tickets_link: "",
      homepage: "",
      price: 1.0,
      schedule: "",
      alerts: "",
    },
  });

  function onSubmit(values: z.infer<typeof eventSchema>) {
    startTransition(async () => {
      // console.log(values);
      const eventData = {
        ...values,
        address,
        coordinates: coord,
      };

      const { error } = await createEvent(eventData);
      if (error) {
        throw new Error(error.message);
      }

      if (!error) {
        setAddress("");
        setCoord([0, 0]);
        form.reset();
      }
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
              <FormLabel className="flex">
                Title
                <Asterisk size={12} className="text-primary" />
              </FormLabel>
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

        <SearchPlacesInput
          setCoord={setCoord}
          setAddress={setAddress}
          address={address}
        />

        <div className="flex items-center justify-center gap-4 w-full flex-wrap">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="flex">
                  Date
                  <Asterisk size={12} className="text-primary" />
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "min-w-[240px] w-full pl-3 text-left font-normal bg-white dark:bg-secondary-light",
                          !field.value && "text-copy dark:text-copy-dark",
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span className="text-copy-light dark:text-copy-light-dark">
                            Pick a date
                          </span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto p-0 rounded-xl"
                    align="start"
                  >
                    <Calendar
                      mode="single"
                      className="dark:bg-secondary rounded-xl"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={[{ before: new Date() }]}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="time"
            render={({ field }) => (
              <FormItem className="w-max">
                <FormLabel className="flex">
                  Start <Asterisk size={12} className="text-primary" />
                </FormLabel>
                <FormControl>
                  <Input
                    type="time"
                    {...field}
                    onChange={field.onChange}
                    required
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
              <FormItem className="w-max">
                <FormLabel className="flex">
                  Price per ticket (USD)
                  <Asterisk size={12} className="text-primary" />
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={1.0}
                    step={0.01}
                    placeholder="$19.99"
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
        </div>

        <FormField
          control={form.control}
          name="tags"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="flex">
                  Tags
                  <Asterisk size={12} className="text-primary" />
                </FormLabel>
              </div>
              <div className="flex gap-2 justify-center flex-wrap">
                {tags.map((tag) => (
                  <FormField
                    key={tag.id}
                    control={form.control}
                    name="tags"
                    render={({ field }) => {
                      return (
                        <FormItem key={tag.id}>
                          <FormControl>
                            <Checkbox
                              className="sr-only"
                              checked={field.value?.includes(tag.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, tag.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== tag.id,
                                      ),
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="cursor-pointer">
                            <Tag
                              {...tag}
                              className={`${field.value.includes(tag.id) ? "bg-primary-light dark:bg-primary-light" : ""}`}
                            />
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex">
                Description <Asterisk size={12} className="text-primary" />
              </FormLabel>
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
              <FormLabel className="flex">
                Schedule <Asterisk size={12} className="text-primary" />
              </FormLabel>
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
        <FormField
          control={form.control}
          name="alerts"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-1">
                <AlertTriangle size={16} />
                Alert
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="No smoking..."
                  maxLength={200}
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
