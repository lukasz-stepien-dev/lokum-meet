import NextAuth, {NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {fetchFromApi} from "@/lib/fetch";

export async function registerUser(userData: {
    username: string;
    email: string;
    password: string;
    birthdate: string;
    bio: string;
    avatarUrl: string;
}) {
    return await fetchFromApi('/auth/addNewUser', {
        method: 'POST',
        body: JSON.stringify(userData),
    });
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        try {
          const response = await fetch("http://backend:8080/auth/generateToken", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              username: credentials.username,
              password: credentials.password
            })
          });

          if (!response.ok) {
            return null;
          }

          const token = await response.text();

          const profileResponse = await fetch("http://backend:8080/auth/user/profile", {
            headers: {
              "Authorization": `Bearer ${token}`
            }
          });

          const user = await profileResponse.json();

          return {
            id: user.email,
            email: user.email,
            name: user.username,
            image: user.avatarUrl,
            accessToken: token,
            bio: user.bio
          };
        } catch (error) {
          return null;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      return session;
    }
  },
  pages: {
    signIn: "/login"
  },
  session: {
    strategy: "jwt"
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

