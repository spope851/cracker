import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { type MyContext } from "@/pages/api/graphql"
import { PgDashboard, PgQueryError, PgQueryResponse, PgTrackerRow } from "@/types"
import { pool } from "@/utils/postgres"
import { getServerSession } from "next-auth"
import { Arg, Ctx, Query, Resolver } from "type-graphql"
import { DashboardMetrics, DashboardResponse } from "../schemas/dashboard"
import { Track } from "../schemas/track"
import language from "@google-cloud/language"
import redis from "@/utils/redis"

@Resolver(DashboardResponse)
export class DashboardReslover {
  @Query(() => DashboardResponse)
  async dashboard(
    @Arg("runningAvg", () => String!) runningAvg: string,
    @Ctx() { req, res }: MyContext
  ): Promise<DashboardResponse> {
    const {
      user: { id: user },
    } = await getServerSession(req, res, authOptions)
    const rawData: Promise<Track[]> = await pool
      .query(
        `
        SELECT * FROM tracker
        WHERE "user"=$1
        AND created_at > now() - ($2 || ' day')::interval;
        `,
        [user, runningAvg]
      )
      .then((res: PgQueryResponse<PgTrackerRow>) => {
        return res.rows.map(
          ({
            number_creative_hours,
            rating,
            overview,
            created_at,
            id,
          }: PgTrackerRow) => {
            return {
              numberCreativeHours: Number(number_creative_hours),
              rating: Number(rating),
              overview: overview.toLowerCase(),
              createdAt: created_at.toString(),
              id,
            }
          }
        )
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
    const dashboardMetrics: Promise<DashboardMetrics> = await pool
      .query(`CALL get_user_dashboard($1, $2);`, [user, runningAvg])
      .then((res: PgQueryResponse<PgDashboard>) => {
        const {
          _days_of_use,
          _avg_hours,
          _count_neg_two,
          _count_neg_one,
          _count_zero,
          _count_plus_one,
          _count_plus_two,
          _overviews,
        } = res.rows[0]

        const dbm: DashboardMetrics = {
          daysOfUse: Number(_days_of_use),
          avgHours: Number(_avg_hours),
          countNegTwo: Number(_count_neg_two),
          countNegOne: Number(_count_neg_one),
          countZero: Number(_count_zero),
          countPlusOne: Number(_count_plus_one),
          countPlusTwo: Number(_count_plus_two),
          overviews: _overviews.toLowerCase(),
        }

        return dbm
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

    const fetchNlpData = async () => {
      const client = new language.LanguageServiceClient()

      const document = {
        content: (await dashboardMetrics).overviews,
        type: "PLAIN_TEXT" as "PLAIN_TEXT",
      }

      const features = {
        extractSyntax: true,
        extractEntities: true,
        extractDocumentSentiment: true,
        extractEntitySentiment: true,
      }

      const [annotate] = await client.annotateText({ document, features })

      const nlpData = {
        sentences: annotate.sentences,
        tokens: annotate.tokens,
        entities: annotate.entities,
      }

      await redis.set(`nlp/${user}/${runningAvg}`, JSON.stringify(nlpData))

      return nlpData
    }

    const cachedNlpData = await redis.get(`nlp/${user}/${runningAvg}`)
    if (cachedNlpData)
      return {
        dashboard: {
          dashboardMetrics: await dashboardMetrics,
          rawData: await rawData,
          sentences: JSON.parse(cachedNlpData).sentences,
          entities: JSON.parse(cachedNlpData).entities,
          tokens: JSON.parse(cachedNlpData).tokens,
        },
      }
    else {
      return await fetchNlpData().then(async ({ sentences, entities, tokens }) => {
        return {
          dashboard: {
            dashboardMetrics: await dashboardMetrics,
            rawData: await rawData,
            sentences,
            entities,
            tokens,
          },
        }
      })
    }
  }
}
