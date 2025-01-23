import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import GoogleProvider from "next-auth/providers/google";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
};
