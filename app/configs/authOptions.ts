import prisma from '@/prisma/client';
import { AuthOptions } from 'next-auth';
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import GoogleProvider from "next-auth/providers/google";


export const authOptions: AuthOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
		})
	],
	adapter: PrismaAdapter(prisma),
	session: {
		strategy: "jwt",
	},
}