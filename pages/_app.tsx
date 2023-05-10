import type { AppProps } from "next/app"
import { ApolloProvider } from "@apollo/client"
import Layout from "@/components/layout"
import client from "../graphql/client/apolloClient"
import { ThemeProvider } from "@/components/themeProvider"
import { SessionProvider } from "next-auth/react"
import "animate.css"
import "tippy.js/dist/tippy.css"
import "tippy.js/animations/scale.css"
import {
  SnackbarContextProvider,
  UserContextProvider,
  ModalContextProvider,
} from "@/context/providers"
import { NextComponentWithAuth } from "@/types"
import { Auth } from "@/components/auth"

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps & { Component: NextComponentWithAuth }) {
  return (
    <SessionProvider session={session}>
      <ApolloProvider client={client}>
        <UserContextProvider>
          <ModalContextProvider>
            <SnackbarContextProvider>
              <ThemeProvider>
                <Layout>
                  {Component.auth ? (
                    <Auth
                      role={Component.auth.role}
                      redirect={Component.auth.redirect}
                    >
                      <Component {...pageProps} />
                    </Auth>
                  ) : (
                    <Component {...pageProps} />
                  )}
                </Layout>
              </ThemeProvider>
            </SnackbarContextProvider>
          </ModalContextProvider>
        </UserContextProvider>
      </ApolloProvider>
    </SessionProvider>
  )
}
