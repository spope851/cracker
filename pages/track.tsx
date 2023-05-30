import React, { useContext, useState } from "react"
import Head from "next/head"
import { Stack } from "@mui/material"
import { UserContext } from "@/context/userContext"
import { PostTracker, UpdateTracker, UploadButton } from "@/components/track"

const MOBILE_PY = 3
import { UploadTracker } from "@/components/track/uploadTracker"

export default function Track() {
  const { hasPostedToday, lastPost } = useContext(UserContext)
  const [upload, setUpload] = useState(false)

  const post = hasPostedToday ? <UpdateTracker /> : <PostTracker />

  return (
    <>
      <Head>
        <title>creativity tracker</title>
      </Head>
      <Stack
        justifyContent={upload ? "center" : "flex-start"}
        alignItems="center"
        py={{ sm: MOBILE_PY, xs: MOBILE_PY }}
        rowGap={5}
        flex={1}
        p={5}
      >
        {!lastPost && !upload && <UploadButton setUpload={setUpload} />}
        {upload ? <UploadTracker setUpload={setUpload} /> : post}
      </Stack>
    </>
  )
}
