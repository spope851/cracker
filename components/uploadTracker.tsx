import { UPLOAD_TRACKER_MUTATION } from "@/graphql/client/track/uploadTrackerMutation"
import { useMutation } from "@apollo/client"
import { Box, Typography } from "@mui/material"
import * as React from "react"
import Dropzone from "react-dropzone"
import * as csv from "csv"
import { useSession } from "next-auth/react"

export const UploadTracker = () => {
  const [uploadTracker, { loading, data }] = useMutation(UPLOAD_TRACKER_MUTATION)
  const session = useSession()
  return (
    <Dropzone
      multiple={false}
      maxFiles={1}
      onDropAccepted={async (acceptedFiles) => {
        const reader = new FileReader()
        reader.onload = () => {
          csv.parse(reader.result as Buffer, (_err, rows) => {
            rows.shift()
            const data = rows.map(
              ([numberCreativeHours, rating, overview]: string[]) => {
                return {
                  numberCreativeHours: Number(numberCreativeHours),
                  rating: Number(rating),
                  overview,
                  user: session.data?.user.id,
                }
              }
            )
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
  )
}
