import NextAuth, {DefaultSession} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    idToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    idToken?: string;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.idToken = account.id_token;
      }
      return token;
    },
    async session({ session, token }) {
      session.idToken = token.idToken;
      return session;
    },
  },
});