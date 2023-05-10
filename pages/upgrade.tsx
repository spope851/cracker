import React, { useContext } from "react"
import Head from "next/head"
import { Button, Stack } from "@mui/material"
import { useMutation } from "@apollo/client"
import { UPGRADE_MUTATION } from "@/graphql/client/global/upgradeMutation"
import { SnackbarContext } from "@/context/snackbarContext"
import { signOut } from "next-auth/react"

const MOBILE_PY = 3

export default function Upgrade() {
  const { setSnackbarOpen, setSnackbarMessage } = useContext(SnackbarContext)
  const [upgrade, { data: _, loading }] = useMutation(UPGRADE_MUTATION, {
    onCompleted: (data) => {
      setTimeout(() => signOut(), 3000)
      setSnackbarMessage(`${data.upgrade} Please sign back in to try it out.`)
      setSnackbarOpen(true)
    },
  })
  return (
    <>
      <Head>
        <title>creativity tracker</title>
      </Head>
      <Stack
        justifyContent="center"
        alignItems="center"
        py={{ sm: MOBILE_PY, xs: MOBILE_PY }}
        rowGap={5}
        flex={1}
        p={5}
      >
        <Button variant="outlined" onClick={() => upgrade()}>
          {loading ? "...processing payment" : "pay"}
        </Button>
      </Stack>
    </>
  )
}

Upgrade.auth = {
  role: 1,
  redirect: "/",
}
