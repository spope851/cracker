import { AppBar, Box, Typography } from "@mui/material"
import { useSession } from "next-auth/react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/router"
import AvatarMenu from "./avatarMenu"
import cracker from "../public/images/cracker.svg"

export default function Navbar() {
  const router = useRouter()
  const session = useSession()

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
            <Link
              href="/"
              style={{
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h5"
                m={0}
                color="#fff"
                display={{ xs: "none", sm: "block" }}
              >
                cracker
              </Typography>
              <Image src={cracker} height={35} width={35} alt="cracker" />
            </Link>
          </Box>
          <Box ml="auto" display="flex">
            <Box
              component="li"
              p={2}
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
            {session.status === "authenticated" && (
              <Box
                component="li"
                p={1}
                borderLeft="solid 1px #bbb"
                sx={{
                  backgroundColor: "grey",
                }}
              >
                <AvatarMenu />
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </AppBar>
  )
}
