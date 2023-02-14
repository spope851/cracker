import type { AppProps } from "next/app"
import { ApolloProvider } from "@apollo/client"
import Layout from "@/components/layout"
import client from "../graphql/apolloClient"
import { ThemeProvider } from "@/components/themeProvider"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <ApolloProvider client={client}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </ThemeProvider>
  )
}
