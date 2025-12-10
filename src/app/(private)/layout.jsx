'use client';

import { SessionProvider } from "next-auth/react";

export default function PrivateLayout({ children }) {
    return <SessionProvider>{children}</SessionProvider>
}