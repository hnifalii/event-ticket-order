import Image from "next/image";
import Link from "next/link";

async function getEvents() {
  const res = await fetch("http://localhost:3000/api/tickets", {
    next: { revalidate: 10 },
  });
  return res.json();
}

export default async function Page({ params }) {
  const events = await getEvents();

  const { id } = await params;

  const event = events.find((e) => e.event_id == id);

  return event != null ? (
    <div className="flex flex-col gap-5 px-6 py-6 md:px-24 md:py-8">
      <h1 className="text-3xl font-semibold">Detail Event</h1>
      <hr className="opacity-50" />
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="font-medium text-lg">Name</h2>
          <p>{event.name}</p>
        </div>
        <Image
          src={event.img}
          alt={event.name}
          className="object-cover rounded-md"
          width={300}
          height={300}
        />
        <div className="flex flex-col gap-1">
          <h2 className="font-medium text-lg">Description</h2>
          <p>{event.desc}</p>
        </div>
        <div className="flex flex-col gap-1">
          <h2 className="font-medium text-lg">Location</h2>
          <p>{event.location}</p>
        </div>
        <div className="flex flex-col gap-1">
          <h2 className="font-medium text-lg">Ticket Type</h2>
          <p>{event.ticket_type}</p>
        </div>
        <div className="flex flex-col gap-1">
          <h2 className="font-medium text-lg">Ticket Prices</h2>
          {event.tickets.map((t) => (
            <div key={t.ticket_id} className="w-full p-3 border-b-[0.5px] border-b-black/40">
              <h1 className="font-medium">{t.name}</h1>
              <p>{t.desc}</p>
              <p>Harga: Rp{t.price.toLocaleString()}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-1">
          <h2 className="font-medium text-lg">Date</h2>
          <p>{event.date}</p>
        </div>
        <div className="flex flex-col gap-1">
          <h2 className="font-medium text-lg">Time</h2>
          <p>
            {event.time_start} - {event.time_end}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-2 p-5 rounded-lg outline-1 outline-gray-500/50">
        <h1 className="text-xl font-medium">Tambah Panitia untuk Event Ini</h1>
        <p className="font-thin">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, eius.
        </p>
        <div className="flex flex-row gap-4 mt-4">
          <Link
            href={`/admin/organizer/${event.event_id}`}
            className="w-fit bg-[#f72585] active:bg-[#f72585]/80 hover:bg-[#f72585]/80 text-white font-semibold rounded-md py-2 px-3 transition duration-200"
          >
            Lihat Panitia
          </Link>
          <Link
            href={`/admin/add-organizer?eventId=${event.id}`}
            className="w-fit bg-[#f72585] active:bg-[#f72585]/80 hover:bg-[#f72585]/80 text-white font-semibold rounded-md py-2 px-3 transition duration-200"
          >
            Tambah Panitia
          </Link>
        </div>
      </div>
    </div>
  ) : (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h1 className="font-semibold text-2xl">Event Tidak Tersedia</h1>
    </div>
  );
}
