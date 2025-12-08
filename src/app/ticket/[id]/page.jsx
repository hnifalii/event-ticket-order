import { tickets } from "@/data/tickets";
import Link from "next/link";

async function getEvents() {
  const res = await fetch("http://localhost:3000/api/tickets", {
    next: { revalidate: 60 },
  });
  return res.json();
}

export default async function TicketDetail({ params }) {
  const events = await getEvents();

  const { id } = await params;

  const event = events.find((evn) => evn.event_id == id);

  console.log(event)

  if (!event) {
    return (
      <div className="p-10">Ticket not found. ID youre looking for: {id}</div>
    );
  }

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold">{event.name}</h1>
      <p className="mt-2 text-gray-700">{event.desc}</p>

      <div className="mt-6 p-4 border rounded bg-white shadow">
        <h3 className="font-semibold">Price</h3>

        {typeof event.price === "string" ? (
          <p className="text-blue-600 mt-2">
            Rp{Number(event.price).toLocaleString('id-ID')}
          </p>
        ) : (
          <ul className="text-blue-600 mt-2 space-y-1">
            <li>Regular: Rp{Number(event.price.reg).toLocaleString('id-ID')}</li>
            <li>VIP: Rp{Number(event.price.vip).toLocaleString('id-ID')}</li>
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
  );
}
