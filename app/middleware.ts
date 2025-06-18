import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { UserStatus } from "@prisma/client";

// Define routes that are public and do not require authentication
const publicRoutes = ["/login", "/register", "/about", "/contact"];

// The page for users whose accounts are pending approval
const pendingApprovalPage = "/pending-approval";

// The default redirect path after a user logs in successfully
const defaultRedirect = "/home";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(request: NextRequestWithAuth) {
    const { pathname } = request.nextUrl;
    const { token } = request.nextauth;

    // If user is not logged in, `token` will be null.
    // withAuth handles redirection to login page automatically.

    // If user is logged in, check their status
    if (token) {
      const userStatus = token.status as UserStatus;

      // If user is pending and not on the approval page, redirect them there
      if (userStatus === UserStatus.PENDING && pathname !== pendingApprovalPage) {
        return NextResponse.redirect(new URL(pendingApprovalPage, request.url));
      }

      // If user is active and trying to access the approval page, redirect to dashboard
      if (userStatus === UserStatus.ACTIVE && pathname === pendingApprovalPage) {
        return NextResponse.redirect(new URL(defaultRedirect, request.url));
      }
    }

    // Allow the request to proceed
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token, // This ensures that only authenticated users can access protected pages.
    },
    pages: {
      signIn: "/login",
    },
  }
);

// Match all paths except for static files, public files, and Next.js internals
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|images|favicon.ico).*)",
  ],
};
