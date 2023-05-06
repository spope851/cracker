import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { type MyContext } from "@/pages/api/graphql"
import { PgQueryError } from "@/types"
import { pool } from "@/utils/postgres"
import { postgresErrorDetails } from "@/utils/stringUtils"
import { getServerSession } from "next-auth"
import { Arg, Ctx, Mutation, Resolver } from "type-graphql"
import { TrackerInput, UploadTrackerResponse } from "../schemas/track"

@Resolver(UploadTrackerResponse)
class UploadTrackerResolver {
  @Mutation(() => UploadTrackerResponse)
  async uploadTracker(
    @Arg("data", () => [TrackerInput]) data: TrackerInput[],
    @Ctx() { req, res }: MyContext
  ): Promise<UploadTrackerResponse> {
    const {
      user: { id: user },
    } = await getServerSession(req, res, authOptions)

    return await pool.connect().then((client: typeof pool) => {
      const insertRows: Promise<UploadTrackerResponse> = Promise.all(
        data.map(async (item: TrackerInput, idx: number) => {
          const { overview, numberCreativeHours, rating } = item
          const today = new Date()
          today.setDate(today.getDate() - (idx + 1))
          const createdAt = `${today.getFullYear()}-${
            today.getMonth() + 1
          }-${today.getDate()}`
          return await client
            .query(
              `INSERT INTO tracker (
                overview, 
                number_creative_hours, 
                rating, 
                created_at, 
                "user"
              )
              VALUES (
                $1,
                $2,
                $3,
                TO_TIMESTAMP($4, 'YYYY-MM-DD'),
                $5
              );`,
              [overview, numberCreativeHours, rating, createdAt, user]
            )
            .catch((e: PgQueryError) => {
              if (e.code === "23503") {
                const details = postgresErrorDetails(e.detail)
                // code:
                // detail: 'Key (user)=(1) is not present in table "user".'
                return {
                  errors: [
                    {
                      field: details[1],
                      message: `id ${details[3] + details[4]}`,
                    },
                  ],
                }
              }
              console.log(e)
              return {
                errors: [{ field: "unknown", massage: "unhandled error" }],
              }
            })
        })
      )
        .then(() => {
          return {
            uploaded: `successfully uploaded ${data.length} days worth of data`,
          }
        })
        .catch((e) => {
          console.log(e)
          return {
            errors: [
              {
                field: "unknown",
                message: `something went wrong. check the database logs`,
              },
            ],
          }
        })
      return insertRows
    })
  }
}

export { UploadTrackerResolver }
