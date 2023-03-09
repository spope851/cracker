import { MeQuery, MeQueryVariables } from "@/generated/graphql"
import { UserInfo } from "@/graphql/schemas"
import { ApolloQueryResult } from "@apollo/client"
import { createContext } from "react"

export const UserContext = createContext<{
  user?: UserInfo | null
  loading: boolean
  hasPostedToday: boolean | void
  refetch: (
    variables?: Partial<MeQueryVariables>
  ) => Promise<ApolloQueryResult<MeQuery>>
}>({
  user: undefined,
  loading: true,
  hasPostedToday: false,
  refetch: () => new Promise<ApolloQueryResult<MeQuery>>(() => undefined),
})
