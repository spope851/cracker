import { Box, Typography } from "@mui/material"
import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"

export const NavbarItem: React.FC<{ title: string }> = ({ title }) => {
  const router = useRouter()

  return (
    <Box
      component="li"
      p={2}
      borderLeft="solid 1px #bbb"
      sx={{
        backgroundColor: router.pathname === `/${title}` ? "primary.main" : "grey",
      }}
    >
      <Link href={`/${title}`} style={{ textDecoration: "none" }}>
        <Typography color="#fff">{title}</Typography>
      </Link>
    </Box>
  )
}
