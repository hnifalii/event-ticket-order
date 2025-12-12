'use client';

import { events } from "@/data/events";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
    const { data: session, status } = useSession();
    
    const router = useRouter();

    const search = useSearchParams();
    const eventId = search.get("eventId");

    const event = events.find((e) => e.id == eventId);

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push('/auth');
            router.push();
        } else {
            if (session !== undefined && session?.user.role !== 'admin') {
                router.push('/auth');
                router.push();
            }
        }
    });

    return (
        <>
        {event != null ? (
            <div className="flex flex-col gap-5 px-6 py-6 md:px-24 md:py-8">
                <h1 className="text-3xl font-semibold">Detail Event</h1>
                <hr className="opacity-50" />
                <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-1">
                        <h2 className="font-medium text-lg">Name</h2>
                        <p>{event.name}</p>
                    </div>
                    <div className="flex flex-col gap-1">
                        <h2 className="font-medium text-lg">Description</h2>
                        <p>{event.description}</p>
                    </div>
                </div>
                <div className="flex flex-col gap-2 p-5 rounded-lg outline-1 outline-gray-500/50">
                    <h1 className="text-xl font-medium">Tambah Panitia untuk Event Ini</h1>
                    <p className="font-thin">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, eius.</p>
                    <Link href={`/admin/add-organizer?eventId=${event.id}`} className="w-fit mt-6 bg-[#f72585] active:bg-[#f72585]/80 hover:bg-[#f72585]/80 text-white font-semibold rounded-md py-2 px-3 transition duration-200">Tambah Panitia</Link>
                </div>
            </div>
        ) : (
            <div className="min-h-screen flex flex-col justify-center items-center">
                <h1 className="font-semibold text-2xl">Event Tidak Tersedia</h1>
            </div>
        )}
        </>
    );
}