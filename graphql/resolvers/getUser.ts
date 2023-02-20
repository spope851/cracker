import { pool } from "@/utils/postgres"
import { Arg, Query, Resolver } from "type-graphql"
import { User } from "../schemas"

/*
ignore this query. apollo throws an error if you haven't included any queries. will remove once we have a legit query we're using
*/

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
