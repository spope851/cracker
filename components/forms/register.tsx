import React, { useEffect, useState } from "react"
import { Typography } from "@mui/material"
import { useMutation } from "@apollo/client"
import { signIn } from "next-auth/react"
import { REGISTER_MUTATION } from "@/graphql/client"

export const Register: React.FC = () => {
  const [email, setEmail] = useState<string>()
  const [username, setUsername] = useState<string>()
  const [password, setPassword] = useState<string>()
  const [registerMutation, { data, loading, error }] = useMutation(REGISTER_MUTATION)

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

  return (
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
  )
}
