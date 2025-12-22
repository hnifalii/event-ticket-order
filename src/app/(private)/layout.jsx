"use client";

import { SessionProvider, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  IoLogoInstagram,
  IoLogoTwitter,
  IoLogoYoutube,
  IoMdMenu,
} from "react-icons/io";
import ToastProviders from "../toastProviders";
import NextTopLoader from "nextjs-toploader";
import SessionWrapper from "./sessionWrapper";

const Header = () => {
  const [navOpened, setNavOpened] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSignOut = () => {
    setLoading(true);

    signOut({ redirect: false });
    router.push("/auth");
  };

  return (
    <>
      {/* OVERLAY */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          navOpened
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setNavOpened(false)}
      ></div>

      {/* MOBILE MENU */}
      <div
        className={`fixed top-0 right-0 z-40 min-h-screen w-2/3 max-w-xs bg-white shadow-xl 
          transform transition-transform duration-300 
          flex flex-col gap-4 p-6 font-rose
          ${navOpened ? "translate-x-0" : "translate-x-full"}`}
      >
        <h2 className="text-2xl font-semibold">Admin Menu</h2>

        <hr className="opacity-20" />

        <Link
          href={"/admin/add-event"}
          onClick={() => setNavOpened(false)}
          className="hover:underline"
        >
          Add Event
        </Link>
        <Link
          href={"/admin/profile"}
          onClick={() => setNavOpened(false)}
          className="hover:underline"
        >
          My Profile
        </Link>

        <button
          onClick={handleSignOut}
          disabled={loading}
          className="self-baseline py-2 px-4 rounded-md text-white bg-red-500 active:bg-red-400 hover:opacity-80 disabled:opacity-60 transition duration-100"
        >
          {loading ? "Tunggu..." : "Logout"}
        </button>
      </div>

      {/* HEADER */}
      <header className="sticky top-0 z-30 w-full flex px-6 md:px-24 py-4 justify-between items-center shadow-xs bg-white">
        <Link href="/admin" className="font-semibold text-lg">
          Admin
        </Link>

        <div className="hidden md:flex flex-row gap-4">
          <Link
            href="/admin/add-event"
            className="hover:opacity-80 active:text-gray-900 transition duration-200"
          >
            Add Event
          </Link>
          <Link
            href="/admin/profile"
            className="hover:opacity-80 active:text-gray-900 transition duration-200"
          >
            My Profile
          </Link>
        </div>

        <button
          onClick={handleSignOut}
          disabled={loading}
          className="hidden md:block self-end py-2 px-4 rounded-md text-white bg-red-500 active:bg-red-400 hover:opacity-80 disabled:opacity-60 transition duration-100"
        >
          {loading ? "Tunggu..." : "Logout"}
        </button>

        <button className="block md:hidden" onClick={() => setNavOpened(true)}>
          <IoMdMenu className="size-8" />
        </button>
      </header>
    </>
  );
};

const Footer = () => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSignOut = () => {
    setLoading(true);

    signOut({ redirect: false });
    router.push("/auth");
  };

  return (
    <footer className="w-full flex flex-col pt-12 mt-20 bg-[#7209b7] text-white">
      <div className="flex flex-col md:grid md:grid-cols-3 lg:grid lg:grid-cols-3 px-6 md:px-12 lg:px-24 pb-12 gap-10 lg:gap-8">
        <div className="flex flex-col gap-4">
          <h2 className="text-3xl font-semibold font-rose text-white">
            ticken <span className="text-xl">(Admin)</span>
          </h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita et
            eos nihil totam sequi provident debitis voluptatum id iusto veniam!
          </p>
          <div className="flex flex-row gap-3">
            <IoLogoInstagram className="size-7 hover:cursor-pointer" />
            <IoLogoTwitter className="size-7 hover:cursor-pointer" />
            <IoLogoYoutube className="size-7 hover:cursor-pointer" />
          </div>
        </div>

        <div className="flex w-full md:justify-center lg:justify-center">
          <div>
            <h6 className="text-xl font-medium">Links</h6>
            <ul className="list-none mt-4 space-y-2">
              <li>
                <Link href="/admin" className="hover:underline">
                  My Events
                </Link>
              </li>
              <li>
                <Link href="/admin/add-event" className="hover:underline">
                  Add New Event
                </Link>
              </li>
              <li>
                <Link href="/admin/profile" className="hover:underline">
                  My Profile
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="fflex w-full md:justify-center lg:justify-center">
          <div>
            <h6 className="text-xl font-medium">Action</h6>

            {!loading ? (
              <button
                onClick={handleSignOut}
                className="hover:underline w-fit mt-4"
              >
                Logout
              </button>
            ) : (
              <h1 className="mt-4">Tunggu...</h1>
            )}
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col md:flex-row px-6 md:px-12 lg:px-24 py-6 gap-4 md:gap-0 border-t border-t-white justify-between items-center">
        <div className="flex gap-2">
          <div className="size-2 rounded-full bg-white"></div>
          <div className="size-2 rounded-full bg-white"></div>
          <div className="size-2 rounded-full bg-white"></div>
        </div>

        <h6 className="text-white font-medium text-center">
          &copy;2025. Ticken.
        </h6>
      </div>
    </footer>
  );
};

export default function Layout({ children }) {
  const pathname = usePathname();

  const hideHeader = ["/organizer", "/organizer/profile"].includes(pathname) || (pathname.startsWith("/organizer/event/") && pathname.endsWith("/scan"));
  const hideFooter = ["/organizer", "/organizer/profile"].includes(pathname) || (pathname.startsWith("/organizer/event/") && pathname.endsWith("/scan"));

  return (
    <SessionProvider>
      <SessionWrapper>
        {!hideHeader && <Header />}
        <ToastProviders>
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
          {children}
        </ToastProviders>
        {!hideFooter && <Footer />}
      </SessionWrapper>
    </SessionProvider>
  );
}
