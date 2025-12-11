'use client';

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {

    const { data: session, status } = useSession();

    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push('/auth');
            router.refresh();
        } else {
            if (session !== undefined && session?.user.role !== 'admin') {
                router.push('/auth');
                router.refresh();
            }
        }
    }, [router, session, status, session?.user.role]);

    return (
        <div className="flex flex-col justify-center gap-5 px-6 py-6 md:px-24 md:py-8">
            <h1 className="text-3xl font-semibold">Admin Page</h1>
            <p className="text-lg font-thin">Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis dolorem quisquam quos incidunt sed optio repellat suscipit non consectetur at.</p>

            <div className="flex flex-col gap-2 p-5 rounded-lg outline-1 outline-gray-500/50">
                <h1 className="text-xl font-medium">Tambah Event Baru</h1>
                <p className="font-thin">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, eius.</p>
                <Link href="/admin/add-event" className="w-fit bg-pink-600 text-white font-semibold rounded-md py-2 px-3 hover:opacity-80 active:bg-pink-400 transition duration-200">Tambah Event</Link>
            </div>
            
            <div className="flex flex-col gap-2 p-5 rounded-lg outline-1 outline-gray-500/50">
                <h1 className="text-xl font-medium">Tambah Panitia Event Baru</h1>
                <p className="font-thin">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, eius.</p>
                <Link href="/admin/add-organizer" className="w-fit bg-pink-600 text-white font-semibold rounded-md py-2 px-3 hover:opacity-80 active:bg-pink-400 transition duration-200">Tambah Panitia</Link>
            </div>
        </div>
    );
}