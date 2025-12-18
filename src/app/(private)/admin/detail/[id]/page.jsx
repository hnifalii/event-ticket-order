import Image from "next/image";
import Link from "next/link";
import { IoMdClock } from "react-icons/io";

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
    <div className="min-h-screen flex flex-col md:items-center lg:items-center gap-5 px-6 py-6 md:px-24 md:py-8">
      <h1 className="text-3xl font-semibold">Detail Event</h1>
      <hr className="opacity-50 h-[0.5px]" />
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-3">
          <h1 className="font-semibold text-2xl">{event.name}</h1>
          <p className="font-semibold text-xl">Lokasi : {event.location}</p>
          <div className="flex flex-row gap-1 items-center">
            <IoMdClock className="size-12" />
            <div className="flex flex-col">
              <p className="font-semibold">{event.date}</p>
              <p className="font-semibold">
                {event.time_start} - {event.time_end}
              </p>
            </div>
          </div>
        </div>
        <Image
          src={event.img}
          alt={event.name}
          className="object-cover rounded-md"
          width={500}
          height={300}
        />
        <div className="flex flex-col gap-1">
          <h2 className="font-medium text-lg">Deskripsi:</h2>
          <p>{event.desc}</p>
        </div>
        <div className="flex flex-col gap-4 lg:flex-row lg:justify-between">
          <div className="flex flex-col gap-1">
            <h2 className="font-medium text-lg">Tiket Tipe:</h2>
            <p>{event.ticket_type}</p>
          </div>
          <div className="flex flex-col gap-1">
            <h2 className="font-medium text-lg">Daftar Harga Tiket:</h2>
            {event.tickets.map((t, key) => (
              <div key={t.ticket_id} className="lg:w-fit w-full">
                <div className="w-full p-3">
                  <h1 className="font-medium">{t.name}</h1>
                  <p>{t.desc}</p>
                  <p>Rp{t.price.toLocaleString()}</p>
                </div>
                {event.tickets.length - 1 != key && (
                  <hr className="text-black/40 h-[0.4px]" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col md:w-fit lg:w-fit gap-2 p-4 rounded-lg shadow-md w-full">
        <h1 className="text-xl font-medium">Tentang Panitia untuk Event Ini</h1>
        <p>
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
            href={`/admin/add-organizer/${event.event_id}`}
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
