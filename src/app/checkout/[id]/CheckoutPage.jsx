"use client";

import { serverFetch } from "@/lib/server/serverFetch";
import { useEffect, useState } from "react";

export default function CheckoutPage({ id }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Selected ticket
  const [ticketId, setTicketId] = useState();

  // Popup after submit
  const [popupData, setPopupData] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  // Load event data
  useEffect(() => {
    async function load() {
      const res = await serverFetch("/api/events");
      const json = await res.json();
      setEvents(json);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return <div className="w-full h-screen text-center p-10">Loading</div>;
  }

  // Event
  const event = events.find((t) => t.event_id === id);
  if (!event) {
    return <div>Event not found. ID youre looking for: {id}</div>;
  }

  // Tickets
  const tickets = event.tickets || [];
  const selectedTicket = tickets.find((t) => t.ticket_id === ticketId);

  // Submit form handler
  /* Using this instead of form action 
     so the browser won't redirect */
  const submitForm = async (e) => {
    e.preventDefault();

    if (!selectedTicket) {
      alert("Silahkan pilih tiket Anda terlebih dahulu.");
      return;
    }

    const formData = new FormData(e.target); // get form data

    try {
      setSubmitting(true);

      const res = await fetch(`${process.env.NEXT_PUBLIC_ORDER_WEBHOOK}`, {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      if (data?.success) {
        setPopupData(data);
        setShowPopup(true);
      } else {
        setPopupData(null);
      }

      setSubmitting(false);
    } catch (err) {
      setSubmitting(false);
      console.error(err);
    }
  };

  return (
    <main className="mx-auto py-10 px-24">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      {popupData && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center
      bg-black/50 transition-opacity duration-300
      ${showPopup ? "opacity-100" : "opacity-0"}
    `}
        >
          <div
            className={`bg-white p-6 rounded-lg max-w-sm text-center
        transform transition-all duration-300
        ${
          showPopup
            ? "scale-100 translate-y-0 opacity-100"
            : "scale-95 translate-y-4 opacity-0"
        }
      `}
          >
            <h2 className="text-xl font-semibold mb-3">Order Berhasil!</h2>

            <p className="font-medium">Halo, {popupData.ticket_data.name}</p>

            <p className="text-gray-600 mb-2">
              Ticket ID: <b>{popupData.ticket_data.ticket_id}</b>
            </p>

            <button
              className="mt-4 bg-primary text-white px-4 py-2 rounded-md"
              onClick={() => {
                setShowPopup(false); // trigger exit animation
                setTimeout(() => {
                  setPopupData(null);
                }, 300); // harus sama dengan duration
              }}
            >
              Oke
            </button>
          </div>
        </div>
      )}

      <div className="gap-2">
        {/* Ticket Name */}
        <div className="flex gap-2">
          <p className="font-medium block mb-1">Nama Event:</p>
          <p>{event.name}</p>
        </div>

        {/* Price */}
        <div className="flex gap-2">
          <p className="font-medium block mb-1">Harga:</p>
          <p>
            {selectedTicket
              ? selectedTicket.price === 0
                ? "Gratis"
                : `Rp${selectedTicket.price.toLocaleString("id-ID")}`
              : "-"}
          </p>
        </div>
      </div>

      <form
        // action="https://n8n-service3.instatunnel.my/webhook-test/post/order"
        onSubmit={submitForm}
        className="space-y-4 max-w-xl"
        encType="multipart/form-data"
      >
        {/* Event ID */}
        <input
          type="number"
          name="event_id"
          value={event.event_id}
          hidden
          readOnly
        />

        {/* Event handle */}
        <input
          type="text"
          name="event_handle"
          value={event.event_handle}
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

        {/* Ticket Type */}
        <div>
          <label className="font-semibold block mb-1">
            Pilih Tiket<span className="text-red-500">*</span>
          </label>
          <select
            className="w-full border px-3 py-2 rounded"
            value={ticketId}
            onChange={(e) => setTicketId(e.target.value)}
          >
            <option value="">-- Pilih Tiket --</option>
            {tickets.map((t) => (
              <option key={t.ticket_id} value={t.ticket_id}>
                {t.name} —{" "}
                {t.price === 0
                  ? "Gratis"
                  : `Rp${t.price.toLocaleString("id-ID")}`}
              </option>
            ))}
          </select>
        </div>

        {/* Hidden ticket data */}
        {selectedTicket && (
          <>
            <input
              name="ticket_id"
              value={selectedTicket.ticket_id}
              hidden
              readOnly
            />
          </>
        )}

        <button
          type="submit"
          disabled={submitting}
          className={`w-full py-3 text-white rounded ${
            submitting ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {submitting ? "Memproses..." : "Pesan Tiket"}
        </button>
      </form>
    </main>
  );
}
