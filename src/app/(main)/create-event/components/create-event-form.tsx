"use client";

import { createSupabaseClient } from "@/lib/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { useState, useTransition } from "react";

import Uppy from "@uppy/core";
import Tus from "@uppy/tus";
import { Dashboard } from "@uppy/react";
import "@uppy/core/dist/style.min.css";
import "@uppy/dashboard/dist/style.min.css";

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
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

import { format } from "date-fns";
import { tags } from "@/lib/tags";
import SearchPlacesInput from "@/components/search-places-input";
import Tag from "@/components/tag";
import { createEvent } from "../actions";

type CreateEventFormProps = {
  userId: string;
  type: "Create" | "Edit";
};

export default function CreateEventForm({ userId }: CreateEventFormProps) {
  const [isPending, startTransition] = useTransition();
  const [coord, setCoord] = useState<[number, number] | null>(null);
  const [address, setAddress] = useState("");

  const onBeforeRequest = async (req: any) => {
    const supabase = createSupabaseClient();

    const { data } = await supabase.auth.getSession();
    req.setHeader("Authorization", `Bearer ${data?.session?.access_token}`);
  };

  const [uppy] = useState(() =>
    new Uppy({
      restrictions: {
        maxNumberOfFiles: 1,
        allowedFileTypes: ["image/*"],
        maxFileSize: 5 * 1024 * 1024,
      },
    }).use(Tus, {
      endpoint: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/upload/resumable`,
      onBeforeRequest,
      allowedMetaFields: [
        "bucketName",
        "objectName",
        "contetnType",
        "cacheControl",
      ],
    }),
  );

  uppy.on("file-added", (files) => {
    // eslint-disable-next-line no-param-reassign
    files.meta = {
      ...files.meta,
      bucketName: "covers",
      contentType: files.type,
    };
  });

  const handleUploads = async (randomUUID: string) => {
    if (uppy.getFiles().length === 0) return;
    uppy.setFileMeta(uppy.getFiles()[0].id, {
      objectName: `${userId}/${randomUUID}/${uppy.getFiles()[0].name}`,
    });

    uppy.upload();
  };

  const form = useForm<z.infer<typeof eventSchema>>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: "",
      description: "",
      date: undefined,
      time: "",
      place: "",
      tags: [],
      tickets_link: "",
      homepage: "",
      price: "",
      price_from: false,
      isFree: false,
      schedule: "",
      alerts: "",
    },
  });

  function onSubmit(values: z.infer<typeof eventSchema>) {
    startTransition(async () => {
      const randomUUID = crypto.randomUUID();

      const coverFileID = uppy.getFiles().length === 0 ? null : randomUUID;

      const eventData = {
        data: values,
        cover: coverFileID,
        address,
        coordinates: coord,
      };

      try {
        await handleUploads(randomUUID);
      } catch (e: any) {
        throw new Error(e.message);
      }

      const { error } = await createEvent(eventData);

      if (error) {
        throw new Error(error.message);
      }

      if (!error) {
        toast("Event has been created.");

        setAddress("");
        setCoord([0, 0]);
        form.reset();
      }
    });
  }

  return (
    <>
      <Dashboard uppy={uppy} hideUploadButton />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex py-[2px]">
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

          <FormField
            control={form.control}
            name="place"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex py-[2px]">
                  Place
                  <Asterisk size={12} className="text-primary" />
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Event Location or Online"
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
                  <FormLabel className="flex py-[2px]">
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
                        weekStartsOn={1}
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
                  <FormLabel className="flex py-[2px]">
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
            <div className="flex max-sm:flex-col gap-2 max-sm:w-full items-center">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-3 py-[2px]">
                      <div className="flex items-center">
                        Price per ticket (USD)
                        <Asterisk size={12} className="text-primary" />
                      </div>
                      <FormField
                        control={form.control}
                        name="isFree"
                        // eslint-disable-next-line @typescript-eslint/no-shadow
                        render={({ field }) => {
                          return (
                            <FormItem className="flex items-center gap-1 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <FormLabel className="cursor-pointer">
                                Free?
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    </FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-2 h-10 w-full overflow-hidden rounded-xl bg-white dark:bg-secondary-light border border-border dark:border-border-dark px-1 py-2">
                        <Input
                          type="number"
                          min={0}
                          step={0.01}
                          placeholder="$19.99"
                          className="border-none outline-offset-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                          {...field}
                          onChange={field.onChange}
                        />

                        <FormField
                          control={form.control}
                          name="price_from"
                          // eslint-disable-next-line @typescript-eslint/no-shadow
                          render={({ field }) => {
                            return (
                              <FormItem className="flex items-center gap-2 space-y-0">
                                <FormLabel className="cursor-pointer">
                                  From?
                                </FormLabel>
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                              </FormItem>
                            );
                          }}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
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
                                className={`${field.value.includes(tag.id) ? "bg-primary-light dark:bg-primary-light hover:bg-primary-light/90 dark:hover:bg-primary-light/90" : ""}`}
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
                <FormLabel className="flex py-[2px]">
                  Description <Asterisk size={12} className="text-primary" />
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="About event"
                    maxLength={900}
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
            name="schedule"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Schedule</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Start: 19:00..."
                    maxLength={900}
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
                      const value =
                        e.target.value === "" ? null : e.target.value;
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
                      const value =
                        e.target.value === "" ? null : e.target.value;
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
    </>
  );
}
