import React, { useContext } from "react"
import Head from "next/head"
import { Box } from "@mui/material"
import { UserContext } from "@/context/userContext"
import { Tracker, UpdateTracker } from "@/components/forms"

export default function Track() {
  const { hasPostedToday } = useContext(UserContext)

  return (
    <>
      <Head>
        <title>creativity tracker</title>
      </Head>
      <Box display="flex" justifyContent="center" alignItems="center" mt="auto">
        {hasPostedToday ? <UpdateTracker /> : <Tracker />}
      </Box>
    </>
  )
}
