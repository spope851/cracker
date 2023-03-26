import { ME_QUERY } from "@/graphql/client"
import { fromToday } from "@/utils/stringUtils"
import { useQuery } from "@apollo/client"
import { useSession } from "next-auth/react"
import React from "react"
import { UserContext } from "../userContext"

export const UserContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const session = useSession()
  const userSession = session.data?.user
  const { loading, data, refetch } = useQuery(ME_QUERY, {
    variables: {
      user: { id: userSession?.id || "", token: userSession?.token || "" },
    },
    skip: session.status !== "authenticated",
  })

  if (loading || session.status !== "authenticated") return <>{children}</>

  const { lastPost, user } = data?.me.me!

  const hasPostedToday = fromToday(lastPost.createdAt)

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        hasPostedToday,
        refetch,
        lastPost,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
