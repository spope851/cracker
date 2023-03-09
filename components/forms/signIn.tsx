import React, { useState } from "react"
import { Typography } from "@mui/material"
import { signIn } from "next-auth/react"

export const SignIn: React.FC = () => {
  const [username, setUsername] = useState<string>()
  const [password, setPassword] = useState<string>()
  const [signInError, setSignInError] = useState<string>()
  const [signInLoading, setSignInLoading] = useState(false)

  return (
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
  )
}
