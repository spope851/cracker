import { Box, Typography } from "@mui/material"
import Image from "next/image"
import Link from "next/link"
import github from "../public/images/github.svg"

export default function Footer() {
  return (
    <Box
      component="footer"
      display="flex"
      justifyContent="space-around"
      mt="auto"
      sx={{ backgroundColor: "grey" }}
    >
      <Box component="ul" sx={{ listStyleType: "none" }}>
        <Box component="li">
          <Link
            href="https://github.com/The-Reflective-Hour/creativity-tracker"
            target="_blank"
            rel="noreferrer"
          >
            <Image src={github} width={30} height={30} alt="github" />
          </Link>
        </Box>
      </Box>
      <Box style={{ margin: "auto 0" }}>
        <Typography component="span" color="#fff">
          © 2023 The Reflective Hour
        </Typography>
      </Box>
    </Box>
  )
}
