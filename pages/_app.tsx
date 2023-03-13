import type { AppProps } from "next/app"
import { ApolloProvider } from "@apollo/client"
import Layout from "@/components/layout"
import client from "../graphql/client/apolloClient"
import { ThemeProvider } from "@/components/themeProvider"
import { SessionProvider } from "next-auth/react"
import "animate.css"
import { UserContextProvider } from "@/context/providers"

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <ApolloProvider client={client}>
        <UserContextProvider>
          <ThemeProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ThemeProvider>
        </UserContextProvider>
      </ApolloProvider>
    </SessionProvider>
  )
}
