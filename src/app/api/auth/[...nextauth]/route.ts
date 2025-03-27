import { authOptions } from "@/app/auth";
import NextAuth from "next-auth/next";

export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions);
// export const runtime = "edge";
