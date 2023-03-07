import { UserInfo } from "@/graphql/schemas"
import { createContext } from "react"

export const UserContext = createContext<{
  user?: UserInfo | null
  loading: boolean
  postedToday: boolean
}>({
  user: undefined,
  loading: true,
  postedToday: false,
})
