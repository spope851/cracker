import { PgQueryError, PgQueryResponse } from "@/types"
import { pool } from "@/utils/postgres"
import argon2 from "argon2"
import { Arg, Mutation, Resolver } from "type-graphql"
import { UserInput, RegisterResponse } from "../schemas"

@Resolver(RegisterResponse)
class RegistrationResolver {
  @Mutation(() => RegisterResponse)
  async register(
    @Arg("user", () => UserInput) user: UserInput
  ): Promise<RegisterResponse> {
    const hashedPassword = await argon2.hash(user.password)
    const res: Promise<RegisterResponse> = await pool
      .query(
        `INSERT INTO "user" (email, username, password)
       VALUES (
        $1,
        $2,
        $3
        ) RETURNING *;`,
        [user.email, user.username, hashedPassword]
      )
      .then((queryRes: PgQueryResponse) => {
        const { id, username, email } = queryRes.rows[0]
        return {
          user: {
            id,
            username,
            email,
          },
        }
      })
      .catch((e: PgQueryError) => {
        if (e.code === "23505") {
          const details = e.detail.split(/[()]+/)
          return {
            errors: [
              {
                field: details[1],
                message: `individual with username: ${user.username} and email: ${user.email} is a duplicate member. ${details[1]} ${details[3]} is already in use.`,
              },
            ],
          }
        } else {
          console.log(e)
          return {
            errors: [
              {
                field: "unknown",
                message: "unhandled error",
              },
            ],
          }
        }
      })
    return res
  }
}

export { RegistrationResolver }
