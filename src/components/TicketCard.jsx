import Link from "next/link";

export default function TicketCard({ event }) {
  const { id, name, desc, price } = event;

  const displayPrice =
    typeof Number(price) === "number"
      ? `Rp ${Number(price).toLocaleString("id-ID")}`
      : `Reg: Rp ${Number(price).toLocaleString("id-ID")} • VIP: USD${Number(price).toLocaleString()}`;

  return (
    <div className="p-5 bg-white border rounded-lg shadow hover:shadow-lg transition">
      <h2 className="text-xl font-semibold">{name}</h2>
      <p className="text-gray-600 text-sm mt-1">{desc}</p>

      <p className="font-semibold text-blue-600 mt-3">{displayPrice}</p>

      <Link
        href={`/ticket/${id}`}
        className="mt-4 inline-block bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        View Details
      </Link>
    </div>
  );
}
