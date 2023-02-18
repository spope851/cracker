import { pool } from "@/utils/postgres"
import argon2 from "argon2"
import { Arg, Mutation, Resolver } from "type-graphql"
import { User, UserInput } from "../schemas"

@Resolver(String)
class RegistrationResolver {
  @Mutation(() => String)
  async register(@Arg("user", () => UserInput) user: UserInput) {
    await pool.query(
      `INSERT INTO users (full_name, email, username, password)
       VALUES (
        $1,
        $2,
        $3,
        $4
        ) RETURNING *;`,
      [
        user.full_name || null,
        user.email,
        user.username,
        await argon2.hash(user.password),
      ]
    )
    return "success"
  }
}

export { RegistrationResolver }
