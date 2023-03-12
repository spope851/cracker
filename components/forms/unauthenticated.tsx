import { Typography, Button } from "@mui/material"
import React, { useState } from "react"
import { Register } from "./register"
import { SignIn } from "./signIn"

export const Unauthenticated: React.FC = () => {
  const [register, setRegister] = useState(false)

  return register ? (
    <>
      <Register />
      <Typography>
        already a member? <Button onClick={() => setRegister(false)}>sign in</Button>
      </Typography>
    </>
  ) : (
    <>
      <SignIn />
      <Typography>
        not a member? <Button onClick={() => setRegister(true)}>sign up</Button>
      </Typography>
    </>
  )
}
