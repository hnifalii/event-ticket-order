'use client';

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
    const [loadingSignOut, setLoadingSignOut] = useState(false);

    const { data: session, status } = useSession();

    const router = useRouter();

    const handleSignOut = () => {
        setLoadingSignOut(true);

        // signOut({ callbackUrl: '/auth' });

        signOut({ redirect: false });
        router.push('/auth');
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
    }, [router, session, status, session?.user.role]);

    return (
        <div className="flex flex-col justify-center items-center">
            <h1>admin</h1>

            <button onClick={handleSignOut} disabled={loadingSignOut} className="py-2 px-4 bg-red-500 rounded-md text-white disabled:grayscale-25">
                {loadingSignOut ? 'Tunggu...' : 'Log Out'}
            </button>
        </div>
    );
}