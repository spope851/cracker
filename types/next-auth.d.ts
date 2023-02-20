import NextAuth, { DefaultSession } from "next-auth"
import { JWT as NextAuthJWT } from "next-auth/jwt"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id?: string
      username?: string
      role?: number
    } & DefaultSession["user"]
  }
}

declare module "next-auth/jwt" {
  interface JWT extends NextAuthJWT {
    sub: string
  }
}
