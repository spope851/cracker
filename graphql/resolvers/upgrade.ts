import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { type MyContext } from "@/pages/api/graphql"
import { pool } from "@/utils/postgres"
import { deleteNlpCache } from "@/utils/redis"
import { getServerSession } from "next-auth"
import { Ctx, Mutation, Resolver } from "type-graphql"

@Resolver(String)
class UpgradeResolver {
  @Mutation(() => String)
  async upgrade(@Ctx() { req, res }: MyContext): Promise<string> {
    const {
      user: { id: user },
    } = await getServerSession(req, res, authOptions)
    await deleteNlpCache(user)
    const query: Promise<string> = await pool
      .query(
        `UPDATE "user"
         SET role = 2
         WHERE id = $1;`,
        [user]
      )
      .then(
        () => "Your account has been upgraded to premium!",
        () => "Something is wrong. Please contact us."
      )
    return query
  }
}

export { UpgradeResolver }
