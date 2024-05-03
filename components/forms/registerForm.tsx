import React, { useEffect, useState } from "react"
import { Box, Button, Stack, TextField, Typography } from "@mui/material"
import { useMutation } from "@apollo/client"
import { signIn } from "next-auth/react"
import { REGISTER_MUTATION } from "@/graphql/client"

export const RegisterForm: React.FC = () => {
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
    <Box
      className="animate__animated animate__fadeIn"
      boxShadow={"rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"}
      mx={"auto"}
      width={"250px"}
      p={6}
      borderRadius={"30px"}
      component="form"
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
      mb={1}
    >
      <Stack rowGap={2}>
        <TextField
          name="username"
          label="Username"
          type="text"
          size="small"
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          name="password"
          label="Password"
          type="password"
          size="small"
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          name="email"
          label="Email"
          type="email"
          size="small"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button
          type="submit"
          variant="outlined"
          disabled={!email || !username || !password}
        >
          {loading ? "...processing" : "sign up"}
        </Button>
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
      </Stack>
    </Box>
  )
}
