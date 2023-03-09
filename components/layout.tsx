import Navbar from "./navbar"
import Footer from "./footer"
import { Box } from "@mui/material"
import React from "react"

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Box
    sx={{
      bgcolor: "background.default",
      color: "text.primary",
      minHeight: "100vh",
    }}
    display="flex"
    flexDirection="column"
  >
    <Navbar />
    {children}
    <Footer />
  </Box>
)

export default Layout
