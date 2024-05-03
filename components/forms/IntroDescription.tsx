import { Stack, Typography } from "@mui/material"
import React from "react"

export const IntroDescription = () => {
  return (
    <Stack className={"animate__animated animate__backInLeft"} maxWidth={"500px"}>
      <Typography variant="h2" color={"#4162ff"} fontWeight={"600"}>
        Unlock Your Productivity Potential
      </Typography>

      <Typography variant="h5">
        Rate, Reflect, Improve with cracker Powered by Google Cloud AI!
      </Typography>
    </Stack>
  )
}
