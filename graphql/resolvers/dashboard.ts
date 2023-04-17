import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { type MyContext } from "@/pages/api/graphql"
import { PgQueryError, PgQueryResponse, PgTrackerRow } from "@/types"
import { pool } from "@/utils/postgres"
import { getServerSession } from "next-auth"
import { Arg, Ctx, Query, Resolver } from "type-graphql"
import { DashboardResponse } from "../schemas/dashboard"
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

    const overviews: Promise<string> = await pool
      .query(
        `
        SELECT STRING_AGG(overview, ' ') as _overviews
        FROM tracker
        WHERE "user" = $1
        AND created_at > now() - ($2 || ' day')::interval;
        `,
        [user, runningAvg]
      )
      .then((res: PgQueryResponse<{ _overviews: string }>) =>
        res.rows[0]._overviews.toLowerCase()
      )
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
        content: await overviews,
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
