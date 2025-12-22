import EventCard from "@/components/EventCard";
import EventCardLoading from "@/components/placeholder/EventCardLoading";
import { Suspense } from "react";
import DiscoverSection from "./DiscoverSection";
import { serverFetch } from "@/lib/server/serverFetch";

async function getEvents() {
  const res = await serverFetch("/api/events", {
    next: { revalidate: 10 },
  });
  return res.json();
}

async function getTags() {
  const res = await fetch(`/api/tags`, {
    next: { revalidate: 10 },
  });
  return res.json();
}

export default async function DiscoverPage() {
  const events = await getEvents();
  const tags = await getTags();

  if (!events) {
    return <div>Event tidak ditemukan...</div>;
  }

  return <DiscoverSection events={events} tags={tags} />;
}
