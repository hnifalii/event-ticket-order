import { parseDMY } from "@/utils/formatter";
import Image from "next/image";
import Link from "next/link";
import { IoLocationOutline } from "react-icons/io5";

export default function EventCard({ event }) {
  const tickets = event.tickets.sort((a, b) => a.price - b.price);

  const parsedDate = parseDMY(event.date, "id-ID") ?? "not found";

  return (
    <Link
      href={`/ticket/${event.event_id}`}
      className="block h-full self-start"
    >
      <div className="flex flex-col h-full max-h-[400px] bg-white rounded-lg shadow hover:shadow-lg active:opacity-80 transition duration-300">
        {/* Image */}
        <div className="rounded-t-lg aspect-2/1 overflow-hidden">
          <img
            src={event.img}
            className="w-full aspect-2/1 object-cover object-center hover:scale-110 transition duration-500"
            alt="event image"
          />
        </div>

        {/* Text container */}
        <div className="flex flex-1 h-fit justify-center">
          {/* Event date */}
          <div className="flex flex-col items-center px-4 my-auto">
            <div className="text-gray-600">
              {parsedDate?.fullDate.toLocaleString("id-ID", { month: "short" })}
            </div>
            <div className="text-secondary text-2xl">{parsedDate?.day}</div>
            <div className="text-gray-600">{parsedDate.year}</div>
          </div>

          {/* Details */}
          <div className="flex flex-col flex-1 py-4 pr-4 gap-2">
            <div className="flex flex-col gap-1 flex-1">
              <h2 className="text-lg font-medium line-clamp-2 md:line-clamp-1">
                {event.name}
              </h2>
              <p className=" text-gray-600 text-sm line-clamp-2">
                {event.desc}
              </p>
            </div>

            <div className="flex gap-1 items-center line-clamp-1 text-secondary">
              <IoLocationOutline className="size-4 md:size-5" />
              <p className="text-sm">{event.location}</p>
            </div>

            {event.ticket_type.toLowerCase() === "free" ? (
              <p className="text-primary text-lg">Gratis</p>
            ) : event.ticket_type.toLowerCase() === "tiered" ? (
              <p className="text-primary text-lg">
                IDR {tickets[0].price.toLocaleString("id-ID")} -{" "}
                {tickets[tickets.length - 1].price.toLocaleString("id-ID")}
              </p>
            ) : (
              <p className="text-primary text-lg">
                IDR {tickets[0].price.toLocaleString("id-ID")}
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
