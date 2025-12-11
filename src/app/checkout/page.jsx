"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function CheckoutPage() {
  const search = useSearchParams();
  const id = search.get("id");

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Ticket type
  const [type, setType] = useState("reg");

  // Popup after submit
  const [popupData, setPopupData] = useState(null);
  console.log(popupData)

  // Submit form handler
  /* Using this instead of form action 
     so the browser won't redirect */
  const submitForm = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_ORDER_WEBHOOK}`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      console.log(data)
      
      if (data.success) {
        setPopupData(data);
        console.log(popupData)
      } else {
        setPopupData(null);
        console.log("data not assigned")
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    async function load() {
      const res = await fetch(`http://localhost:3000/api/tickets`);
      const json = await res.json();
      setEvents(json);
      setLoading(false);
    }
    load();
  }, []);

  if (loading)
    return <div className="w-full h-screen text-center p-10">Loading</div>;

  const ticket = events.find((t) => t.event_id == id);
  if (!ticket) return <div>Not found.</div>;

  return (
    <main className="max-w-xl mx-auto py-10 px-6">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      {popupData && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-sm text-center">
            <h2 className="text-xl font-semibold mb-3">Order Berhasil!</h2>

            <p className="font-medium">Halo </p>
            <p className="text-gray-600 mb-2">
              Ticket ID: <b></b>
            </p>

            <button
              className="mt-4 bg-primary text-white px-4 py-2 rounded-md"
              onClick={setPopupData(null)}
            >
              Oke
            </button>
          </div>
        </div>
      )}

      <form
        // action="https://n8n-service3.instatunnel.my/webhook-test/post/order"
        onSubmit={submitForm}
        className="space-y-4"
        encType="multipart/form-data"
      >
        {/* Event ID */}
        <input
          type="number"
          name="event_id"
          value={ticket.event_id}
          hidden
          readOnly
        />

        {/* Event handle */}
        <input
          type="text"
          name="event_handle"
          value={ticket.event_handle}
          hidden
          readOnly
        />

        {/* Email */}
        <div>
          <label className="font-semibold block mb-1">
            Email<span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        {/* Your Name */}
        <div>
          <label className="font-semibold block mb-1">
            Nama Lengkap<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        {/* Phone number */}
        <div>
          <label className="font-semibold block mb-1">
            Nomor Telepon<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="phone"
            // onInput={""}
            accept=""
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        {/* Ticket Name */}
        <div>
          <label className="font-semibold block mb-1">Ticket Name</label>
          <input
            type="text"
            value={ticket.name}
            disabled
            className="w-full border px-3 py-2 rounded opacity-60"
          />
        </div>

        {/* Ticket Type */}
        {ticket.price.vip ? (
          <div>
            <label className="font-semibold block mb-1">
              Ticket Type<span className="text-red-500">*</span>
            </label>
            <select
              className="w-full border px-3 py-2 rounded"
              name="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="reg">Reguler</option>
              <option value="vip">VIP</option>
            </select>
          </div>
        ) : (
          <input name="type" type="text" value={type} hidden readOnly />
        )}

        {/* Price */}
        <div>
          <label className="font-semibold block mb-1">Price</label>
          <input
            type="text"
            value={`Rp${ticket.price[type].toLocaleString()}`}
            disabled
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Final price to send */}
        <input
          name="price"
          type="number"
          value={ticket.price[type]}
          hidden
          readOnly
        />

        {/* <input name="submitted_at" type="text" value={new Date.now}/> */}

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Submit Order
        </button>
      </form>
    </main>
  );
}
