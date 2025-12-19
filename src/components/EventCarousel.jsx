"use client";

import { useRef } from "react";
import EventCard from "@/components/EventCard";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

export default function EventCarousel({ events }) {
  const ref = useRef(null);

  const scroll = (dir) => {
    ref.current.scrollBy({
      left: dir * 300,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative">
      {/* Scroll left */}
      <button
        onClick={() => scroll(-1)}
        className="absolute -left-5 top-1/2 z-10 p-2 bg-white text-primary shadow-sm rounded-full"
      >
        <IoChevronBack className="size-6"/>
      </button>

      <div ref={ref} className="overflow-x-auto snap-x snap-mandatory scroll-smooth">
        <div className="flex gap-4 w-max py-2 pr-12">
          {events.map((event) => (
            <div key={event.event_id} className="w-md snap-start">
              <EventCard event={event} />
            </div>
          ))}
        </div>

        <div></div>
      </div>

            {/* Scroll right */}
      <button
        onClick={() => scroll(1)}
        className="absolute -right-5 top-1/2 z-10 p-2 bg-white text-primary shadow-sm rounded-full"
      >
        <IoChevronForward className="size-6"/>
      </button>
    </div>
  );
}
