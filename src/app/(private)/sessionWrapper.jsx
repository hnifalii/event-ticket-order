'use client';

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SessionWrapper({ children }) {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push('/auth');
            router.refresh();
        } else {
            if (session !== undefined) {
                switch (session?.user.role) {
                    case "admin":
                        router.push('/admin');
                        router.refresh();
                        break;
                    case "organizer":
                        router.push('/organizer');
                        router.refresh();
                        break;
                    default:
                        router.push('/');
                        router.refresh();
                }
            } else {
                router.push('/auth');
                router.refresh();
            }
        }
    }, [router, status, session, session?.user.role]);

    return (
        children
    );
}