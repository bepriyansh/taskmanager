// types/nextauth.d.ts
import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";
import { User } from "@/lib/interfaces"; // Import your custom User interface

declare module "next-auth" {
  interface User {
    id: string;
    username: string;
    email: string;
    token: string;
  }

  interface Session {
    user: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    username: string;
    email: string;
    token: string;
  }
}
