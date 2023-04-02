import NextAuth, { Awaitable, type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import { env } from "../../../env/server.mjs";
import { prisma } from "../../../server/db";
import { Role } from '@prisma/client';
import { AdapterUser } from 'next-auth/adapters.js';
import { z } from "zod";
import { hash, verify } from "argon2";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/auth/signinup',
    error: '/auth/signinup',
  },
  jwt: {
    maxAge: 30 * 24 * 30 * 60, // 30 days
  },
  session: {
    strategy: "jwt",
  },
  // Include user.id on session
  callbacks: {
    session({ session, user, token }) {
      if (session.user) {
        if (user) {
          session.user.id = user.id;
        }

        if (token) {
          session.user.id = token.id as string;
        }
      }

      // if (token) {
      //   session.id = token.id;
      // }

      return session;
    },
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }

      return token;
    },
  },
  // Configure one or more authentication providers
  adapter: (() => {
    const prismaAdapter = PrismaAdapter(prisma);

    return {
      ...prismaAdapter,
      createUser: async (user) => {
        const userCount = await prisma.user.count();

        return prisma.user.create({ data: { ...user, role: userCount === 0 ? Role.ADMIN : Role.READER } }) as Awaitable<AdapterUser>
      }
    }
  })(),
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET
    }),
    Credentials({
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password"
        },
      },
      authorize: async (credentials, request) => {
        const parsedCreds = z.object({
          email: z.string().email(),
          password: z.string().min(4).max(12),
        }).safeParse(credentials);

        if (!parsedCreds.success) {
          return null;
        }

        const user = await prisma.user.findFirst({
          where: { 
            email: parsedCreds.data.email 
          },
        });

        if (!user || !user.password) {
          return null
        }

        const isPasswordCorrect = await verify(user.password, parsedCreds.data.password);
      
        if (!isPasswordCorrect) {
          return null;
        }

        return {
          id: user.id
        };
      },
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
