import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { type MyContext } from "@/pages/api/graphql"
import { PgQueryError, PgQueryResponse, PgTrackerRow } from "@/types"
import { pool } from "@/utils/postgres"
import { postgresErrorDetails } from "@/utils/stringUtils"
import { getServerSession } from "next-auth"
import { Arg, Ctx, Mutation, Resolver } from "type-graphql"
import { TrackerInput } from "../schemas/track/trackerInput"
import { TrackerResponse } from "../schemas/track/trackerResponse"

@Resolver(TrackerResponse)
class TrackerResolver {
  @Mutation(() => TrackerResponse)
  async track(
    @Arg("tracker", () => TrackerInput) tracker: TrackerInput,
    @Ctx() { req, res }: MyContext
  ): Promise<TrackerResponse> {
    const { overview, numberCreativeHours, rating } = tracker
    const {
      user: { id: user },
    } = await getServerSession(req, res, authOptions)
    const query: Promise<TrackerResponse> = await pool
      .query(
        `INSERT INTO tracker (overview, number_creative_hours, rating, "user")
       VALUES (
        $1,
        $2,
        $3,
        $4
        ) RETURNING *;`,
        [overview, numberCreativeHours, rating, user]
      )
      .then((queryRes: PgQueryResponse<PgTrackerRow>) => {
        const returnRow = queryRes.rows[0]
        return {
          track: {
            id: returnRow.id.toString(),
            overview: returnRow.overview,
            numberCreativeHours: Number(returnRow.number_creative_hours),
            rating: returnRow.rating,
            user: returnRow.user,
          },
        }
      })
      .catch((e: PgQueryError) => {
        const details = postgresErrorDetails(e.detail)
        if (e.code === "23503") {
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
    return query
  }
}

export { TrackerResolver }
