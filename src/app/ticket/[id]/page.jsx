import Image from "next/image";
import Link from "next/link";

async function getEvents() {
  const res = await fetch("http://localhost:3000/api/tickets", {
    next: { revalidate: 10 },
  });
  return res.json();
}

export default async function TicketDetail({ params }) {
  const events = await getEvents();

  const { id } = await params;

  const event = events.find((evn) => evn.event_id == id);

  console.log(event);

  if (!event) {
    return (
      <div className="p-10">Ticket not found. ID youre looking for: {id}</div>
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

      <div className="flex flex-col py-4 gap-4">
        <h1 className="text-3xl font-medium">{event.name}</h1>
        <p className="text-gray-700">{event.desc}</p>
      </div>

      <div className="gird grid-cols-2 gap-4">
        {/* {event.price.map((ticket) => {
          <div className="">

          </div>
        })} */}
      </div>

      <div className="mt-6 p-4 border rounded bg-white shadow">
        <h3 className="font-semibold">Price</h3>

        {event.price === 0 ? (
          <p className="text-blue-600 mt-2">
            Gratis
          </p>
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
      </div>

      <Link
        href={`/checkout?id=${event.event_id}`}
        className="mt-6 inline-block bg-green-600 text-white py-3 px-6 rounded hover:bg-green-700"
      >
        Order Ticket
      </Link>
    </main>

    // <main className="w-full px-72 p-6 animate-pulse">
    //   <div className="p-4 rounded-lg bg-[#e5bdff]">
    //     <div className="w-full aspect-3/1 rounded-lg overflow-hidden object-cover object-center border-2 bg-linear-to-br from-gray-200 to-gray-100" />
    //   </div>

    //   <div className="flex flex-col py-4 gap-4">
    //     <div className="w-1/3 h-8 bg-gray-300 rounded-md"></div>
    //     <div className="h-12 bg-gray-300 rounded-md"></div>
    //   </div>

    //   <div className="mt-6 p-4 border rounded bg-white shadow">
    //     <h3 className="font-semibold">Price</h3>

    //     {event.price === 0 ? (
    //       <p className="text-blue-600 mt-2">Gratis</p>
    //     ) : !event.price.vip ? (
    //       <p className="text-blue-600 mt-2">
    //         Rp{Number(event.price.reg).toLocaleString("id-ID")}
    //       </p>
    //     ) : (
    //       <ul className="text-blue-600 mt-2 space-y-1">
    //         <li>
    //           Reguler: Rp{Number(event.price.reg).toLocaleString("id-ID")}
    //         </li>
    //         <li>VIP: Rp{Number(event.price.vip).toLocaleString("id-ID")}</li>
    //       </ul>
    //     )}
    //   </div>

    //   <div
    //     className="w-1/5 h-12 inline-block mt-6 bg-gray-200 rounded"
    //   >
    //   </div>
    // </main>
  );
}
