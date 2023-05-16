import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { type MyContext } from "@/pages/api/graphql"
import { PgQueryError, PgQueryResponse, PgTrackerRow } from "@/types"
import { pool } from "@/utils/postgres"
import { getServerSession } from "next-auth"
import { Arg, Ctx, Query, Resolver } from "type-graphql"
import { PremiumDashboardResponse } from "../schemas/dashboard"
import { Track } from "../schemas/track"
import language from "@google-cloud/language"
import redis from "@/utils/redis"
import { NLP_KEY } from "@/constants"

@Resolver(PremiumDashboardResponse)
export class PremiumDashboardReslover {
  @Query(() => PremiumDashboardResponse)
  async dashboard(
    @Arg("runningAvg", () => String!) runningAvg: string,
    @Ctx() { req, res }: MyContext
  ): Promise<PremiumDashboardResponse> {
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

    const fetchNlpData = async () => {
      let credentials = null

      if (process.env.GCP_CRED)
        credentials = JSON.parse(
          Buffer.from(process.env.GCP_CRED, "base64").toString()
        )

      const client = new language.LanguageServiceClient({ credentials })

      const overviews = (await rawData).map((track) => track.overview).join(" ")

      const document = {
        content: overviews,
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

      await redis.set(`${NLP_KEY}/${user}/${runningAvg}`, JSON.stringify(nlpData))

      return nlpData
    }

    const cachedNlpData = await redis.get(`${NLP_KEY}/${user}/${runningAvg}`)

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
