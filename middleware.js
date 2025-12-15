import { withAuth } from "next-auth/middleware";
import { getSession } from "next-auth/react";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export default withAuth({
    callbacks: {
        authorized: ({ token }) => !!token,
    },
});

export const config = {
    matcher: ["/(private)/:path*"],
}