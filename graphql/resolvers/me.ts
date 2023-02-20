import { MyContext } from "@/pages/api/graphql"
import { PgQueryError, PgQueryResponse } from "@/types"
import { pool } from "@/utils/postgres"
import { Ctx, Query, Resolver } from "type-graphql"
import { User } from "../schemas"
import { GetUserResponse } from "../schemas/getUser/getUserResponse"

@Resolver(User)
export class MeReslover {
  @Query(() => GetUserResponse)
  async me(@Ctx() { userId }: Awaited<MyContext>): Promise<GetUserResponse> {
    const res: Promise<GetUserResponse> = pool
      .query(`SELECT * FROM "user" WHERE id = $1;`, [userId])
      .then((res: PgQueryResponse) => {
        if (res.rows.length === 0)
          return {
            error: "not found",
          }
        const { id, email, role } = res.rows[0]
        return {
          user: {
            id,
            username: res.rows[0].username,
            email,
            role,
          },
        }
      })
      .catch((e: PgQueryError) => {
        console.log(e)
        return {
          error: "unhandled error",
        }
      })
    return res
  }
}
