import React, { useEffect, useState } from "react"
import Head from "next/head"
import { signIn, useSession } from "next-auth/react"
import { Box, Button, Typography } from "@mui/material"
import { useMutation } from "@apollo/client"
import { graphql } from "@/generated"

export default function Home() {
  const [register, setRegister] = useState(false)
  const [email, setEmail] = useState<string>()
  const [username, setUsername] = useState<string>()
  const [password, setPassword] = useState<string>()
  const [signInError, setSignInError] = useState<string>()
  const [signInLoading, setSignInLoading] = useState(false)
  const session = useSession()
  const [registerMutation, { data, loading, error }] = useMutation(
    graphql(`
      mutation Mutation($user: UserInput!) {
        register(user: $user) {
          errors {
            field
            message
          }
          user {
            username
          }
        }
      }
    `)
  )

  useEffect(() => {
    ;(async () => {
      if (data && !loading && data.register.user)
        await signIn("credentials", {
          username: data?.register.user.username,
          password,
          redirect: false,
        })
    })()
  }, [loading, data, password])

  const form = register ? (
    <>
      <form
        method="post"
        onSubmit={async (e) => {
          e.preventDefault()
          email &&
            username &&
            password &&
            (await registerMutation({
              variables: { user: { email, username, password } },
            }))
        }}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <label>
          Username
          <input
            name="username"
            type="text"
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Password
          <input
            name="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label>
          Email
          <input
            name="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <button type="submit" disabled={!email || !username || !password}>
          {loading ? "...processing" : "sign up"}
        </button>
        {error && (
          <Typography variant="caption" color="red" mt={1} textAlign="center">
            unhandled error: {error.message}
          </Typography>
        )}
        {data?.register.errors &&
          data.register.errors.map(({ message }) => (
            <Typography
              key={message}
              variant="caption"
              color="red"
              mt={1}
              textAlign="center"
            >
              {message}
            </Typography>
          ))}
      </form>
      <Typography>
        already a member? <Button onClick={() => setRegister(false)}>sign in</Button>
      </Typography>
    </>
  ) : (
    <>
      <form
        onSubmit={async (e) => {
          e.preventDefault()
          setSignInLoading(true)
          await signIn("credentials", {
            username,
            password,
            redirect: false,
          }).then((res) => {
            if (res?.error) {
              setSignInError("incorrect credentials")
              setSignInLoading(false)
            }
          })
        }}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <label>
          Username
          <input
            name="username"
            type="text"
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Password
          <input
            name="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit" disabled={!username || !password}>
          {signInLoading ? "...processing" : "sign in"}
        </button>
        {signInError && (
          <Typography variant="caption" color="red" mt={1} textAlign="center">
            {signInError}
          </Typography>
        )}
      </form>
      <Typography>
        not a member? <Button onClick={() => setRegister(true)}>sign up</Button>
      </Typography>
    </>
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
        {session.status === "authenticated" ? "dashboard" : form}
      </Box>
    </>
  )
}
