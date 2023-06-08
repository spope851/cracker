import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { type MyContext } from "@/pages/api/graphql"
import { PgBasicSentence, PgQueryError, PgQueryResponse } from "@/types"
import { pool } from "@/utils/postgres"
import { getServerSession } from "next-auth"
import { Arg, Ctx, Float, Int, Query, Resolver } from "type-graphql"
import redis from "@/utils/redis"
import { GetSentences, BasicSentence } from "../schemas/dashboard"

@Resolver(GetSentences)
export class BasicDashboardSentences {
  @Query(() => GetSentences)
  async basicDashboardSentences(
    @Arg("runningAvg", () => String!) runningAvg: string,
    @Arg("rating", () => [Int], { nullable: true }) rating: number[] | null,
    @Arg("minHours", () => Float, { nullable: true }) minHours: number | null,
    @Arg("maxHours", () => Float, { nullable: true }) maxHours: number | null,
    @Arg("sortColumn", () => String, { nullable: true }) sortColumn: string | null,
    @Arg("sortDir", () => String, { nullable: true }) sortDir: string | null,
    @Ctx() { req, res }: MyContext
  ): Promise<GetSentences> {
    const {
      user: { id: user },
    } = await getServerSession(req, res, authOptions)

    const args = [user, runningAvg, rating, minHours, maxHours, sortColumn, sortDir]

    // const cachedMetrics = await redis.get(`basic/${user}/${runningAvg}`)
    // if (cachedMetrics)
    //   return {
    //     sentences: JSON.parse(cachedMetrics),
    //   }

    return await pool
      .query(
        `SELECT * FROM get_dashboard_sentences($1, $2, $3, $4, $5, $6, $7);`,
        args
      )
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
