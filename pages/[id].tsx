import React from "react"
import Head from "next/head"
import { Box } from "@mui/material"
import { useQuery } from "@apollo/client"
import Wordcloud from "@/components/wordcloud"
import { WORDCLOUD_QUERY } from "@/graphql/client"

export default function WordcloudPage() {
  const { data: dashboardData, loading: dashboardLoading } =
    useQuery(WORDCLOUD_QUERY)

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
