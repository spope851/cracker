import "reflect-metadata"
import { ApolloServer } from "@apollo/server"
import { startServerAndCreateNextHandler } from "@as-integrations/next"
import { buildSchema } from "type-graphql"
import { RegistrationResolver } from "@/graphql/resolvers"
import { GetUserResolver } from "@/graphql/resolvers/getUser"

const schema = await buildSchema({
  resolvers: [RegistrationResolver, GetUserResolver],
  validate: false,
})

const server = new ApolloServer({ schema })

export default startServerAndCreateNextHandler(server)
