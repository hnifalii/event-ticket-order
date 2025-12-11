'use client';

import { SessionProvider, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { IoMdMenu } from "react-icons/io";

const Header = () => {
  const [navOpened, setNavOpened] = useState(false);
  const [loading, setLoading] = useState(false);

    const router = useRouter();

    const handleSignOut = () => {
        setLoading(true);

        signOut({ redirect: false });
        router.push('/auth');
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
      >
      </div>

      {/* MOBILE MENU */}
      <div
        className={`fixed top-0 right-0 z-40 h-full w-2/3 max-w-xs bg-white shadow-xl 
          transform transition-transform duration-300 
          flex flex-col gap-4 p-6 font-rose
          ${navOpened ? "translate-x-0" : "translate-x-full"}`}
      >
        <h2 className="text-2xl font-semibold mb-4">Menu</h2>

        <Link
          href={"/admin/add-event"}
          onClick={() => setNavOpened(false)}
          className="hover:underline"
        >
            Add Event
        </Link>
        <Link
          href={"/admin/add-organizer"}
          onClick={() => setNavOpened(false)}
          className="hover:underline"
        >
          Add Organizer
        </Link>

        <button onClick={handleSignOut} disabled={loading} className="self-baseline py-2 px-4 rounded-md text-white bg-red-500 active:bg-red-400 hover:opacity-80 disabled:bg-gray-600 transition duration-100">
            {loading ? 'Tunggu...' : 'Logout'}
        </button>
      </div>

      {/* HEADER */}
      <header className="sticky top-0 z-30 w-full flex px-6 md:px-24 py-4 justify-between items-center shadow-xs bg-white">
        <Link href="/admin" className="font-semibold text-lg">Admin</Link>

        <div className="hidden md:flex flex-row gap-4">
            <Link href="/admin/add-event" className="hover:opacity-80 active:text-gray-900 transition duration-200">Add Event</Link>
            <Link href="/admin/add-organizer" className="hover:opacity-80 active:text-gray-900 transition duration-200">Add Organizer</Link>
        </div>

        <button onClick={handleSignOut} disabled={loading} className="hidden md:block self-end py-2 px-4 rounded-md text-white bg-red-500 active:bg-red-400 hover:opacity-80 disabled:bg-gray-600 transition duration-100">
            {loading ? 'Tunggu...' : 'Logout'}
        </button>

        <button className="block md:hidden" onClick={() => setNavOpened(true)}>
          <IoMdMenu className="size-8" />
        </button>
      </header>
    </>
  );
}

export default function Layout({ children }) {
  const pathname = usePathname();

  const hideHeader = ["/organizer"].includes(pathname);

  return (
    <SessionProvider>
      {!hideHeader && <Header/>}
      {children}
    </SessionProvider>
  );
}