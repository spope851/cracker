import React, { useContext, useState } from "react"
import Head from "next/head"
import { Box, Button, Stack } from "@mui/material"
import { UserContext } from "@/context/userContext"
import { PostTracker, UpdateTracker } from "@/components/track"

const MOBILE_PY = 3
import { UploadTracker } from "@/components/track/uploadTracker"
import UploadFileIcon from "@mui/icons-material/UploadFile"

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
        {!lastPost && !upload && (
          <Button
            variant="outlined"
            onClick={() => setUpload(!upload)}
            sx={{ alignSelf: "flex-end" }}
          >
            upload <UploadFileIcon />
          </Button>
        )}
        {upload ? <UploadTracker setUpload={setUpload} /> : post}
      </Stack>
    </>
  )
}
