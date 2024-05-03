import React from "react"
import { RegisterForm } from "@/components/forms/registerForm"
import { Box, Stack, Typography } from "@mui/material"
import Link from "next/link"
import cracker from "../public/images/cracker.svg"
import Image from "next/image"

export default function Register() {
  return (
    <Stack mt={15} gap={2}>
      <Box
        display="flex"
        justifyContent={"center"}
        borderRadius={"35px"}
        px={2}
        className="animate__animated animate__backInDown"
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
            color="primary.main"
            fontWeight={"600"}
            fontSize={"3rem"}
            display={{ xs: "none", sm: "block" }}
          >
            cracker
          </Typography>
          <Image
            src={cracker}
            height={65}
            width={65}
            alt="cracker"
            style={{
              backgroundColor: "#fff",
            }}
          />
        </Link>
      </Box>
      <RegisterForm />
    </Stack>
  )
}
