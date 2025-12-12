'use client';

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { events } from "@/data/events";

export default function Page() {
    const { data: session, status } = useSession();

    const router = useRouter();

    // const myEvents = events.filter((e) => e.userId === session?.user.id);
    const myEvents = events.filter((e) => e.userId === 1);

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
                <Link href="/admin/add-event" className="w-fit bg-[#f72585] mt-4 text-white font-semibold rounded-md py-2 px-3 active:bg-[#f72585]/80 hover:bg-[#f72585]/80 transition duration-200">Tambah Event</Link>
            </div>

            <div className="flex flex-col items-center gap-3 mt-4">
                <h1 className="text-2xl font-medium md:self-start">Event Saya</h1>
                {myEvents && myEvents.length > 0 ? (
                    myEvents.map((event) => (
                        <div key={event.id} className="p-3 rounded-lg shadow-sm flex flex-col gap-2 text-black w-full max-w-md">
                            <Link href={`/admin/detail?eventId=${event.id}`}><h2 className="text-lg font-semibold active:opacity-80 hover:underline">{event.name}</h2></Link>
                            {/* <Image src={event.image} alt={event.name} width={300} height={300} className="rounded-lg object-cover"/> */}
                            <p className="text-sm opacity-80">{event.description}</p>
                            {/* <p className="text-sm opacity-80">{event.date}</p> */}
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 text-sm mt-4">Belum ada event.</p>
                )}
            </div>
        </div>
    );
}