'use client';

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [eventId, setEventId] = useState("");
    const [loading, setLoading] = useState(false);

    const { data: session, status } = useSession();

    const router = useRouter();

    const handleSubmit = () => {
        setLoading(true);
        alert(username + password + name + eventId)
        setLoading(false);
    };

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
    });

    return (
        <div className="min-h-screen flex flex-col justify-center items-center">
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <div className="flex flex-col gap-1 w-full">
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" onChange={(e) => setUsername(e.target.value)} className="focus:outline-none ring-1 focus:ring-purple-400 rounded-md p-2"/>
                </div>
                <div className="flex flex-col gap-1 w-full">
                    <label htmlFor="password">Password</label>
                    <input type="text" name="password" onChange={(e) => setPassword(e.target.value)} className="focus:outline-none ring-1 focus:ring-purple-400 rounded-md p-2"/>
                </div>
                <div className="flex flex-col gap-1 w-full">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" onChange={(e) => setName(e.target.value)} className="focus:outline-none ring-1 focus:ring-purple-400 rounded-md p-2"/>
                </div>
                <div className="flex flex-col gap-1 w-full">
                    <label htmlFor="username">Event</label>
                    <select name="eventId" onChange={(e) => setEventId(e.target.value)} className="focus:outline-none ring-1 focus:ring-purple-400 rounded-md p-2">
                        <option value="1">Event Satu</option>
                        <option value="2">Event Dua</option>
                        <option value="3">Event Tiga</option>
                    </select>
                </div>

                <button disabled={loading} type="submit" className="py-2 px-3 rounded-md bg-purple-400 text-white active:bg-purple-200 hover:bg-purple-300 font-semibold disabled:grayscale-50 transition duration-200 w-full text-center">{loading ? 'Tunggu...' : 'Submit'}</button>
            </form>
        </div>
    )
}