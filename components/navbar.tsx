import { AppBar, Box, Typography } from "@mui/material"
import Link from "next/link"
import { useRouter } from "next/router"

export default function Navbar() {
  const router = useRouter()

  return (
    <AppBar position="static" sx={{ backgroundColor: "grey" }}>
      <Box component="nav">
        <Box
          component="ul"
          display="flex"
          m={0}
          p={0}
          overflow="hidden"
          sx={{ listStyleType: "none" }}
        >
          <Box
            component="li"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            px={2}
            borderRight="solid 1px #bbb"
            sx={{
              backgroundColor: router.pathname === "/" ? "primary.main" : "grey",
            }}
          >
            <Link href="/" style={{ textDecoration: "none" }}>
              <Typography variant="h5" m={0} color="#fff">
                creativity tracker
              </Typography>
            </Link>
          </Box>
          <Box
            component="li"
            p={2}
            ml="auto"
            borderLeft="solid 1px #bbb"
            sx={{
              backgroundColor:
                router.pathname === "/track" ? "primary.main" : "grey",
            }}
          >
            <Link href="/track" style={{ textDecoration: "none" }}>
              <Typography color="#fff">track</Typography>
            </Link>
          </Box>
        </Box>
      </Box>
    </AppBar>
  )
}
