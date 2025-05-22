import type { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  // Remove the pages configuration - this was causing the redirect loop
  // pages: {
  //   signIn: "/api/auth/signin",
  //   signOut: "/api/auth/signout", 
  //   error: "/api/auth/error",
  // },
  callbacks: {
    async redirect({ url, baseUrl }) {
      // If url starts with the baseUrl, use it, otherwise redirect to dashboard
      if (url.startsWith("/")) return `${baseUrl}${url}`
      if (new URL(url).origin === baseUrl) return url
      return `${baseUrl}/dashboard`
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
}