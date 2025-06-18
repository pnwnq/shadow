import NextAuth from 'next-auth';
import authConfig from '@/auth.config';
import { NextRequest } from 'next/server';

const { auth } = NextAuth(authConfig);

export default auth((req: NextRequest) => {
      const { nextUrl } = req;
      const isLoggedIn = !!req.auth;

      console.log('ROUTE: ', nextUrl.pathname);
      console.log('IS LOGGED IN: ', isLoggedIn);
});

// Optionally, don't invoke Middleware on some paths
export const config = {
      matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}; 