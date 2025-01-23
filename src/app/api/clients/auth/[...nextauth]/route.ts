import NextAuth from "next-auth";
import { authOptions } from "@/lib/utils";

// The handler for the route should use `NextAuth`
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }; // Export both GET and POST handlers
