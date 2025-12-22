'use client';

import { ToastContainer } from "react-toastify";

export default function ToastProviders({ children }) {
    return (
        <>
            <ToastContainer position="top-right" autoClose={1000} />
            {children}
        </>
    );
}