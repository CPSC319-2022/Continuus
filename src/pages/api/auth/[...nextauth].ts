import NextAuth, { Awaitable, type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import { env } from "../../../env/server.mjs";
import { prisma } from "../../../server/db";
import { Role } from '@prisma/client';
import { AdapterUser } from 'next-auth/adapters.js';

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  // Configure one or more authentication providers
  adapter: (() => {
    const prismaAdapter =  PrismaAdapter(prisma);

    return {
      ...prismaAdapter,
      createUser: async (user) => {
        const userCount = await prisma.user.count();

        return prisma.user.create({ data: {...user, role: userCount === 0 ? Role.ADMIN : Role.READER }}) as Awaitable<AdapterUser>
      }
    }
  })(),
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET
    })
    /**
     * ...add more providers here
     *
     * Most other providers require a bit more work than the Discord provider.
     * For example, the GitHub provider requires you to add the
     * `refresh_token_expires_in` field to the Account model. Refer to the
     * NextAuth.js docs for the provider you want to use. Example:
     * @see https://next-auth.js.org/providers/github
     */
  ],
};

export default NextAuth(authOptions);
