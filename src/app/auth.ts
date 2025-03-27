import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import { type DefaultSession, type User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

declare module "next-auth" {
  interface Session {
    user: {
      /** The user's id. */
      id: string;
    } & DefaultSession["user"];
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials, request): Promise<User | null> {
        // Accept any credentials for demo purposes
        if (credentials?.email && credentials?.password) {
          const email = String(credentials.email);
          return {
            id: email,
            email: email,
            name: email.split('@')[0],
          };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session: ({ session, token }) => {
      if (session?.user && token?.id) {
        session.user.id = String(token.id);
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

export default NextAuth(authOptions);
