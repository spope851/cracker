import React, { useContext, useState } from "react"
import Head from "next/head"
import { Box, Button, Typography } from "@mui/material"
import { UserContext } from "@/context/userContext"
import Dropzone from "react-dropzone"
import * as csv from "csv"
import { useMutation } from "@apollo/client"
import { UPLOAD_TRACKER_MUTATION } from "@/graphql/client/track/uploadTrackerMutation"
import { Tracker, UpdateTracker } from "@/components/forms"

export default function Track() {
  const { hasPostedToday } = useContext(UserContext)
  const [upload, setUpload] = useState(false)
  const [uploadTracker, { loading, data }] = useMutation(UPLOAD_TRACKER_MUTATION)

  const post = hasPostedToday ? (
    // TODO: <UpdateTracker /> component goes here
    <UpdateTracker />
  ) : (
    <>
      <Tracker />
    </>
  )

  return (
    <>
      <Head>
        <title>creativity tracker</title>
      </Head>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        mt="auto"
        flexDirection="column"
      >
        <Button variant="outlined" onClick={() => setUpload(!upload)}>
          upload
        </Button>
        {upload ? (
          <Dropzone
            multiple={false}
            maxFiles={1}
            maxSize={209715200}
            onDropAccepted={async (acceptedFiles) => {
              const reader = new FileReader()
              reader.onload = () => {
                csv.parse(reader.result as Buffer, (_err, rawData) => {
                  rawData.shift()
                  const data = rawData.map((el: string[]) => {
                    return {
                      numberCreativeHours: Number(el[0]),
                      rating: Number(el[1]),
                      overview: el[2],
                      user: "1",
                    }
                  })
                  console.log(data)

                  uploadTracker({
                    variables: {
                      data,
                    },
                  })
                })
              }

              reader.readAsBinaryString(acceptedFiles[0])
            }}
          >
            {({ getRootProps, getInputProps }) => (
              <Box
                {...getRootProps()}
                sx={{
                  backgroundColor: "transparent",
                  borderStyle: "dashed",
                  borderColor: "#5A5D60",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "12px",
                  cursor: "pointer",
                }}
                m={3}
                p={3}
              >
                <input {...getInputProps()} />
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  textAlign="center"
                  sx={{ whiteSpace: "pre-wrap" }}
                >
                  <Box mx={5}>
                    <Typography variant="caption" color="#333437">
                      {loading
                        ? "...processing"
                        : data?.uploadTracker.uploaded || "File type should be .csv"}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            )}
          </Dropzone>
        ) : (
          post
        )}
      </Box>
    </>
  )
}
