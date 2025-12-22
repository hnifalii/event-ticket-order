"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const EyeIcon = (props) => (
  <svg
    {...props}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1"
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    ></path>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1"
      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
    ></path>
  </svg>
);

const EyeOffIcon = (props) => (
  <svg
    {...props}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1"
      d="M13.875 18.828c-1.554 1.156-3.35 1.776-5.275 1.776H4.5A2.25 2.25 0 012.25 18V6A2.25 2.25 0 014.5 3.75h4.125c1.925 0 3.721.62 5.275 1.776m-5.275 1.156A3.75 3.75 0 1018.75 12.375M12 18V6m-1.5 6L12 9l1.5 3"
    ></path>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1"
      d="M21 21L3 3"
    ></path>
  </svg>
);

const PasswordToggleInput = ({ name = "password", value, onChange }) => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible((prev) => !prev);
  const inputType = isVisible ? "text" : "password";

  return (
    <div className="relative mt-1">
      <input
        id={name}
        name={name}
        type={inputType}
        value={value}
        onChange={onChange}
        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none ring-1 ring-transparent focus:ring-2 focus:ring-[#7209b7] sm:text-sm pr-10 transition duration-150"
      />

      <button
        type="button"
        onClick={toggleVisibility}
        className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-gray-400 hover:text-gray-600 focus:outline-none"
        aria-label={isVisible ? "Sembunyikan password" : "Tampilkan password"}
      >
        {isVisible ? (
          <EyeOffIcon className="h-5 w-5" />
        ) : (
          <EyeIcon className="h-5 w-5" />
        )}
      </button>
    </div>
  );
};

const ErrorMessage = ({ message }) => (
  <p className="text-red-500 text-sm p-3 bg-red-100 rounded-sm border-s-[3px]">
    {message}
  </p>
);

export default function Form({ selectedEventId, selectedEventName }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);

    try {
      if (
        email == "" ||
        name == "" ||
        username == "" ||
        password == "" ||
        confirmPassword == ""
      ) {
        setError("Mohon isi semua field yang tersedia!");
        return;
      }

      if (password.length < 8) {
        setError("Panjang minimal password adalah 8");
        return;
      }

      if (password !== confirmPassword) {
        setError("Konfirmasi password tidak sesuai");
        return;
      }

      const response = await fetch(
        `/api/event/${selectedEventId}/add-organizer`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        setError("Gagal membuat akun.");
        return;
      }

      const result = await response.json();

      if (result.status === 409) {
        setError(result.message);
        return;
      }

      if (result.status === 500) {
        setError("Gagal membuat akun");
        return;
      }

      router.push(`/admin/detail/${selectedEventId}`);
      router.refresh();
      toast.success(result.message);
    } catch (err) {
      setError("Kesalahan saat mengirim/memproses:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col px-6 py-6 md:px-24 md:py-8">
      <h1 className="text-3xl font-medium">Tambah Panitia Baru</h1>
      <p className="mt-2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque, iste.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-6">
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="email" className="font-medium">
            Email
          </label>
          <input
            type="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none ring-1 ring-transparent focus:ring-2 focus:ring-[#7209b7] sm:text-sm pr-10 transition duration-150"
          />
        </div>
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
          <label htmlFor="username" className="font-medium">
            Username
          </label>
          <input
            type="text"
            name="username"
            onChange={(e) => setUsername(e.target.value)}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none ring-1 ring-transparent focus:ring-2 focus:ring-[#7209b7] sm:text-sm pr-10 transition duration-150"
          />
        </div>
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="password" className="font-medium">
            Password
          </label>

          <PasswordToggleInput
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="password" className="font-medium">
            Confirm Password
          </label>

          <PasswordToggleInput
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="eventId" className="font-medium">
            Event
          </label>
          <select
            name="eventId"
            onChange={(e) => setEventId(e.target.value)}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none ring-1 ring-transparent focus:ring-2 focus:ring-[#7209b7] sm:text-sm pr-10 transition duration-150"
          >
            <option value={selectedEventId}>{selectedEventName}</option>
          </select>
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
