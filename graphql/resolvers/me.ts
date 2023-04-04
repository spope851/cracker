import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { type MyContext } from "@/pages/api/graphql"
import { PgQueryError, PgQueryResponse, PgMe } from "@/types"
import { getServerSession } from "next-auth"
import { Arg, Ctx, Query, Resolver } from "type-graphql"
import { pool } from "@/utils/postgres"
import redis from "@/utils/redis"
import { MeQueryResponse } from "../schemas/me/meQueryResponse"

@Resolver(MeQueryResponse)
export class MeReslover {
  @Query(() => MeQueryResponse)
  async me(
    @Arg("refetch", { nullable: true }) refetch: boolean = false,
    @Ctx() { req, res }: MyContext
  ): Promise<MeQueryResponse> {
    const {
      user: { id: user },
    } = await getServerSession(req, res, authOptions)

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
    const queryPostgres = (): Promise<MeQueryResponse> =>
      pool
        .query(`CALL get_user_info($1);`, [user])
        .then(async (res: PgQueryResponse<PgMe>) => {
          if (res.rows.length === 0)
            return {
              error: "not found",
            }
          const {
            _id,
            _email,
            _role,
            _username,
            _last_post_id,
            _last_post_overview,
            _last_post_hours,
            _last_post_rating,
            _last_post_date,
          } = res.rows[0]
          const foundUser = {
            me: {
              user: {
                id: _id,
                username: _username,
                email: _email,
                role: _role,
              },
              lastPost:
                _last_post_id === null
                  ? null
                  : {
                      id: _last_post_id,
                      overview: _last_post_overview,
                      numberCreativeHours: _last_post_hours,
                      rating: _last_post_rating,
                      createdAt: new Date(_last_post_date!).toLocaleDateString(),
                    },
            },
          }
          await redis.setex(user, 60 * 15, JSON.stringify(foundUser)) // expires in 15 minutes
          return foundUser
        })
        .catch((e: PgQueryError) => {
          console.log(e)
          return {
            error: "unhandled error",
          }
        })

    if (refetch) {
      return queryPostgres()
    } else {
      const redisUser = await redis.get(user)
      if (redisUser) return JSON.parse(redisUser)
      else return queryPostgres()
    }
  }
}
