import React, { useState } from "react"
import { Box, Button, Stack, TextField, Typography } from "@mui/material"
import { signIn } from "next-auth/react"

export const SignIn: React.FC = () => {
  const [username, setUsername] = useState<string>()
  const [password, setPassword] = useState<string>()
  const [signInError, setSignInError] = useState<string>()
  const [signInLoading, setSignInLoading] = useState(false)

  return (
    <Box
      component="form"
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
        <Button type="submit" variant="outlined" disabled={!username || !password}>
          {signInLoading ? "...processing" : "sign in"}
        </Button>
        {signInError && (
          <Typography variant="caption" color="red" mt={1} textAlign="center">
            {signInError}
          </Typography>
        )}
      </Stack>
    </Box>
  )
}
