import { cookies } from "next/headers";
import NextAuth, { type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { COOKIE_NAMES } from "./constants";
import { AuthService } from "./services";
import { TRAVELANDZ_API } from "./adapters/fetch-api/server";

export const authConfig: NextAuthConfig = {
  trustHost: true,
  pages: {
    signIn: "/",
    // signOut: "/",
  },
  events: {
    signOut: () => {
      const cookiesStore = cookies();
      if (cookiesStore.has(COOKIE_NAMES.JWT)) {
        cookiesStore.delete(COOKIE_NAMES.JWT);
      }
    },
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) token.data = user;
      return token;
    },
    session({ session, token, user }) {
      session.user = token.data as any;
      return session;
    },
  },

  providers: [
    Credentials({
      authorize: async (credentials) => {
        const { username = "", password = "" } = credentials;
        const response = await AuthService.login(
          { username: username as string, password: password as string },
          TRAVELANDZ_API
        );
        if (response.ok) {
          const { user, token } = response.data;
          cookies().set(COOKIE_NAMES.JWT, token, { path: "/" });
          return {
            id: user.id,
            userData: user,
            authToken: token,
          };
        }
        return null;
      },
    }),
  ],
};

export const { auth, handlers, signIn, signOut } = NextAuth(authConfig);
