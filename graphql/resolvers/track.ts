import { PgQueryError, PgQueryResponse, PgTrackerRow } from "@/types"
import { pool } from "@/utils/postgres"
import { postgresErrorDetails } from "@/utils/stringUtils"
import { Arg, Mutation, Resolver } from "type-graphql"
import { TrackerInput } from "../schemas/track/trackerInput"
import { TrackerResponse } from "../schemas/track/trackerResponse"

@Resolver(TrackerResponse)
class TrackerResolver {
  @Mutation(() => TrackerResponse)
  async track(
    @Arg("tracker", () => TrackerInput) tracker: TrackerInput
  ): Promise<TrackerResponse> {
    const { overview, numberCreativeHours, rating, user } = tracker
    const res: Promise<TrackerResponse> = await pool
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
    return res
  }
}

export { TrackerResolver }
