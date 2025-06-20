import { Role, UserStatus } from "@prisma/client";
import NextAuth, { type DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id: string;
      role: Role;
      status: UserStatus;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    role: Role;
    status: UserStatus;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: Role;
    status: UserStatus;
  }
}

declare module "next/server" {
  interface NextRequest {
    auth: JWT;
  }
} 