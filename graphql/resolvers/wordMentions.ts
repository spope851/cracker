import { PgQueryError, PgQueryResponse, PgTrack } from "@/types"
import { pool } from "@/utils/postgres"
import { Arg, Int, Query, Resolver } from "type-graphql"
import { GetMentions } from "../schemas/dashboard"
import { Track } from "../schemas"

@Resolver(GetMentions)
export class WordMentions {
  @Query(() => GetMentions)
  async getWordMentions(
    @Arg("mentions", () => [Int]) mentions: number[]
  ): Promise<GetMentions> {
    // const cachedMetrics = await redis.get(`basic/${user}/${runningAvg}`)
    // if (cachedMetrics)
    //   return {
    //     words: JSON.parse(cachedMetrics),
    //   }

    return await pool
      .query(`SELECT * FROM tracker WHERE id = ANY($1::integer[]);`, [mentions])
      .then(async (r: PgQueryResponse<PgTrack>) => {
        const mentions: Track[] = r.rows.map(
          ({ id, rating, number_creative_hours, overview, created_at }) => {
            return {
              id: id.toString(),
              overview,
              rating,
              numberCreativeHours: Number(number_creative_hours),
              createdAt: created_at.toString(),
            }
          }
        )

        const dashboard = { mentions }

        // await redis.set(`basic/${user}/${runningAvg}`, JSON.stringify(dashboard))

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
