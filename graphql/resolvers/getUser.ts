import { pool } from "@/utils/postgres"
import { Arg, Query, Resolver } from "type-graphql"
import { User } from "../schemas"

@Resolver(User)
class GetUserResolver {
  @Query(() => User)
  async getUser(@Arg("username", () => String) username: string) {
    const req = pool
      .query(
        `SELECT * FROM users
         WHERE username = ${username};`
      )
      .then((res) => res.json().rows[0].data)
    return req
  }
}

export { GetUserResolver }
