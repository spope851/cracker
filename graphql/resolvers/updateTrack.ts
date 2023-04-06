import { PgQueryError, PgQueryResponse, PgTrackerRow } from "@/types"
import { pool } from "@/utils/postgres"
import { postgresErrorDetails } from "@/utils/stringUtils"
import { Arg, Ctx, Mutation, Resolver } from "type-graphql"
import { UpdateTrackerInput } from "../schemas/track/updateTrackerInput"
import { TrackerResponse } from "../schemas/track/trackerResponse"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { type MyContext } from "@/pages/api/graphql"
import { deleteNlpCache } from "@/utils/redis"
import { getServerSession } from "next-auth"

@Resolver(TrackerResponse)
class UpdateTrackerResolver {
  @Mutation(() => TrackerResponse)
  async updateTrack(
    @Arg("tracker", () => UpdateTrackerInput) tracker: UpdateTrackerInput,
    @Ctx() { req, res }: MyContext
  ): Promise<TrackerResponse> {
    const { overview, numberCreativeHours, rating, id } = tracker
    const {
      user: { id: user },
    } = await getServerSession(req, res, authOptions)
    await deleteNlpCache(user)
    const query: Promise<TrackerResponse> = await pool
      .query(
        `UPDATE tracker SET 
        overview=$1,
        number_creative_hours=$2,
        rating=$3
        WHERE id=$4
        RETURNING *;`,
        [overview, numberCreativeHours, rating, id]
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

export { UpdateTrackerResolver }
