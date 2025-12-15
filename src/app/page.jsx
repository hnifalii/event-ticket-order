import TicketCard from "@/components/TicketCard";
import Image from "next/image";
import HeroBg from "@/assets/hero-bg.png";
import { Suspense } from "react";
import TicketCardLoading from "@/components/placeholder/TicketCardLoading";

async function getEvents() {
  const res = await fetch("http://localhost:3000/api/tickets", {
    next: { revalidate: 10 },
  });
  return res.json();
}

export default async function Home() {
  const events = await getEvents();

  return (
    <main className="w-full">
      {/* Hero section */}
      <section id="hero" className="relative w-full flex justify-center">
        <Image src={HeroBg} alt="" className="w-full z-0" draggable="false" />

        <h1 className="absolute top-1/8 md:top-1/4 w-1/2 md:w-fit text-xl md:text-3xl lg:text-5xl text-primary text-center font-rose font-semibold">
          Event eksklusif, momen berharga.
        </h1>
      </section>

      {/* Content: Upcoming events */}
      <section
        id="popular"
        className="relative w-full flex flex-col justify-center items-center px-4 md:px-24 py-4 md:py-24"
      >
        {/* <div className="absolute -top-1/12 w-2/3 bg-secondary rounded-xl">
          <input type="text" className="py-2" />
        </div> */}

        {/* Events List */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Suspense
            fallback={Array.from({ length: 6 }).map((_, i) => (
              <TicketCardLoading key={i} />
            ))}
          >
            {events.map((event) => (
              <TicketCard key={event.event_id} event={event} />
              // <TicketCardLoading key={event.event_id} />
            ))}
          </Suspense>
        </div>
      </section>

      {/* <h1 className="text-3xl font-bold mb-6">Event Tickets</h1>

      <Suspense fallback={<div>Loading...</div>}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {events.map((event) => (
            <TicketCard key={event.event_id} event={event} />
          ))}
        </div>
      </Suspense> */}
    </main>
  );
}
