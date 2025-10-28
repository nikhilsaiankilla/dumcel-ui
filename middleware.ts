import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const token = req.cookies.get("token")?.value;
    const { pathname } = req.nextUrl;

    // Protected routes (require auth)
    const protectedRoutes = ["/dashboard"];

    // Auth-only routes (should not be accessible when logged in)
    const authRoutes = ["/login", "/signup", "/verify-otp", "/forget-password"];

    // If route starts with any protected route but no token → redirect to login
    if (protectedRoutes.some((route) => pathname.startsWith(route))) {
        if (!token) {
            const loginUrl = new URL("/login", req.url);
            loginUrl.searchParams.set("redirect", pathname);
            return NextResponse.redirect(loginUrl);
        }
    }

    // If token exists and user tries to access auth-related route → redirect to dashboard
    if (token && authRoutes.some((route) => pathname.startsWith(route))) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
}

// Apply middleware to relevant paths
export const config = {
    matcher: [
        "/dashboard/:path*",
        "/login",
        "/signup",
        "/verify-otp",
        "/forget-password",
    ],
};
