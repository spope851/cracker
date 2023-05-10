import { Stack } from "@mui/material"
import { ReactNode } from "react"

export const Modal: React.FC<{
  children: ReactNode
}> = ({ children }) => (
  <Stack
    alignItems="center"
    p={3}
    rowGap={2}
    borderRadius={1}
    bgcolor="background.paper"
    top="50%"
    left="50%"
    position="absolute"
    sx={{
      transform: "translate(-50%, -50%)",
    }}
  >
    {children}
  </Stack>
)
