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

  const ticket = events.find((t) => t.id == id);

  if (!ticket) {
    return (
      <div className="p-10">Ticket not found. ID youre looking for: {id}</div>
    );
  }

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold">{ticket.title}</h1>
      <p className="mt-2 text-gray-700">{ticket.desc}</p>

      <div className="mt-6 p-4 border rounded bg-white shadow">
        <h3 className="font-semibold">Price</h3>

        {typeof ticket.price === "number" ? (
          <p className="text-blue-600 mt-2">
            Rp {ticket.price.toLocaleString()}
          </p>
        ) : (
          <ul className="text-blue-600 mt-2 space-y-1">
            <li>Regular: Rp {ticket.price.reg.toLocaleString()}</li>
            <li>VIP: Rp {ticket.price.vip.toLocaleString()}</li>
          </ul>
        )}
      </div>

      <Link
        href={`/checkout?id=${ticket.id}`}
        className="mt-6 inline-block bg-green-600 text-white py-3 px-6 rounded hover:bg-green-700"
      >
        Order Ticket
      </Link>
    </main>
  );
}
