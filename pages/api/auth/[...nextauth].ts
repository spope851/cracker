import { PgQueryResponse, PgQueryError } from "@/types"
import { pool } from "@/utils/postgres"
import redis from "@/utils/redis"
import argon2 from "argon2"
import NextAuth from "next-auth"
import { JWT } from "next-auth/jwt"
import CredentialsProvider from "next-auth/providers/credentials"
export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        console.log(credentials?.username)

        const user = await pool
          .query(`SELECT * FROM "user" WHERE username = $1;`, [
            credentials?.username,
          ])
          .then(async (res: PgQueryResponse) => {
            if (res.rows.length === 0) return null
            const { id, email, password, role } = res.rows[0]

            const correctPassword = await argon2.verify(
              password!,
              credentials!.password
            )
            if (!correctPassword) return null

            return {
              id,
              username: res.rows[0].username,
              email,
              role,
            }
          })
          .catch((e: PgQueryError) => {
            console.log(e)
            return null
          })
        // Return null if user data could not be retrieved
        return user
      },
    }),
    // ...add more providers here
  ],
  callbacks: {
    async jwt({ token }: { token: JWT }) {
      await redis.set("qid", token.sub)
      return token
    },
  },
}
export default NextAuth(authOptions)
