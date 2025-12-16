import { withAuth } from "next-auth/middleware";

// export default withAuth({
//     callbacks: {
//         authorized: ({ token }) => !!token,
//     },
// });

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const { pathname } = req.nextUrl;

    if (token) {
      const role = token.role;

      if (role === "admin") {
        return NextResponse.redirect(new URL("/admin", req.url));
      }

      if (role === "organizer") {
        return NextResponse.redirect(new URL("/organizer", req.url));
      }

      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
    matcher: ["/(private)/:path*", "/auth/:path*"],
}