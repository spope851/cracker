import React, { useContext } from "react"
import Head from "next/head"
import { Box, Typography } from "@mui/material"
import { UserContext } from "@/context/userContext"
import { Tracker } from "@/components/forms"

export default function Track() {
  const { hasPostedToday } = useContext(UserContext)

  return (
    <>
      <Head>
        <title>creativity tracker</title>
      </Head>
      <Box display="flex" justifyContent="center" alignItems="center" mt="auto">
        {hasPostedToday ? (
          // TODO: <UpdateTracker /> component goes here
          <Typography color="red">you have already posted today</Typography>
        ) : (
          <Tracker />
        )}
      </Box>
    </>
  )
}
