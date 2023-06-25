import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { type MyContext } from "@/pages/api/graphql"
import { PgBasicWord, PgQueryError, PgQueryResponse } from "@/types"
import { pool } from "@/utils/postgres"
import { getServerSession } from "next-auth"
import { Arg, Ctx, Query, Resolver } from "type-graphql"
import redis from "@/utils/redis"
import { BasicDashboardInput, GetWords, Word } from "../schemas/dashboard"
import { CACHE_KEYS } from "@/constants"

@Resolver(GetWords)
export class BasicDashboardWords {
  @Query(() => GetWords)
  async basicDashboardWords(
    @Arg("args", () => BasicDashboardInput) args: string,
    @Ctx() { req, res }: MyContext
  ): Promise<GetWords> {
    const {
      user: { id: user },
    } = await getServerSession(req, res, authOptions)

    const cachedMetrics = await redis.hget(
      `${CACHE_KEYS.basicDashboardWords}/${user}`,
      JSON.stringify(args)
    )

    if (cachedMetrics) return JSON.parse(cachedMetrics)

    return await pool
      .query(`SELECT * FROM get_dashboard_words($1, $2, $3, $4, $5, $6, $7)`, [
        user,
        ...Object.values(args),
      ])
      .then(async (r: PgQueryResponse<PgBasicWord>) => {
        const words: Word[] = r.rows.map(({ word, count, days_used }) => {
          return {
            word: {
              text: {
                content: word,
              },
              mentions: days_used,
            },
            count: Number(count),
            hide: false,
          }
        })

        const dashboard = { words }

        await redis.hset(
          `${CACHE_KEYS.basicDashboardWords}/${user}`,
          `${JSON.stringify(args)}`,
          JSON.stringify(dashboard)
        )

        return dashboard
      })
      .catch((e: PgQueryError) => {
        console.log(e)
        return {
          errors: [
            {
              field: "unknown",
              message: "unhandled error",
            },
          ],
        }
      })
  }
}
