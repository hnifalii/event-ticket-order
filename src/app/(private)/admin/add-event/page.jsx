"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const VIPPriceInput = ({ onChange }) => (
  <div className="flex flex-col gap-1 w-full">
    <label htmlFor="vipPrice" className="font-medium">
      VIP Price
    </label>
    <input
      required
      type="number"
      name="vipPrice"
      onChange={onChange}
      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none ring-1 ring-transparent focus:ring-2 focus:ring-[#7209b7] sm:text-sm pr-10 transition duration-150"
    />
  </div>
);

const ErrorMessage = ({ message }) => (
  <p className="text-red-500 text-sm p-3 bg-red-100 rounded-sm border-s-[3px]">
    {message}
  </p>
);

export default function Page() {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [ticketType, setTicketType] = useState("");
  const [regularPrice, setRegularPrice] = useState(0);
  const [vipPrice, setVipPrice] = useState(0);
  const [date, setDate] = useState("");
  const [timeStart, setTimeStart] = useState("");
  const [timeEnd, setTimeEnd] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { data: session, status } = useSession();

  const router = useRouter();

  const API_URL =
    "https://capsular-peddlingly-immanuel.ngrok-free.dev/webhook-test/post/event/create";

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth");
      router.refresh();
    } else {
      if (session !== undefined && session?.user.role !== "admin") {
        router.push("/auth");
        router.refresh();
      }
    }
  }, [router, session, status, session?.user.role]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);

    try {
      if (
        image == null ||
        name == "" ||
        description == "" ||
        location == "" ||
        ticketType == "" ||
        regularPrice <= 0 ||
        date == "" ||
        timeStart == "" ||
        timeEnd == ""
      ) {
        setError("Mohon isi semua field yang tersedia!");
        return;
      }

      if (timeStart >= timeEnd) {
        setError("Waktu selesai harus lebih besar dari waktu mulai!");
        return;
      }

      const response = await fetch(API_URL, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        setError(`Server error: HTTP ${response.status}`);
        return;
      }

      const result = await response.json();

      if (result && result.success === true) {
        router.push("/admin");
        router.refresh();
        toast.success("Berhasil!");
      } else {
        setError(
          result.data || result.message || "Failed to create new event."
        );
      }
    } catch (err) {
      setError("Kesalahan saat mengirim/memproses:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full px-6 py-6 md:px-24 md:py-8">
      <h1 className="text-3xl font-medium">Tambah Event Baru</h1>
      <p className="mt-2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque, iste.
      </p>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 justify-center mt-6"
      >
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="image" className="font-medium">
            Image
          </label>
          <input
            type="file"
            name="image"
            onChange={(e) => setImage(e.target.files)}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none ring-1 ring-transparent focus:ring-2 focus:ring-[#7209b7] sm:text-sm pr-10 transition duration-150"
          />
        </div>
        {image && (
          <div className="flex flex-col gap-3 w-full items-center">
            <h1 className="font-medium">Preview</h1>
            <Image
              src={URL.createObjectURL(image[0])}
              alt={name}
              height={400}
              width={400}
            />
            <button
              onClick={() => setImage(null)}
              className="p-3 rounded-md w-fit bg-red-500 text-white active:bg-red-400 hover:bg-red-400 transition duration-200"
            >
              Remove Image
            </button>
          </div>
        )}
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="name" className="font-medium">
            Name
          </label>
          <input
            type="text"
            name="name"
            onChange={(e) => setName(e.target.value)}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none ring-1 ring-transparent focus:ring-2 focus:ring-[#7209b7] sm:text-sm pr-10 transition duration-150"
          />
        </div>
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="description" className="font-medium">
            Description
          </label>
          <textarea
            type="text"
            rows={5}
            name="description"
            onChange={(e) => setDescription(e.target.value)}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none ring-1 ring-transparent focus:ring-2 focus:ring-[#7209b7] sm:text-sm pr-10 transition duration-150"
          />
        </div>
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="location" className="font-medium">
            Location
          </label>
          <input
            type="text"
            name="location"
            onChange={(e) => setLocation(e.target.value)}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none ring-1 ring-transparent focus:ring-2 focus:ring-[#7209b7] sm:text-sm pr-10 transition duration-150"
          />
        </div>
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="ticketType" className="font-medium">
            Ticket Type
          </label>
          <select
            type="text"
            name="ticketType"
            onChange={(e) => setTicketType(e.target.value)}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none ring-1 ring-transparent focus:ring-2 focus:ring-[#7209b7] sm:text-sm pr-10 transition duration-150"
          >
            <option value="single">Single</option>
            <option value="tiered">Tiered</option>
          </select>
        </div>
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="regularPrice" className="font-medium">
            Regular Price
          </label>
          <input
            type="number"
            name="regularPrice"
            onChange={(e) => setRegularPrice(e.target.value)}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none ring-1 ring-transparent focus:ring-2 focus:ring-[#7209b7] sm:text-sm pr-10 transition duration-150"
          />
        </div>
        {ticketType == "tiered" && (
          <VIPPriceInput onChange={(e) => setVipPrice(e.target.value)} />
        )}
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="date" className="font-medium">
            Date
          </label>
          <input
            type="date"
            name="date"
            onChange={(e) => setDate(e.target.value)}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none ring-1 ring-transparent focus:ring-2 focus:ring-[#7209b7] sm:text-sm pr-10 transition duration-150"
          />
        </div>
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="timeStart" className="font-medium">
            Time Start
          </label>
          <input
            type="time"
            name="timeStart"
            onChange={(e) => setTimeStart(e.target.value)}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none ring-1 ring-transparent focus:ring-2 focus:ring-[#7209b7] sm:text-sm pr-10 transition duration-150"
          />
        </div>
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="timeEnd" className="font-medium">
            Time End
          </label>
          <input
            type="time"
            name="timeEnd"
            onChange={(e) => setTimeEnd(e.target.value)}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none ring-1 ring-transparent focus:ring-2 focus:ring-[#7209b7] sm:text-sm pr-10 transition duration-150"
          />
        </div>

        {error && <ErrorMessage message={error} />}

        <button
          disabled={loading}
          type="submit"
          className="p-3 rounded-lg bg-[#7209b7] text-white hover:bg-[#7209b7]/80 active:bg-[#7209b7]/80 font-semibold disabled:grayscale-50 transition duration-200 w-full text-center"
        >
          {loading ? "Tunggu..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
