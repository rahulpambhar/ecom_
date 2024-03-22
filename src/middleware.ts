import { withAuth } from 'next-auth/middleware';
import { NextRequest, NextResponse } from 'next/server';

export default withAuth(
    (req) => {
        if (req.nextUrl.pathname.startsWith("/admin") && !req.nextauth.token?.isAdmin) {
            console.log('req.nextauth.token?.isAdmin::: ', req.nextauth.token?.isAdmin);
            return NextResponse.redirect(new URL("/denied", req.url))
        }
        if (req.nextUrl.pathname.startsWith("/register") && req.nextauth.token) {
            return NextResponse.redirect(new URL("/", req.url))
        }
        if (req.nextUrl.pathname.startsWith("/checkout") && !req.nextauth.token) {
            return NextResponse.redirect(new URL("/", req.url))
        }
    },
    {
        callbacks: {
            authorized: ({ token, req }) => {
                if (!token && req.nextUrl.pathname.startsWith("/register")) {
                    return true
                }
                if (!token && req.nextUrl.pathname.startsWith("/checkout")) {
                    return true
                }
                return token != null
            }
        },
        pages: {
            signIn: '/'
        }
    }
);

export const config = {
    matcher: ['/admin/:path*', "/register", "/checkout"]
};
