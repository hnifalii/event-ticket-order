'use client';

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const VIPPriceInput = ({ onChange }) => (
    <div className="flex flex-col gap-1 w-full">
        <label htmlFor="vipPrice">VIP Price</label>
        <input required type="number" name="vipPrice" onChange={onChange} className="focus:outline-none ring-1 focus:ring-purple-400 rounded-md p-2"/>
    </div>
);

const ErrorMessage = ({ message }) => (
    <p className="text-red-500 text-sm p-3 bg-red-100 rounded-sm border-s-[3px]">{message}</p>
);

export default function Page() {
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

    const API_URL = "https://capsular-peddlingly-immanuel.ngrok-free.dev/webhook-test/post/event/create";

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (name == "" || description == "" || location == "" || ticketType == "" || regularPrice <= 0 || vipPrice <= 0 || date == "" || timeStart == "" || timeEnd == "") {
                setError("Mohon isi semua field yang tersedia!");
                return;
            }

            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: name,
                    description: description,
                    location: location,
                    ticketType: ticketType,
                    regularPrice: regularPrice,
                    vipPrice: vipPrice,
                    date: date,
                    timeStart: timeStart,
                    timeEnd: timeEnd,
                }),
            });

            if (!response.ok) {
                setError(`Server error: HTTP ${response.status}`);
                return;
            }

            const result = await response.json();

            if (result && result.success === true) {
                router.push('/admin');
                router.refresh();
                toast.success("Berhasil!");
            } else {
                setError(result.data || result.message || "Failed to create new event.");
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
            <p className="mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque, iste.</p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5 justify-center mt-6">
                <div className="flex flex-col gap-1 w-full">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" onChange={(e) => setName(e.target.value)} className="focus:outline-none focus:ring-2 focus:ring-[#7209b7]/80 ring-1 rounded-md py-2 px-3"/>
                </div>
                <div className="flex flex-col gap-1 w-full">
                    <label htmlFor="description">Description</label>
                    <textarea type="text" rows={5} name="description" onChange={(e) => setDescription(e.target.value)} className="focus:outline-none focus:ring-2 focus:ring-[#7209b7]/80 ring-1 rounded-md py-2 px-3"/>
                </div>
                <div className="flex flex-col gap-1 w-full">
                    <label htmlFor="location">Location</label>
                    <input type="text" name="location" onChange={(e) => setLocation(e.target.value)} className="focus:outline-none focus:ring-2 focus:ring-[#7209b7]/80 ring-1 rounded-md py-2 px-3"/>
                </div>
                <div className="flex flex-col gap-1 w-full">
                    <label htmlFor="ticketType">Ticket Type</label>
                    <select type="text" name="ticketType" onChange={(e) => setTicketType(e.target.value)} className="focus:outline-none focus:ring-2 focus:ring-[#7209b7]/80 ring-1 rounded-md py-2 px-3">
                        <option value="single">Single</option>
                        <option value="tiered">Tiered</option>
                    </select>
                </div>
                <div className="flex flex-col gap-1 w-full">
                    <label htmlFor="regularPrice">Regular Price</label>
                    <input type="number" name="regularPrice" onChange={(e) => setRegularPrice(e.target.value)} className="focus:outline-none focus:ring-2 focus:ring-[#7209b7]/80 ring-1 rounded-md py-2 px-3"/>
                </div>
                {ticketType == "tiered" && <VIPPriceInput onChange={(e) => setVipPrice(e.target.value)} />}
                <div className="flex flex-col gap-1 w-full">
                    <label htmlFor="date">Date</label>
                    <input type="date" name="date" onChange={(e) => setDate(e.target.value)} className="focus:outline-none focus:ring-2 focus:ring-[#7209b7]/80 ring-1 rounded-md py-2 px-3 w-full"/>
                </div>
                <div className="flex flex-col gap-1 w-full">
                    <label htmlFor="timeStart">Time Start</label>
                    <input type="datetime-local" name="timeStart" onChange={(e) => setTimeStart(e.target.value)} className="w-full focus:outline-none focus:ring-2 focus:ring-[#7209b7]/80 ring-1 rounded-md py-2 px-3"/>
                </div>
                <div className="flex flex-col gap-1 w-full">
                    <label htmlFor="timeEnd">Time End</label>
                    <input type="datetime-local" name="timeEnd" onChange={(e) => setTimeEnd(e.target.value)} className="w-full focus:outline-none focus:ring-2 focus:ring-[#7209b7]/80 ring-1 rounded-md py-2 px-3"/>
                </div>

                {error && <ErrorMessage message={error} />}

                <button disabled={loading} type="submit" className="p-3 rounded-lg bg-[#7209b7] text-white hover:bg-[#7209b7]/80 active:bg-[#7209b7]/80 font-semibold disabled:grayscale-50 transition duration-200 w-full text-center">{loading ? 'Tunggu...' : 'Submit'}</button>
            </form>
        </div>
    );
}