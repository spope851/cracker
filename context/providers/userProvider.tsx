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
  const { loading, data, refetch } = useQuery(ME_QUERY, {
    skip: session.status !== "authenticated",
  })

  if (loading || session.status !== "authenticated") return <>{children}</>

  const { lastPost, user } = data?.me.me!

  const hasPostedToday = lastPost ? fromToday(lastPost.createdAt) : false

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
