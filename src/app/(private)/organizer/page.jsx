import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";

async function getMyEvents(id) {
  const res = await fetch(`http://localhost:3000/api/organizer/${id}/events`, {
    next: { revalidate: 10 },
  });
  return res.json();
}

export default async function Page() {
  const session = await getServerSession(authOptions);
  const events = await getMyEvents(session?.user.id);

  return (
    <div className="flex flex-col justify-center gap-6 px-6 py-6 md:px-24 md:py-8">   
      <div className="flex flex-col gap-2 lg:gap-3">
        <h1 className="text-4xl font-bold">Halo, {session?.user.name}👋</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis,
          qui?
        </p>
      </div>
      <h1 className="text-2xl font-medium mt-4">Cek Event Kamu!</h1>
      <div className="flex flex-col space-y-3 lg:grid lg:grid-cols-2 w-full">
        {events.length > 0 ? (
          events.map((e) => (
            <div
              key={e.event_id}
              className="w-full max-w-sm sm:max-w-md md:max-w-lg shadow-md rounded-md p-4 flex flex-col gap-3 font-medium text-black mx-auto"
            >
              <h1 className="font-semibold text-base sm:text-lg md:text-xl">
                <Link
                  href={`/organizer/event/${e.event_id}/scan`}
                  className="hover:underline"
                >
                  {e.name}
                </Link>
              </h1>
              {e.date == Date.now && (
                <p className="font-medium bg-green-400 text-white rounded-md p-2">
                  Sedang Berlangsung
                </p>
              )}
              {e.date > Date.now && (
                <p className="font-medium bg-red-400 text-white rounded-md p-2">
                  Selesai
                </p>
              )}
              <div className="relative w-full h-48 sm:h-64 md:h-72">
                <Image
                  src={e.image}
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
  );
}
