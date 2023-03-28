import { LastPost, MeQuery, MeQueryVariables, User } from "@/generated/graphql"
import { ApolloQueryResult } from "@apollo/client"
import { createContext } from "react"

export type UserContextProps = {
  user: Partial<User>
  lastPost: LastPost | null | undefined
  loading: boolean
  hasPostedToday: boolean
  refetch: (
    variables?: Partial<MeQueryVariables>
  ) => Promise<ApolloQueryResult<MeQuery>>
}

export const UserContext = createContext<UserContextProps>({} as UserContextProps)
