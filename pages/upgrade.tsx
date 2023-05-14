import React, { useContext } from "react"
import Head from "next/head"
import { Button, Stack } from "@mui/material"
import { useMutation } from "@apollo/client"
import { UPGRADE_MUTATION } from "@/graphql/client/global"
import { SnackbarContext } from "@/context/snackbarContext"
import { useRouter } from "next/router"
import { UserContext } from "@/context/userContext"

const MOBILE_PY = 3

export default function Upgrade() {
  const router = useRouter()
  const { setSnackbarOpen, setSnackbarMessage } = useContext(SnackbarContext)
  const { refetch } = useContext(UserContext)
  const [upgrade, { data: _, loading }] = useMutation(UPGRADE_MUTATION, {
    onCompleted: (data) => {
      refetch({ refetch: true })
      router.push("/")
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
