import type { NextAuthConfig } from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import bcrypt from 'bcryptjs';

import { LoginSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";

export default {
      providers: [
            GitHubProvider({
                  clientId: process.env.GITHUB_CLIENT_ID ?? "",
                  clientSecret: process.env.GITHUB_CLIENT_SECRET ?? "",
            }),
            CredentialsProvider({
                  credentials: {},
                  async authorize(credentials) {
                        const validatedFields = LoginSchema.safeParse(credentials);

                        if (validatedFields.success) {
                              const { email, password } = validatedFields.data;

                              const user = await getUserByEmail(email);
                              if (!user || !user.password) return null;

                              const passwordMatch = await bcrypt.compare(password, user.password);

                              if (passwordMatch) return user;
                        }

                        return null;
                  },
            }),
      ],
} satisfies NextAuthConfig; 