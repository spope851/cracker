import { Stack } from "@mui/material"
import React, { ReactNode } from "react"

export const Modal: React.FC<{ children?: ReactNode }> = React.forwardRef<
  HTMLDivElement,
  { children?: ReactNode }
>((props, ref) => (
  <Stack
    ref={ref}
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
    {props.children}
  </Stack>
))
