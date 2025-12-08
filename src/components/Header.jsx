"use client";

import Link from "next/link";
import { useState } from "react";
import { IoMenu } from "react-icons/io5";

export default function Header() {
  const [navOpened, setNavOpened] = useState(false);

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
          href={"/"}
          onClick={() => setNavOpened(false)}
          className="hover:underline"
        >
          Populer
        </Link>
        <Link
          href={"/"}
          onClick={() => setNavOpened(false)}
          className="hover:underline"
        >
          Terbaru
        </Link>
        <Link
          href={"/"}
          onClick={() => setNavOpened(false)}
          className="hover:underline"
        >
          Konser
        </Link>
        <Link
          href={"/"}
          onClick={() => setNavOpened(false)}
          className="hover:underline"
        >
          Talkshow
        </Link>
        <Link
          href={"/"}
          onClick={() => setNavOpened(false)}
          className="hover:underline"
        >
          Olahraga
        </Link>
      </div>

      {/* HEADER */}
      <header className="sticky top-0 z-30 w-full flex px-4 md:px-24 py-6 justify-between items-center shadow-xs bg-white">
        <Link href={"/"}>
          <h1 className="text-3xl font-semibold font-rose text-primary">
            ticken
          </h1>
        </Link>

        <nav className="hidden md:flex gap-6 text-black text-lg font-rose">
          <Link href={"/"} className="hover:underline">
            Populer
          </Link>
          <Link href={"/"} className="hover:underline">
            Terbaru
          </Link>
          <Link href={"/"} className="hover:underline">
            Konser
          </Link>
          <Link href={"/"} className="hover:underline">
            Seminar
          </Link>
          <Link href={"/"} className="hover:underline">
            Olahraga
          </Link>
        </nav>

        <button className="hidden md:block px-4 py-2 bg-primary text-white rounded-lg">
          Login
        </button>

        <button className="block md:hidden" onClick={() => setNavOpened(true)}>
          <IoMenu className="size-8 text-primary" />
        </button>
      </header>
    </>
  );
}
