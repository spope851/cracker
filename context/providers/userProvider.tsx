import { ME_QUERY } from "@/graphql/client"
import { hasPostedToday } from "@/utils/stringUtils"
import { useQuery } from "@apollo/client"
import { useSession } from "next-auth/react"
import React from "react"
import { UserContext } from "../userContext"

export const UserContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const session = useSession()
  const user = session.data?.user
  const { loading, data, refetch } = useQuery(ME_QUERY, {
    variables: {
      user: { id: user?.id || "", token: user?.token || "" },
    },
    skip: session.status !== "authenticated",
  })

  return (
    <UserContext.Provider
      value={{
        user: data?.me.user,
        loading,
        hasPostedToday: hasPostedToday(data?.me.user?.lastPost),
        refetch,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
