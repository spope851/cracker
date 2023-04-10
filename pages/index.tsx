import React, { useContext } from "react"
import Head from "next/head"
import { useSession } from "next-auth/react"
import { Box, Typography } from "@mui/material"
import Dashboard from "@/components/dashboard"
import { UserContext } from "@/context/userContext"
import { Unauthenticated } from "@/components/forms"

export default function Home() {
  const session = useSession()
  const { hasPostedToday } = useContext(UserContext)

  return (
    <>
      <Head>
        <title>creativity trackerr</title>
      </Head>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        m="auto"
      >
        {session.status === "authenticated" ? (
          <>
            {!hasPostedToday && (
              <Typography color="red" mb={5}>
                you have not tracked your data today
              </Typography>
            )}
            <Dashboard />
          </>
        ) : (
          <Unauthenticated />
        )}
      </Box>
    </>
  )
}
