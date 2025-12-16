import Link from "next/link";
import Image from "next/image";

async function getEvents() {
  const res = await fetch("http://localhost:3000/api/tickets", {
    next: { revalidate: 10 },
  });
  return res.json();
}

export default async function Page() {
  const events = await getEvents();
  console.log(events);
  
  return (
    <div className="flex flex-col justify-center gap-5 px-6 py-6 md:px-24 md:py-8">
      <div className="flex flex-col space-y-5 lg:grid lg:grid-cols-2">
        <div className="flex flex-col gap-4 lg:gap-8">
          <h1 className="text-3xl font-semibold">Admin Page</h1>
          <p className="text-lg font-thin">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
            dolorem quisquam quos incidunt sed optio repellat suscipit non
            consectetur at.
          </p>
        </div>

        <div className="flex flex-col gap-2 p-5 rounded-lg outline-1 outline-gray-500/50">
          <h1 className="text-xl font-medium">Tambah Event Baru</h1>
          <p className="font-thin">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Suscipit quia eaque ducimus ipsam beatae! Atque quaerat aliquam quod aut odit.
          </p>
          <Link
            href="/admin/add-event"
            className="w-fit bg-[#f72585] mt-4 text-white font-semibold rounded-md py-2 px-3 active:bg-[#f72585]/80 hover:bg-[#f72585]/80 transition duration-200"
          >
            Tambah Event
          </Link>
        </div>
      </div>

      <div className="flex flex-col items-center gap-3 mt-4">
        <h1 className="text-2xl font-medium self-start">Event Saya</h1>
        <div className="flex flex-col space-y-3 lg:grid lg:grid-cols-2 w-full">
          {events.length > 0 ? (
            events.map((e) => (
              <div
                key={e.event_id}
                className="w-full max-w-sm sm:max-w-md md:max-w-lg shadow-md rounded-md p-4 flex flex-col gap-3 font-medium text-black mx-auto"
              >
                <h1 className="font-semibold text-base sm:text-lg md:text-xl">
                  <Link href={`/admin/detail/${e.event_id}`} className="hover:underline">{e.name}</Link>
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
            <div className="w-full flex items-center text-lg font-medium">
              <p>Belum ada event.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
