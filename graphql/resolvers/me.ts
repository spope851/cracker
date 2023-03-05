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
        .query(`CALL get_user_info($1);`, [id])
        .then(
          async (
            res: PgQueryResponse<{
              _id: string
              _email: string
              _role: number
              _username: string
              _last_post: string
            }>
          ) => {
            if (res.rows.length === 0)
              return {
                error: "not found",
              }
            const { _id, _email, _role, _username, _last_post } = res.rows[0]
            const foundUser = {
              user: {
                id: _id,
                username: _username,
                email: _email,
                role: _role,
                lastPost: new Date(_last_post).toLocaleDateString(),
              },
            }
            await redis.set(token, JSON.stringify(foundUser))
            return foundUser
          }
        )
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
