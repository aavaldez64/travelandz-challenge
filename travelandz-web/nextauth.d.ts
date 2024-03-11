import NextAuth, { type DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      userData: UserData;
      authToken: string;
    } & DefaultSession["user"];
  }
  interface UserData {
    id: string;
    name: string;
    lastName: string;
    phone: string;
    username: string;
    email: string;
    role: string;
    isActive: boolean;
  }
}
