import "reflect-metadata"
import { ApolloServer } from "@apollo/server"
import { startServerAndCreateNextHandler } from "@as-integrations/next"
import { buildSchema } from "type-graphql"

const schema = await buildSchema({
  resolvers: ["nonEmptyArray"],
})

const server = new ApolloServer({ schema })

export default startServerAndCreateNextHandler(server)
