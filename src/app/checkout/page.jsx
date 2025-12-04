"use client";

import { tickets } from "@/data/tickets";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function CheckoutPage() {
  const search = useSearchParams();
  const id = search.get("id");

  const ticket = tickets.find((t) => t.event_id == id);

  const [type, setType] = useState("reg");

  if (!ticket) return <div className="p-10">Ticket not found.</div>;

  const finalPrice =
    typeof ticket.price === "number" ? ticket.price : ticket.price[type];

  return (
    <main className="max-w-xl mx-auto py-10 px-6">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      <form
        action="https://unwinning-kieran-stutteringly.ngrok-free.dev/webhook/register"
        method="POST"
        className="space-y-4"
        encType="multipart/form-data"
      >
        <input
          type="number"
          name="event_id"
          value={ticket.event_id}
          hidden
          readOnly
        />

        {/* Email */}
        <div>
          <label className="font-semibold block mb-1">Email*</label>
          <input
            type="email"
            name="email"
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        {/* Your Name */}
        <div>
          <label className="font-semibold block mb-1">Your Name*</label>
          <input
            type="text"
            name="name"
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        {/* Phone number */}
        <div>
          <label className="font-semibold block mb-1">Phone Number*</label>
          <input
            type="number"
            name="phone"
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        {/* Ticket Name */}
        <div>
          <label className="font-semibold block mb-1">Ticket Name</label>
          <input
            type="text"
            value={ticket.title}
            disabled
            className="w-full border px-3 py-2 rounded opacity-60"
          />
        </div>

        {/* Ticket Type */}
        {typeof ticket.price !== "number" && (
          <div>
            <label className="font-semibold block mb-1">Ticket Type</label>
            <select
              className="w-full border px-3 py-2 rounded"
              name="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="reg">Regular</option>
              <option value="vip">VIP</option>
            </select>
          </div>
        )}

        {/* Price */}
        <div>
          <label className="font-semibold block mb-1">Price</label>
          <input
            type="text"
            value={`Rp${finalPrice.toLocaleString()}`}
            disabled
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <input name="price" type="number" value={finalPrice} hidden readOnly/>

        <button className="w-full py-3 bg-blue-600 text-white rounded hover:bg-blue-700">
          Submit Order
        </button>
      </form>
    </main>
  );
}
