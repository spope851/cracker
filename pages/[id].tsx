import React from "react"
import Head from "next/head"
import { useSession } from "next-auth/react"
import { Box } from "@mui/material"
import { useQuery } from "@apollo/client"
import { graphql } from "@/generated"
import Wordcloud from "@/components/wordcloud"

export default function WordcloudPage() {
  const session = useSession()
  const { data: dashboardData, loading: dashboardLoading } = useQuery(
    graphql(`
      query WordcloudQuery($user: Int!) {
        dashboard(user: $user) {
          dashboard {
            thirtyDayWordcloud
            sixtyDayWordcloud
            ninetyDayWordcloud
            yearWordcloud
          }
        }
      }
    `),
    { variables: { user: Number(session.data?.user.id) } }
  )

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
        <Wordcloud
          loading={dashboardLoading}
          data={dashboardData?.dashboard.dashboard}
        />
      </Box>
    </>
  )
}
