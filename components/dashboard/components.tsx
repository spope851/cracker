import { Box, SxProps } from "@mui/material"
import React, { ReactNode } from "react"

const TH: React.FC<{ children: ReactNode; sx?: SxProps }> = ({ children, sx }) => (
  <Box component="th" whiteSpace="nowrap" p={1} sx={sx}>
    {children}
  </Box>
)

const TD: React.FC<{
  children: ReactNode
  textAlign?: "center"
  bgcolor?: string
}> = ({ children, textAlign, bgcolor }) => (
  <Box
    component="td"
    border={2}
    p={1}
    borderColor="black"
    textAlign={textAlign}
    bgcolor={bgcolor}
  >
    {children}
  </Box>
)

export { TH, TD }
