import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { login, register } from "@/lib/requests/auth";
import { LoginResponse, User } from "@/lib/interfaces";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
        email: { label: "Email", type: "email" },
      },

      async authorize(credentials) {
        if (!credentials?.username || !credentials.password) {
          return null;
        }

        try {
          let loginResponse: LoginResponse | undefined;

          if (credentials.email) {
            const registerResponse: LoginResponse = await register(
              credentials.username,
              credentials.password,
              credentials.email
            );

            if (registerResponse.success && registerResponse.data) {
              loginResponse = registerResponse;
            }
          } else {
            loginResponse = await login(credentials.username, credentials.password);
          }

          if (loginResponse?.success && loginResponse.data) {
            const user: User = {
              id: loginResponse.data.username,
              username: loginResponse.data.username,
              email: credentials.email || credentials.username,
              token: loginResponse.data.token,
            };

            return user;
          }
        } catch (error) {
          console.error("Authentication failed", error);
          return null;
        }

        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user}) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.email = user.email;
        token.token = user.token;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.username = token.username as string;
        session.user.email = token.email as string;
        session.user.token = token.token as string;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
