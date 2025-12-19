"use client";

import { redirect } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { IoAdd, IoChevronDown, IoRemove } from "react-icons/io5";

export default function TicketDropdown({ event }) {
  const [open, setOpen] = useState(false);
  const contentRef = useRef(null);
  const [height, setHeight] = useState(0);

  const tickets = event.tickets

  useEffect(() => {
    if (open && contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    } else {
      setHeight(0);
    }
  }, [open]);

  return (
    <div className="w-full h-fit max-w-md shadow rounded-lg overflow-hidden">
      {/* Header */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 bg-primary/80 text-white transition"
      >
        <span className="font-semibold">Daftar Tiket</span>
        <IoChevronDown
          className={`transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Content */}
      <div
        style={{ height }}
        className="transition-all duration-300 ease-in-out overflow-hidden"
      >
        <div ref={contentRef} className="px-4 py-2 space-y-2">
          {tickets.map((ticket, idx) => (
            <div
            onClick={() => redirect(`/checkout/${event.event_id}`)}
              key={idx}
              className="h-full flex justify-between items-center shadow-sm rounded hover:bg-gray-50"
            >
              <div className="flex flex-1 justify-between items-center p-3">
                <div>
                  <p className="font-medium">{ticket.name}</p>
                  <p className="text-sm text-gray-500">{ticket.desc}</p>
                </div>
                <div className="font-semibold text-primary">
                  {ticket.price === 0
                    ? "Gratis"
                    : `Rp${ticket.price.toLocaleString("id-ID")}`}
                </div>
              </div>

              {/* PLANNED FEATURE */}
              {/* Add and subtract */}
              {/* <div className="flex flex-col px-3 h-full bg-secondary">
                <button className="bg-secondary">
                  <IoAdd className=""/>
                </button>
                <button>
                  <IoRemove />
                </button>
              </div> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
