import NextAuth, { AuthOptions, DefaultSession, User } from 'next-auth';
import { AdapterUser } from 'next-auth/adapters';
import { JWT } from 'next-auth/jwt';
import { PrismaAdapter } from '@auth/prisma-adapter';
import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';

import { db } from '@/lib/prisma';

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: '邮箱', type: 'email' },
        password: { label: '密码', type: 'password' },
      },
      async authorize(credentials) {
        console.log('--- Authorize function started ---');
        if (!credentials?.email || !credentials.password) {
          console.log('Credential check failed: Missing email or password.');
          return null;
        }
        console.log(`Attempting to find user with email: ${credentials.email}`);

        const user = await db.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.password) {
          console.log(`User lookup failed: User with email ${credentials.email} not found, or user has no password.`);
          return null;
        }

        console.log(`User found: ${user.email}. Comparing passwords...`);
        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          console.log(`Password comparison failed for user: ${user.email}`);
          return null;
        }

        console.log(`Authentication successful for user: ${user.email}`);
        return user;
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
        session.user.role = token.role;
        session.user.status = token.status;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.status = user.status;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}; 