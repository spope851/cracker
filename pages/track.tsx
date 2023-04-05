import React, { useContext, useState } from "react"
import Head from "next/head"
import { Box, Button } from "@mui/material"
import { UserContext } from "@/context/userContext"
import { Tracker, UpdateTracker } from "@/components/forms"
import { UploadTracker } from "@/components/uploadTracker"
import UploadFileIcon from "@mui/icons-material/UploadFile"

export default function Track() {
  const { hasPostedToday } = useContext(UserContext)
  const [upload, setUpload] = useState(false)

  const post = hasPostedToday ? <UpdateTracker /> : <Tracker />

  return (
    <>
      <Head>
        <title>creativity tracker</title>
      </Head>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        flex={1}
        p={5}
      >
        {!upload && (
          <Button
            variant="outlined"
            onClick={() => setUpload(!upload)}
            sx={{ alignSelf: "flex-end", mb: "auto" }}
          >
            upload <UploadFileIcon />
          </Button>
        )}
        <Box m="auto">{upload ? <UploadTracker setUpload={setUpload} /> : post}</Box>
      </Box>
    </>
  )
}
