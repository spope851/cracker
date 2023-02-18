import { PgQueryError, PgQueryResponse } from "@/types"
import { pool } from "@/utils/postgres"
import argon2 from "argon2"
import { Arg, Mutation, Resolver } from "type-graphql"
import { UserInput, RegisterResponse, UserError } from "../schemas"

@Resolver(RegisterResponse)
class RegistrationResolver {
  @Mutation(() => RegisterResponse)
  async register(
    @Arg("user", () => UserInput) user: UserInput
  ): Promise<RegisterResponse> {
    let id
    const { full_name, username, email, password } = user
    const hashedPassword = await argon2.hash(password)
    const errors: UserError[] = []
    await pool
      .query(
        `INSERT INTO users (full_name, email, username, password)
       VALUES (
        $1,
        $2,
        $3,
        $4
        ) RETURNING *;`,
        [full_name || null, email, username, hashedPassword]
      )
      .then((res: PgQueryResponse) => {
        id = res.rows[0].id
      })
      .catch((e: PgQueryError) => {
        if (e.code == "23505") {
          const details = e.detail.split(/[()]+/)
          errors.push({
            field: details[1],
            message: `individual with username: ${username} and email: ${email} is a duplicate member. ${details[1]} ${details[3]} is already in use.`,
          })
        } else
          errors.push({
            field: "unknown",
            message: "unhandled error",
          })
      })
    return errors.length === 0
      ? {
          user: {
            id: id || "no id returned. this may be an error.",
            full_name,
            username,
            email,
            password: "hidden",
          },
        }
      : { errors }
  }
}

export { RegistrationResolver }
