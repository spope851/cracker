import React from "react"
import Head from "next/head"
import { useSession } from "next-auth/react"
import { Box } from "@mui/material"
import Dashboard from "@/components/dashboard"
import { Unauthenticated } from "@/components/forms"
import redis from "@/utils/redis"
import { RunningAverage } from "@/types"
import { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth"
import { authOptions } from "./api/auth/[...nextauth]"

export async function getServerSideProps({
  req,
  res,
}: {
  req: NextApiRequest
  res: NextApiResponse
}) {
  const {
    user: { id: user },
  } = await getServerSession(req, res, authOptions)
  const filters = await redis.hgetall(`dashboardFilters/${user}`)
  return { props: filters }
}

export default function Home(dashboardFilters: {
  runningAvg: RunningAverage
  analyzeEntities: string
}) {
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
        {session.status === "authenticated" ? (
          <Dashboard {...dashboardFilters} />
        ) : (
          <Unauthenticated />
        )}
      </Box>
    </>
  )
}
