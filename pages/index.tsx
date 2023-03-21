import React from "react"
import Head from "next/head"
import { useSession } from "next-auth/react"
import { Box } from "@mui/material"
import Dashboard from "@/components/dashboard"
import { Unauthenticated } from "@/components/forms"

export default function Home() {
  const session = useSession()

  return (
    <>
      <Head>
        <title>creativity tracker</title>
      </Head>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        m="auto"
      >
        {session.status === "authenticated" ? <Dashboard /> : <Unauthenticated />}
      </Box>
    </>
  )
}
