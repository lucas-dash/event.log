"use client";

import { useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Loader } from "lucide-react";
import CalendarCollection from "./calendar-collection";
import { getPaginatedEventsByMonth } from "../actions";

export default function LoadMoreMonths() {
  const ref = useRef(null);
  const inView = useInView(ref);
  const [data, setData] = useState<EventType[][]>([]);
  const [page, setPage] = useState(2);
  const [stopScroll, setStopScroll] = useState(false);

  useEffect(() => {
    if (inView) {
      getPaginatedEventsByMonth(page).then((res) => {
        if (res) {
          setData([...data, ...res]);
          setPage((prev) => prev + 1);
        }
        if (!res || res.length === 0) {
          setStopScroll(true);
        }
      });
    }
  }, [inView, data, page]);

  return (
    <>
      <CalendarCollection eventsByMonth={data} />
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
