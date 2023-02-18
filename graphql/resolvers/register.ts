import { pool } from "@/utils/postgres"
import argon2 from "argon2"
import { Arg, Mutation, Resolver } from "type-graphql"
import { User, UserInput } from "../schemas"

@Resolver(User)
class RegistrationResolver {
  @Mutation(() => User)
  async register(@Arg("user", () => UserInput) user: UserInput) {
    const { full_name, username, email, password } = user
    const hashedPassword = await argon2.hash(password)
    await pool.query(
      `INSERT INTO users (full_name, email, username, password)
       VALUES (
        $1,
        $2,
        $3,
        $4
        ) RETURNING *;`,
      [full_name || null, email, username, hashedPassword]
    )
    return {
      full_name,
      username,
      email,
    }
  }
}

export { RegistrationResolver }
