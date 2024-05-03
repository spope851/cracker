import Navbar from "./navbar"
import Footer from "./footer"
import { Box } from "@mui/material"
import React from "react"
import { useRouter } from "next/router"

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter()
  return (
    <Box
      sx={{
        bgcolor: "background.default",
        color: "text.primary",
        minHeight: "100vh",
        backgroundImage: "linear-gradient(180deg, #fff 35%, #fff 75%, #344cc0 200%)",
      }}
      display="flex"
      flexDirection="column"
    >
      {router.pathname == "/register" ? null : <Navbar />}
      {children}
      <Footer />
    </Box>
  )
}

export default Layout
