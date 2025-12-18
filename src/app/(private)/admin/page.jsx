import Link from "next/link";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { IoMdAdd } from "react-icons/io";

async function getEvents() {
  const res = await fetch("http://localhost:3000/api/tickets", {
    next: { revalidate: 10 },
  });
  return res.json();
}

export default async function Page() {
  const session = await getServerSession(authOptions);
  const events = await getEvents();
  const myEvents = events.filter((e) => e.organizer == session?.user.id);

  const totalEvents = myEvents.length;
  const finishedEvents = myEvents.filter((e) => e.date > Date.now).length;
  const upcomingEvents = myEvents.filter((e) => e.date < Date.now).length;

  console.log(session?.user.id);

  console.log(totalEvents);
  console.log(totalEvents);
  console.log(finishedEvents);
  console.log(upcomingEvents);
  
  return (
    <div className="flex flex-col justify-center gap-6 px-6 py-6 md:px-24 md:py-8">
      <div className="flex flex-col space-y-5 lg:grid lg:grid-cols-2">
        <div className="flex flex-col gap-2 lg:gap-3">
          <h1 className="text-4xl font-bold">Halo, {session?.user.name}👋</h1>
          <p className="text-xl font-medium">Kelola event kamu disini!</p>
        </div>

        <Link
          href="/admin/add-event"
          className="flex flex-row items-center justify-center gap-2 w-full py-3 bg-[#f72585] text-white font-semibold rounded-md active:bg-[#f72585]/80 hover:bg-[#f72585]/80 transition duration-200 text-xl"
        >
          <IoMdAdd className="size-8"/> Tambah Event Baru
        </Link>
      </div>

      <div className="flex flex-col gap-4 p-5 rounded-lg shadow-lg">
        <h1 className="text-2xl font-medium">Data Event</h1>
        <div className="flex flex-col gap-4 lg:flex-row lg:justify-between">
          <div className="w-full flex flex-col rounded-lg outline-1 outline-black/40 p-4 items-center">
            <h1 className="text-xl font-medium">Total Event</h1>
            <p className="text-lg font-semibold">{totalEvents}</p>
          </div>
          <div className="w-full flex flex-col rounded-lg outline-1 outline-black/40 p-4 items-center">
            <h1 className="text-xl font-medium">Upcoming Event</h1>
            <p className="text-lg font-semibold">{upcomingEvents}</p>
          </div>
          <div className="w-full flex flex-col rounded-lg outline-1 outline-black/40 p-4 items-center">
            <h1 className="text-xl font-medium">Finished Event</h1>
            <p className="text-lg font-semibold">{finishedEvents}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-2 mt-4">
        <h1 className="text-2xl font-medium self-start">Event Saya</h1>
        <div className="flex flex-col space-y-3 lg:grid lg:grid-cols-2 w-full">
          {myEvents.length > 0 ? (
            myEvents.map((e) => (
              <div
                key={e.event_id}
                className="w-full max-w-sm sm:max-w-md md:max-w-lg shadow-md rounded-md p-4 flex flex-col gap-3 font-medium text-black mx-auto"
              >
                <h1 className="font-semibold text-base sm:text-lg md:text-xl">
                  <Link
                    href={`/admin/detail/${e.event_id}`}
                    className="hover:underline"
                  >
                    {e.name}
                  </Link>
                </h1>
                <div className="relative w-full h-48 sm:h-64 md:h-72">
                  <Image
                    src={e.img}
                    alt={e.name}
                    fill
                    className="object-cover rounded-md"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                  />
                </div>
                <h3 className="text-sm sm:text-base">Location: {e.location}</h3>
              </div>
            ))
          ) : (
            <div className="w-full flex justify-center text-lg font-medium py-8">
              <p>Belum ada event.</p>
              <button className="p-3 bg-[#f72585] w-fit rounded-md">Tambah Event</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
