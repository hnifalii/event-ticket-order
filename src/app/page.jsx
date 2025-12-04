import TicketCard from "@/components/TicketCard";
import { Suspense } from "react";

async function getEvents() {
  const res = await fetch("http://localhost:3000/api/tickets", {
    next: { revalidate: 60 },
  });
  return res.json();
}

export default async function Home() {
  const events = await getEvents();

  return (
    <main className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Event Tickets</h1>

      <Suspense fallback={<div>Loading...</div>}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {events.map((event) => (
            <TicketCard key={event.id} event={event} />
          ))}
        </div>
      </Suspense>
    </main>
  );
}
