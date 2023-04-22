import React, { useContext } from "react"
import Head from "next/head"
import { Box } from "@mui/material"
import { UserContext } from "@/context/userContext"
import { PostTracker, UpdateTracker } from "@/components/track"

const MOBILE_PY = 3

export default function Track() {
  const { hasPostedToday } = useContext(UserContext)

  return (
    <>
      <Head>
        <title>creativity tracker</title>
      </Head>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        mt="auto"
        py={{ sm: MOBILE_PY, xs: MOBILE_PY }}
      >
        {hasPostedToday ? <UpdateTracker /> : <PostTracker />}
      </Box>
    </>
  )
}
