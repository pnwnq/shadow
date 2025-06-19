import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { Role } from "@prisma/client";

import authConfig from "@/auth.config"
import { db } from "@/lib/prisma"
import { getUserById } from "@/data/user";

export const {
      handlers,
      auth,
      signIn,
      signOut,
} = NextAuth({
      pages: {
            signIn: "/login",
            error: "/error",
      },
      events: {
            async signIn({ user, account }) {
                  await db.auditLog.create({
                        data: {
                              action: "USER_LOGIN",
                              entityType: "USER",
                              entityId: user.id!,
                              userId: user.id!,
                              level: "INFO",
                              type: "login",
                              // IP address is not available in this event context, will be null.
                        }
                  })
            },
            async linkAccount({ user }) {
                  await db.user.update({
                        where: { id: user.id },
                        data: { emailVerified: new Date() },
                  })
            },
      },
      callbacks: {
            async session({ token, session }) {
                  if (token.sub && session.user) {
                        session.user.id = token.sub
                  }

                  if (token.role && session.user) {
                        session.user.role = token.role as Role;
                  }

                  return session
            },
            async jwt({ token }) {
                  if (!token.sub) return token;

                  const existingUser = await getUserById(token.sub);

                  if (!existingUser) return null;

                  token.role = existingUser.role;

                  return token;
            },
            // The signIn callback is not strictly needed for this change, 
            // but it's good practice to have it for authorization logic.
            async signIn({ user, account }) {
                  // Allow OAuth without email verification
                  if (account?.provider !== "credentials") return true

                  const existingUser = await getUserById(user.id!)

                  // Prevent sign in if email is not verified
                  if (!existingUser?.emailVerified) return false

                  return true
            },
      },
      adapter: PrismaAdapter(db),
      session: { strategy: "jwt" },
      ...authConfig,
})