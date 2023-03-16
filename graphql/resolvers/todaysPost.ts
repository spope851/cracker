import { PgQueryError, PgQueryResponse, PgTrack } from "@/types"
import { pool } from "@/utils/postgres"
import { Arg, Int, Query, Resolver } from "type-graphql"
import { TodaysPost } from "../schemas/track"

@Resolver(TodaysPost)
export class TodaysPostResolver {
  @Query(() => TodaysPost)
  async todaysPost(@Arg("user", () => Int) user: number): Promise<TodaysPost> {
    const post: Promise<TodaysPost> = await pool
      .query(
        `
        SELECT * 
        FROM tracker
        WHERE "user" = $1
        ORDER BY created_at DESC
        LIMIT 1;
      `,
        [user]
      )
      .then((res: PgQueryResponse<PgTrack>) => {
        const { id, overview, number_creative_hours, rating, created_at, user } =
          res.rows[0]

        return {
          id,
          overview,
          numberCreativeHours: number_creative_hours,
          rating,
          createdAt: created_at,
          user,
        }
      })
      .catch((e: PgQueryError) => {
        console.log(e)
        // return {
        //   errors: [
        //     {
        //       field: "unknown",
        //       message: "unhandled error",
        //     },
        //   ],
        // }
      })
    return post
  }
}
