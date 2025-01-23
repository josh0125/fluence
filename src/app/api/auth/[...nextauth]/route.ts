import NextAuth from "next-auth";
import { authOptions } from "./authOptions";

// The handler for the route should use `NextAuth`
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }; // Export both GET and POST handlers
