"use client";

import React, { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { Loader } from "lucide-react";
import {
  Options,
  getPaginatedFilteredEvents,
} from "@/app/(main)/events/actions";
import EventCollection from "./event-collection";

type LoadMoreProps = {
  options?: Options;
};

export default function LoadMore({ options }: LoadMoreProps) {
  const ref = useRef(null);
  const inView = useInView(ref);
  const [data, setData] = useState<EventType[]>([]);
  const [page, setPage] = useState(2);
  const [stopScroll, setStopScroll] = useState(false);

  useEffect(() => {
    if (inView) {
      getPaginatedFilteredEvents(page, options).then((res) => {
        if (res.data) {
          setData([...data, ...res.data]);
          setPage((prev) => prev + 1);
        }
        if (!res.data || res.data.length === 0) {
          setStopScroll(true);
        }
      });
    }
  }, [inView, data, page, options]);

  return (
    <>
      <EventCollection data={data} />
      {!stopScroll && (
        <section className="w-full flex items-center justify-center my-5">
          <div ref={ref}>
            <Loader className="animate-spin" />
          </div>
        </section>
      )}
    </>
  );
}
