// auth.ts

import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';

import { db } from '@/lib/prisma';
import authConfig from '@/auth.config';
import { getUserById } from '@/data/user';
import { Role } from '@prisma/client';

export const {
      handlers,
      auth,
      signIn,
      signOut,
} = NextAuth({
      pages: {
            signIn: '/login',
            error: '/error',
      },
      events: {
            async linkAccount({ user }) {
                  await db.user.update({
                        where: { id: user.id },
                        data: { emailVerified: new Date() },
                  });
            },
      },
      callbacks: {
            async signIn({ user, account }) {
                  if (account?.provider !== 'credentials') return true;
                  if (!user.id) return false;
                  const existingUser = await getUserById(user.id);
                  if (!existingUser?.emailVerified) return false;
                  return true;
            },
            async session({ token, session }) {
                  if (token.sub && session.user) {
                        session.user.id = token.sub;
                  }
                  if (token.role && session.user) {
                        session.user.role = token.role as Role;
                  }
                  return session;
            },
            async jwt({ token }) {
                  if (!token.sub) return token;

                  const existingUser = await getUserById(token.sub);
                  if (!existingUser) return token;

                  token.role = existingUser.role;
                  return token;
            },
      },
      adapter: PrismaAdapter(db),
      session: { strategy: 'jwt' },
      ...authConfig,
});

export const currentUser = async () => {
      const session = await auth();
      return session?.user;
};

export const currentRole = async () => {
      const session = await auth();
      return session?.user?.role;
};