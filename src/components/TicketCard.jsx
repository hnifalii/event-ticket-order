import { parseDMY } from "@/utils/formatter";
import Image from "next/image";
import Link from "next/link";
import { IoLocationOutline } from "react-icons/io5";

export default function TicketCard({ event }) {
  const { event_id, name, desc, price, date } = event;

  const parsedDate = parseDMY(date);

  return (
    <Link href={`/ticket/${event_id}`} className="">
      <div className="h-full flex flex-col bg-white rounded-lg shadow hover:shadow-lg transition active:opacity-80">
        {/* Image */}
        <div className="rounded-t-lg aspect-2/1 overflow-hidden">
          <img
            src={event.img}
            className="w-full aspect-2/1 object-cover object-center hover:scale-110 transition duration-500"
            alt="event image"
          />
        </div>

        {/* Text container */}
        <div className="flex flex-1 justify-center">
          {/* Event date */}
          <div className="flex flex-col items-center px-4 my-auto">
            <div className="text-gray-600">
              {parsedDate.date.toLocaleString("id-ID", { month: "short" })}
            </div>
            <div className="text-secondary text-2xl">{parsedDate.day}</div>
            {/* <div className="text-gray-600">{parsedDate.year}</div> */}
          </div>

          <div className="h-full bg-black"></div>

          {/* Details */}
          <div className="flex flex-col flex-1 py-4 pr-4 gap-2">
            <h2 className="text-lg md:text-xl font-medium line-clamp-2 md:line-clamp-1">
              {name}
            </h2>
            <p className="flex-1 text-gray-600 text-sm line-clamp-2">{desc}</p>

            <div className="flex gap-1 items-center line-clamp-1 text-secondary">
              <IoLocationOutline className="size-4 md:size-5" />
              <p className="text-sm">{event.location}</p>
            </div>

            {!price.vip ? (
              <p className="text-primary text-xl">
                IDR {Number(price.reg).toLocaleString("id-ID")}
              </p>
            ) : (
              <p className="text-gray-600">
                Mulai:{" "}
                <span className="text-primary text-xl">
                  IDR {Number(price.reg).toLocaleString("id-ID")} -{" "}
                  {Number(price.vip).toLocaleString("id-ID")}
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
