import NextAuth from "next-auth"
import { authOptions } from "@/lib/auth"

// Make sure we're properly exporting the handler
const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
