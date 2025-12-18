"use client";

import { getSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import NextTopLoader from "nextjs-toploader";
import { useState } from "react";
import ToastProviders from "../toastProviders";
import Image from "next/image";
import ImgTicketing from "@/assets/img_ticketing.png";

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
      strokeWidth="2"
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    ></path>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
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
      strokeWidth="2"
      d="M13.875 18.828c-1.554 1.156-3.35 1.776-5.275 1.776H4.5A2.25 2.25 0 012.25 18V6A2.25 2.25 0 014.5 3.75h4.125c1.925 0 3.721.62 5.275 1.776m-5.275 1.156A3.75 3.75 0 1018.75 12.375M12 18V6m-1.5 6L12 9l1.5 3"
    ></path>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
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

const LoadingSpinner = () => (
  <div className="flex flex-row gap-3 items-center justify-center">
    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
    <h1 className="font-semibold text-white">Tunggu...</h1>
  </div>
);

const ErrorMessage = ({ message }) => (
  <p className="text-red-500 text-sm p-3 bg-red-100 rounded-sm border-s-[3px]">
    {message}
  </p>
);

export default function Page() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (username == "" || password == "") {
      setError("Mohon isi semua field yang tersedia!");
      setLoading(false);
      return;
    }

    if (password.length < 8) {
      setError("Panjang minimal password adalah 8");
      setLoading(false);
      return;
    }

    const result = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });

    const session = await getSession();

    if (result?.error) {
      setError("Username atau password salah!");
      setLoading(false);
      router.push("/auth");
      router.refresh();
    } else {
      if (session != null) {
        switch (session?.user.role) {
          case "admin":
            router.push("/admin");
            router.refresh();
            break;
          case "organizer":
            router.push("/organizer");
            router.refresh();
            break;
          default:
            router.push("/");
            router.refresh();
        }
      } else {
        router.push("/auth");
        router.refresh();
      }
    }
  };

  return (
    <>
      <NextTopLoader
        color="#7209b7"
        initialPosition={0.08}
        crawlSpeed={200}
        height={3}
        crawl={true}
        showSpinner={false}
        easing="ease"
        speed={200}
      />
      <ToastProviders position="top-right" autoClose={1000} />
      <div className="flex min-h-screen">
        <div className="w-full md:w-1/2 flex items-center justify-center px-8">
          <div className="w-full max-w-md space-y-4">
            <h1 className="text-4xl font-bold text-[#7209b7]">
              Selamat Datang!
            </h1>

            <p className="opacity-70">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Distinctio, fuga?
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div>
                <label htmlFor="username" className="font-medium">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoFocus
                  className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#7209b7]"
                />
              </div>

              <div>
                <label htmlFor="password" className="font-medium">
                  Password
                </label>

                <PasswordToggleInput
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {error && <ErrorMessage message={error} />}

              <button
                disabled={loading}
                type="submit"
                className="w-full py-2 bg-[#f72585] rounded-md font-semibold text-white hover:opacity-90 disabled:opacity-60 transition"
              >
                {loading ? <LoadingSpinner /> : "Log In"}
              </button>
            </form>
          </div>
        </div>

        <div className="hidden md:block w-1/2 relative rounded-l-lg overflow-hidden">
          <Image
            src={ImgTicketing}
            alt="img-ticketing"
            fill
            className="object-cover"
            priority
          />

          <div className="absolute inset-0 bg-black/22"></div>

          <div className="absolute bottom-0 left-0 flex flex-col justify-center px-8 py-12 space-y-3">
            <h2 className="text-4xl font-bold text-white">ticken</h2>
            <hr className="text-white h-[0.25px] w-full" />
            <p className="text-white/80 mt-2 max-w-md">
              Kelola tiket dengan mudah, cepat, dan aman. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio minus culpa aut.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
