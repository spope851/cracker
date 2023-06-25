import { Box, SxProps } from "@mui/material"
import React, { ReactNode } from "react"

const TH: React.FC<{ children: ReactNode; sx?: SxProps; onClick?: () => void }> = ({
  children,
  sx,
  onClick,
}) => (
  <Box
    component="th"
    whiteSpace="nowrap"
    p={1}
    sx={{ display: "table-cell", ":hover": { cursor: onClick && "pointer" } }}
    onClick={onClick}
  >
    <Box sx={sx} width="100%">
      {children}
    </Box>
  </Box>
)

const TD: React.FC<{
  children: ReactNode
  textAlign?: "center"
  bgcolor?: string
  sx?: SxProps
}> = ({ children, textAlign, bgcolor, sx }) => (
  <Box
    component="td"
    border={2}
    p={1}
    borderColor="black"
    textAlign={textAlign}
    bgcolor={bgcolor}
    sx={sx}
  >
    {children}
  </Box>
)

export { TH, TD }
