import Navbar from "./navbar"
import Footer from "./footer"
import { Box } from "@mui/material"
import React from "react"
import { useQuery } from "@apollo/client"
import { graphql } from "@/generated"
import { UserContext } from "@/context/userContext"
import { useSession } from "next-auth/react"
import { hasPostedToday } from "@/utils/stringUtils"

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const session = useSession()
  const user = session.data?.user
  const { loading, data, refetch } = useQuery(
    graphql(`
      query Me($user: UserAuthInput!, $refetch: Boolean) {
        me(user: $user, refetch: $refetch) {
          error
          user {
            email
            id
            role
            username
            lastPost
          }
        }
      }
    `),
    {
      variables: {
        user: { id: user?.id || "", token: user?.token || "" },
      },
      skip: session.status !== "authenticated",
    }
  )

  return (
    <UserContext.Provider
      value={{
        user: data?.me.user,
        loading,
        hasPostedToday: hasPostedToday(data?.me.user?.lastPost),
        refetch,
      }}
    >
      <Box
        sx={{
          bgcolor: "background.default",
          color: "text.primary",
          minHeight: "100vh",
        }}
        display="flex"
        flexDirection="column"
      >
        <Navbar />
        {children}
        <Footer />
      </Box>
    </UserContext.Provider>
  )
}

export default Layout
