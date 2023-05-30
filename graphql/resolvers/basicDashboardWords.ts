import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { type MyContext } from "@/pages/api/graphql"
import { PgBasicWord, PgQueryError, PgQueryResponse } from "@/types"
import { pool } from "@/utils/postgres"
import { getServerSession } from "next-auth"
import { Arg, Ctx, Query, Resolver } from "type-graphql"
import redis from "@/utils/redis"
import { GetWords, Word } from "../schemas/dashboard"

@Resolver(GetWords)
export class BasicDashboardWords {
  @Query(() => GetWords)
  async basicDashboardWords(
    @Arg("runningAvg", () => String!) runningAvg: string,
    @Ctx() { req, res }: MyContext
  ): Promise<GetWords> {
    const {
      user: { id: user },
    } = await getServerSession(req, res, authOptions)

    const args = [user, runningAvg]

    // const cachedMetrics = await redis.get(`basic/${user}/${runningAvg}`)
    // if (cachedMetrics)
    //   return {
    //     words: JSON.parse(cachedMetrics),
    //   }

    return await pool
      .query(
        `SELECT * FROM get_dashboard_words($1, $2) order by "count" desc;`,
        args
      )
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

        await redis.set(`basic/${user}/${runningAvg}`, JSON.stringify(dashboard))

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
