import { parseDMY } from "@/utils/formatter";
import Image from "next/image";
import Link from "next/link";
import { IoLocationOutline } from "react-icons/io5";

export default function TicketCard({ event }) {
  const { event_id, name, desc, price, date } = event;

  const parsedDate = parseDMY(date);

  return (
    <Link href={`/ticket/${event_id}`} className="">
      <div className="h-full flex flex-col bg-white rounded-lg shadow hover:shadow-lg transition">
        {/* Image */}
        <div className="rounded-t-lg overflow-hidden object-cover">
          <img
            src="https://placehold.co/300x140.png"
            className="w-full hover:scale-110 transition duration-500"
            alt=""
          />
        </div>

        {/* Text container */}
        <div className="flex flex-1 justify-center">
          {/* Event date */}
          <div className="flex flex-col items-center px-4 my-auto">
            <div className="text-gray-600">{parsedDate.date.toLocaleString("en-US", { month: "short"})}</div>
            <div className="text-secondary text-2xl">{parsedDate.day}</div>
            {/* <div className="text-gray-600">{parsedDate.year}</div> */}
          </div>

          <div className="h-full bg-black"></div>

          {/* Details */}
          <div className="flex flex-col flex-1 py-4 pr-4 gap-2">
            <h2 className="text-xl font-medium line-clamp-1">{name}</h2>
            <p className="flex-1 text-gray-600 text-sm line-clamp-2">{desc}</p>

            <div className="flex gap-1 items-center line-clamp-1 text-secondary">
              <IoLocationOutline className="size-5" />
              <p>Venue Location</p>
            </div>

            {typeof price === "string" ? (
              <p className="text-primary text-xl">
                IDR {Number(price).toLocaleString("id-ID")}
              </p>
            ) : (
              <ul className="text-gray-600">
                <li>
                  Mulai:{" "}
                  <span className="text-primary text-xl">
                    IDR {Number(price.reg).toLocaleString("id-ID")} -{" "}
                    {Number(price.vip).toLocaleString("id-ID")}
                  </span>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
