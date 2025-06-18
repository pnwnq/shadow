// auth.ts

import NextAuth, { type AuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import bcrypt from 'bcryptjs';

import { db } from "@/lib/prisma";
import { LoginSchema } from "@/schemas";
import { getUserByEmail, getUserById } from "@/data/user";
import { Role } from "@prisma/client";

// This is a temporary workaround to augment the session type
// The proper way is to have a next-auth.d.ts file
declare module "next-auth" {
      interface Session {
            user: {
                  id: string;
                  role: Role;
            } & import("next-auth").DefaultSession["user"];
      }
}

export const authOptions: AuthOptions = {
      adapter: PrismaAdapter(db),
      session: {
            strategy: "jwt",
      },
      pages: {
            signIn: "/login",
      },
      providers: [
            GitHubProvider({
                  clientId: process.env.GITHUB_ID ?? '',
                  clientSecret: process.env.GITHUB_SECRET ?? '',
            }),
            CredentialsProvider({
                  // The name to display on the sign in form (e.g. "Sign in with...")
                  name: "Credentials",
                  // `credentials` is used to generate a form on the sign in page.
                  // You can specify which fields should be submitted, by adding keys to the `credentials` object.
                  // e.g. credentials: { username: { label: "Username", type: "text", placeholder: "jsmith" }, password: { label: "Password", type: "password" } }
                  credentials: {
                        email: { label: "Email", type: "text" },
                        password: { label: "Password", type: "password" }
                  },
                  async authorize(credentials) {
                        if (!credentials?.email || !credentials?.password) {
                              return null;
                        }

                        const validatedFields = LoginSchema.safeParse(credentials);

                        if (validatedFields.success) {
                              const { email, password } = validatedFields.data;

                              const user = await getUserByEmail(email);
                              if (!user || !user.password) return null;

                              const passwordsMatch = await bcrypt.compare(password, user.password);

                              if (passwordsMatch) {
                                    return user;
                              }
                        }

                        return null;
                  }
            })
      ],
      callbacks: {
            async jwt({ token, user }) {
                  if (user) {
                        token.sub = user.id;
                        // After a user logs in, their role and status are added to the token
                        const dbUser = await getUserById(token.sub);
                        if (dbUser) {
                              token.role = dbUser.role;
                              token.status = dbUser.status;
                        }
                  }
                  return token;
            },
            async session({ session, token }) {
                  if (token.sub && session.user) {
                        session.user.id = token.sub;
                        session.user.role = token.role as Role;
                  }
                  return session;
            },
      },
      secret: process.env.NEXTAUTH_SECRET,
};