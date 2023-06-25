import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { type MyContext } from "@/pages/api/graphql"
import { PgBasicSentence, PgQueryError, PgQueryResponse } from "@/types"
import { pool } from "@/utils/postgres"
import { getServerSession } from "next-auth"
import { Arg, Ctx, Query, Resolver } from "type-graphql"
import redis from "@/utils/redis"
import {
  GetSentences,
  BasicSentence,
  BasicDashboardInput,
} from "../schemas/dashboard"
import { CACHE_KEYS } from "@/constants"

@Resolver(GetSentences)
export class BasicDashboardSentences {
  @Query(() => GetSentences)
  async basicDashboardSentences(
    @Arg("args", () => BasicDashboardInput) args: string,
    @Ctx() { req, res }: MyContext
  ): Promise<GetSentences> {
    const {
      user: { id: user },
    } = await getServerSession(req, res, authOptions)

    const cachedMetrics = await redis.hget(
      `${CACHE_KEYS.basicDashboardSentences}/${user}`,
      JSON.stringify(args)
    )

    if (cachedMetrics) return JSON.parse(cachedMetrics)

    return await pool
      .query(`SELECT * FROM get_dashboard_sentences($1, $2, $3, $4, $5, $6, $7);`, [
        user,
        ...Object.values(args),
      ])
      .then(async (r: PgQueryResponse<PgBasicSentence>) => {
        const sentences: BasicSentence[] = r.rows.map(
          (
            { sentence, rating, number_creative_hours, created_at, overview },
            idx
          ) => {
            return {
              text: {
                content: sentence,
              },
              id: idx.toString(),
              rating,
              numberCreativeHours: Number(number_creative_hours),
              createdAt: created_at.toString(),
              overview,
            }
          }
        )

        const dashboard = { sentences }

        await redis.hset(
          `${CACHE_KEYS.basicDashboardSentences}/${user}`,
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
