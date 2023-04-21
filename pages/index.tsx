import React from "react"
import Head from "next/head"
import { useSession } from "next-auth/react"
import { Box } from "@mui/material"
import Dashboard from "@/components/dashboard"
import { Unauthenticated } from "@/components/forms"
import { DashboardFilterContextProvider } from "@/components/dashboard/context"

export async function getServerSideProps() {
  return { props: { hello: "hello from ssr" } }
}

export default function Home({ hello }: { hello: string }) {
  const session = useSession()

  console.log(hello)

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
          <DashboardFilterContextProvider
            {...{
              runningAvg: null,
              analyzeEntities: null,
              tokenTags: null,
              minTokenCount: null,
              minEntityCount: null,
              sentenceTerms: null,
              hiddenTokens: null,
              hiddenEntities: null,
            }}
          >
            <Dashboard />
          </DashboardFilterContextProvider>
        ) : (
          <Unauthenticated />
        )}
      </Box>
    </>
  )
}
