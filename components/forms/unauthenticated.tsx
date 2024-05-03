import { Typography, Button, Stack, Box } from "@mui/material"
import React from "react"
import { SignIn } from "./signIn"
import { IntroDescription } from "./IntroDescription"
import { useRouter } from "next/router"

export const Unauthenticated: React.FC = () => {
  const router = useRouter()

  return (
    <Stack direction={"row"}>
      <IntroDescription />
      <Box className={"animate__animated animate__backInRight"} mt={5}>
        <SignIn />
        <Typography>
          not a member?{" "}
          <Button onClick={() => router.push("/register")}>sign up</Button>
        </Typography>
      </Box>
    </Stack>
  )
}
