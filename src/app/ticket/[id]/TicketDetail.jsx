import EventCarousel from "@/components/EventCarousel";
import { parseDMY } from "@/utils/formatter";
import {
  IoLocationOutline,
  IoCalendarOutline,
  IoPricetagsOutline,
  IoLinkOutline,
  IoShareSocialOutline,
} from "react-icons/io5";
import { getEvents } from "./page";
import TicketDropdown from "./TicketDropdown";

export default async function TicketDetail({ params }) {
  const events = await getEvents();

  const { id } = await params;

  const event = events.find((evn) => evn.event_id == id);

  const eventDate = `${parseDMY(event.date, "id-ID").readableDate}, ${
    event.time_start.slice(0, -3) ?? "Mulai"
  } - ${event.time_end ? event.time_end.slice(0, -3) + " WIB" : "Selesai"}`;

  // console.log(event);
  if (!event) {
    return (
      <div className="min-h-screen p-10">
        Ticket not found. ID youre looking for: {id}
      </div>
    );
  }

  return (
    <main className="w-full px-48 p-6">
      <div className="p-4 rounded-lg bg-[#e5bdff]">
        <img
          src={event.img}
          className="w-full aspect-3/1 rounded-lg overflow-hidden object-cover object-center border-2"
          alt="event image"
        />
      </div>

      <div className="flex py-4 gap-4">
        {/* Meta */}
        <div className="flex flex-col flex-1 gap-4">
          <h1 className="text-3xl font-medium">{event.name}</h1>

          {/* Details */}
          <div className="flex flex-col gap-3">
            {/* Event location */}
            <div className="flex gap-1 items-center line-clamp-1 text-secondary">
              <IoLocationOutline className="size-5 md:size-6" />
              <p className="line-clamp-1">{event.location}</p>
            </div>

            {/* Event date */}
            <div className="flex gap-1 items-center line-clamp-1 text-secondary">
              <IoCalendarOutline className="size-5 md:size-6" />
              <p className="line-clamp-1">{eventDate}</p>
            </div>

            {/* Event tags */}
            <div className="flex gap-1 items-center line-clamp-1 text-secondary">
              <IoPricetagsOutline className="size-5 md:size-6" />
              <p className="line-clamp-1">Konser</p>
            </div>
          </div>

          {/* Desc */}
          <div className="flex flex-col mt-4 gap-2">
            <h3 className="text-lg font-medium">Deskripsi</h3>
            <p className="text-gray-700">{event.desc}</p>
          </div>

          {/* Share */}
          <h3 className="mt-4 text-lg font-medium">Bagikan Event</h3>
          <div className="flex gap-2">
            <button className="p-2 bg-blue-400 text-white rounded-full">
              <IoLinkOutline className="size-6" />
            </button>
            <button className="p-2 bg-primary text-white rounded-full">
              <IoShareSocialOutline className="size-6" />
            </button>
          </div>
        </div>

        {/* Tickets */}
        <TicketDropdown tickets={event.tickets} />
      </div>

      {/* <div className="mt-6 p-4 border rounded bg-white shadow">
              <h3 className="font-semibold">Price</h3>
      
              {event.price === 0   ? (
                <p className="text-blue-600 mt-2">Gratis</p>
              ) : !event.price.vip ? (
                <p className="text-blue-600 mt-2">
                  Rp{Number(event.price.reg).toLocaleString("id-ID")}
                </p>
              ) : (
                <ul className="text-blue-600 mt-2 space-y-1">
                  <li>
                    Reguler: Rp{Number(event.price.reg).toLocaleString("id-ID")}
                  </li>
                  <li>VIP: Rp{Number(event.price.vip).toLocaleString("id-ID")}</li>
                </ul>
              )}
            </div> */}

      {/* <Link
              href={`/checkout?id=${event.event_id}`}
              className="mt-6 inline-block bg-green-600 text-white py-3 px-6 rounded hover:bg-green-700"
            >
              Order Ticket
            </Link> */}

      {/* Events carousel */}
      <div className="flex flex-col mt-12 gap-2">
        <h2 className="text-xl font-medium">Event Lainnya</h2>
        <EventCarousel events={events} />
      </div>
    </main>
  );
}
