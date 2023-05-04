import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { type MyContext } from "@/pages/api/graphql"
import { PgQueryError, PgQueryResponse } from "@/types"
import { pool } from "@/utils/postgres"
import { getServerSession } from "next-auth"
import { Arg, Ctx, Query, Resolver } from "type-graphql"
import redis from "@/utils/redis"
import { BasicDashboardResponse } from "../schemas/dashboard/basicDashboardResponse"

type Word = {
  word: string
  rating: number
  number_creative_hours: string
  overview: string
  created_at: string
  id: number
}

type Count = { word: string; count: string }

type Sentence = {
  sentence: string
  rating: number
  number_creative_hours: string
  created_at: string
  overview: string
}

@Resolver(BasicDashboardResponse)
export class DashboardBasicReslover {
  @Query(() => BasicDashboardResponse)
  async dashboardBasic(
    @Arg("runningAvg", () => String!) runningAvg: string,
    @Ctx() { req, res }: MyContext
  ): Promise<BasicDashboardResponse> {
    const {
      user: { id: user },
    } = await getServerSession(req, res, authOptions)

    const cachedMetrics = await redis.get(`basic/${user}/${runningAvg}`)
    if (cachedMetrics)
      return {
        dashboard: JSON.parse(cachedMetrics),
      }

    const queryWords: Word[] = []
    const queryCounts: Count[] = []
    const querySentences: Sentence[] = []
    return await pool
      .connect()
      .then(async (client: any) => {
        client.query("BEGIN")
        return client
          .query(`CALL get_user_dashboard_basic($1, $2, null, null, null);`, [
            1,
            runningAvg,
          ])
          .then(async () => {
            return Promise.all([
              await client
                .query(`FETCH ALL FROM "<unnamed portal 1>";`)
                .then((r: PgQueryResponse<Word>) => queryWords.push(...r.rows)),
              await client
                .query(`FETCH ALL FROM "<unnamed portal 2>";`)
                .then((r: PgQueryResponse<Count>) => queryCounts.push(...r.rows)),
              await client
                .query(`FETCH ALL FROM "<unnamed portal 3>";`)
                .then((r: PgQueryResponse<Sentence>) =>
                  querySentences.push(...r.rows)
                ),
            ]).then(async () => {
              const sentences = querySentences.map(
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

              const words = queryCounts.map(({ word, count }) => {
                return {
                  word: {
                    text: {
                      content: word,
                    },
                    mentions: queryWords
                      .filter(({ word: queryWord }) => word === queryWord)
                      .map(
                        ({
                          rating,
                          number_creative_hours,
                          overview,
                          created_at,
                          id,
                        }) => {
                          return {
                            id: id.toString(),
                            overview,
                            rating,
                            numberCreativeHours: Number(number_creative_hours),
                            createdAt: created_at.toString(),
                          }
                        }
                      ),
                  },
                  count: Number(count),
                  hide: false,
                }
              })

              const dashboard = { sentences, words }

              await redis.set(
                `basic/${user}/${runningAvg}`,
                JSON.stringify(dashboard)
              )

              return { dashboard }
            })
          })
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