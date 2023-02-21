import { PgQueryError, PgQueryResponse } from "@/types"
import { pool } from "@/utils/postgres"
import redis from "@/utils/redis"
import { Arg, Query, Resolver } from "type-graphql"
import { UserAuthInput } from "../schemas"
import { GetUserResponse } from "../schemas/getUser/getUserResponse"

@Resolver(GetUserResponse)
export class MeReslover {
  @Query(() => GetUserResponse)
  async me(
    @Arg("user", () => UserAuthInput) { token, id }: UserAuthInput
  ): Promise<GetUserResponse> {
    // 1
    // check redis for token key
    // 2
    // if it returns a user, return that user
    // 3
    // if it returns falsy, use the id to find the user in the database
    // 4
    // if you find them in the database, first
    //  1
    //  save them to redis, then
    //  2
    //  return them
    // 5
    // if you don't find them in the database, return an error

    const redisUser = await redis.get(token)
    if (redisUser) return JSON.parse(redisUser)
    else {
      const postgresUser: Promise<GetUserResponse> = pool
        .query(`SELECT * FROM "user" WHERE id = $1;`, [id])
        .then(async (res: PgQueryResponse) => {
          if (res.rows.length === 0)
            return {
              error: "not found",
            }
          const { id, email, role } = res.rows[0]
          const foundUser = {
            user: {
              id,
              username: res.rows[0].username,
              email,
              role,
            },
          }
          await redis.set(token, JSON.stringify(foundUser))
          return foundUser
        })
        .catch((e: PgQueryError) => {
          console.log(e)
          return {
            error: "unhandled error",
          }
        })
      return postgresUser
    }
  }
}
