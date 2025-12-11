'use client';

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const VIPPriceInput = ({ onChange }) => (
    <div className="flex flex-col gap-1 w-full">
        <label htmlFor="vipPrice">VIP Price</label>
        <input type="number" name="vipPrice" onChange={onChange} className="focus:outline-none ring-1 focus:ring-purple-400 rounded-md p-2"/>
    </div>
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

    const { data: session, status } = useSession();

    const router = useRouter();

    if (status === "unauthenticated") {
        router.push('/auth');
        router.refresh();
    } else {
        if (session !== undefined && session?.user.role !== 'admin') {
            router.push('/auth');
            router.refresh();
        }
    }

    const handleSubmit = () => {
        setLoading(true);
        alert(name + description + location + ticketType + regularPrice + vipPrice)
        setLoading(false);
    };

    return (
        <div className="flex flex-col justify-center items-center w-full my-10">
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 justify-center">
                <div className="flex flex-col gap-1 w-full">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" onChange={(e) => setName(e.target.value)} className="focus:outline-none focus:ring-purple-400 ring-1 rounded-md p-2"/>
                </div>
                <div className="flex flex-col gap-1 w-full">
                    <label htmlFor="description">Description</label>
                    <textarea type="text" rows={5} name="description" onChange={(e) => setDescription(e.target.value)} className="focus:outline-none focus:ring-purple-400 ring-1 rounded-md p-2"/>
                </div>
                <div className="flex flex-col gap-1 w-full">
                    <label htmlFor="location">Location</label>
                    <input type="text" name="location" onChange={(e) => setLocation(e.target.value)} className="focus:outline-none focus:ring-purple-400 ring-1 rounded-md p-2"/>
                </div>
                <div className="flex flex-col gap-1 w-full">
                    <label htmlFor="ticketType">Ticket Type</label>
                    <select type="text" name="ticketType" onChange={(e) => setTicketType(e.target.value)} className="focus:outline-none focus:ring-purple-400 ring-1 rounded-md p-2">
                        <option value="single">Single</option>
                        <option value="tiered">Tiered</option>
                    </select>
                </div>
                <div className="flex flex-col gap-1 w-full">
                    <label htmlFor="regularPrice">Regular Price</label>
                    <input type="number" name="regularPrice" onChange={(e) => setRegularPrice(e.target.value)} className="focus:outline-none focus:ring-purple-400 ring-1 rounded-md p-2"/>
                </div>
                {ticketType == "tiered" && <VIPPriceInput onChange={(e) => setVipPrice(e.target.value)} />}
                <div className="flex flex-col gap-1 w-full">
                    <label htmlFor="date">Date</label>
                    <input type="date" name="date" onChange={(e) => setDate(e.target.value)} className="focus:outline-none focus:ring-purple-400 ring-1 rounded-md p-2"/>
                </div>
                <div className="flex flex-col gap-1 w-full">
                    <label htmlFor="timeStart">Time Start</label>
                    <input type="text" name="timeStart" onChange={(e) => setTimeStart(e.target.value)} className="focus:outline-none focus:ring-purple-400 ring-1 rounded-md p-2"/>
                </div>
                <div className="flex flex-col gap-1 w-full">
                    <label htmlFor="timeEnd">Time End</label>
                    <input type="text" name="timeEnd" onChange={(e) => setTimeEnd(e.target.value)} className="focus:outline-none focus:ring-purple-400 ring-1 rounded-md p-2"/>
                </div>

                <button disabled={loading} type="submit" className="py-2 px-3 rounded-md bg-purple-400 text-white active:bg-purple-200 hover:bg-purple-300 font-semibold disabled:grayscale-50 transition duration-200 w-full text-center">{loading ? 'Tunggu...' : 'Submit'}</button>
            </form>
        </div>
    );
}