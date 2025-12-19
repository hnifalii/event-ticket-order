"use client";

import EventCard from "@/components/EventCard";
import EventCardLoading from "@/components/placeholder/EventCardLoading";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";
import { IoSearch } from "react-icons/io5";

export default function DiscoverSection({ events, tags }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const tagParam = searchParams.get("tag");
  const searchParam = searchParams.get("search") || "";

  const [keyword, setKeyword] = useState(searchParam);

  // Search with debounce
  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (keyword) params.set("search", keyword);
      else params.delete("search");

      router.push(`?${params.toString()}`, { scroll: false });
    }, 300); // debounce for 300ms

    return () => clearTimeout(timeout);
  }, [keyword, router, searchParams]);

  // Filter by tags
  function filterTag(tagName) {
    const params = new URLSearchParams(searchParams.toString());

    if (tagName.toLowerCase() === tagParam) {
      params.delete("tag"); // remove filter
    } else {
      params.set("tag", tagName.toLowerCase()); // add filter
    }

    router.push(`?${params.toString()}`, { scroll: false });
  }

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchKeyword = event.name
        .toLowerCase()
        .includes(searchParam.toLowerCase());

      const matchTag =
        !tagParam || event.tags?.toLowerCase().includes(tagParam);

      return matchKeyword && matchTag;
    });
  }, [events, searchParam, tagParam]);

  return (
    <main className="min-h-screen flex flex-col px-4 md:px-24 lg:px-36 py-4 md:py-12">
      <div className="flex gap-4 justify-between">
        {/* Filter events */}
        <aside className="min-w-1/5 h-fit flex flex-col p-2 gap-2 bg-slate-100 rounded-md">
          Filter tags
          {tags.map((tag) => (
            <button
              key={tag.tag_id}
              onClick={() => filterTag(tag.name.toLowerCase())}
              className={`text-start px-3 py-1 rounded-md ${
                tagParam === tag.name.toLowerCase()
                  ? "bg-primary text-white"
                  : "hover:bg-gray-300"
              }`}
            >
              {tag.name}
            </button>
          ))}
        </aside>

        <div className="w-full flex flex-col gap-4">
          {/* Search bar */}
          <div className="relative w-full inline-flex items-center">
            <IoSearch className="absolute left-2 size-5 opacity-70" />
            <input
              type="text"
              id="search"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="w-full pl-8 pr-2 py-2 bg-slate-100 rounded-lg"
            />
          </div>

          {/* Events list */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Suspense
              fallback={Array.from({ length: 6 }).map((_, i) => (
                <EventCardLoading key={i} />
              ))}
            >
              {filteredEvents.length === 0 ? (
                <div>Event tidak ditemukan...</div>
              ) : (
                filteredEvents.map((event) => (
                  <EventCard key={event.event_id} event={event} />
                ))
              )}
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  );
}
