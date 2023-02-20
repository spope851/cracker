import "reflect-metadata"
import { ApolloServer } from "@apollo/server"
import { startServerAndCreateNextHandler } from "@as-integrations/next"
import { buildSchema } from "type-graphql"
import { RegistrationResolver, MeReslover } from "@/graphql/resolvers"
import redis from "@/utils/redis"

const schema = await buildSchema({
  resolvers: [RegistrationResolver, MeReslover],
  validate: false,
})

const server = new ApolloServer({ schema })

export type MyContext = {
  userId: string | null
}

export default startServerAndCreateNextHandler(server, {
  context: async (_req, _res): Promise<MyContext> => {
    const userId = await redis.get("qid")
    return {
      userId,
    }
  },
})
