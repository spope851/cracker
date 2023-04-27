import { UPLOAD_TRACKER_MUTATION } from "@/graphql/client/track/uploadTrackerMutation"
import { useMutation } from "@apollo/client"
import { Box, BoxProps, Button, Typography } from "@mui/material"
import React, { PropsWithChildren, ReactNode, useContext, useState } from "react"
import Dropzone from "react-dropzone"
import { parse } from "csv"
import { TrackerInput } from "@/generated/graphql"
import { OVERVIEW_CHAR_LIMIT } from "@/constants"
import { useRouter } from "next/router"
import { SnackbarContext } from "@/context/snackbarContext"

const tableBorderProps = {
  p: 1,
  border: "solid",
  sx: { borderCollapse: "collapse" },
}

const BorderedTableComponent: React.FC<PropsWithChildren<BoxProps>> = ({
  component,
  children,
}: PropsWithChildren<BoxProps>) => (
  <Box component={component} {...tableBorderProps}>
    {children}
  </Box>
)

export const UploadTracker: React.FC<{ setUpload: (upload: boolean) => void }> = ({
  setUpload,
}) => {
  const router = useRouter()
  const { setSnackbarMessage, setSnackbarOpen } = useContext(SnackbarContext)
  const [uploadedData, setUploadedData] = useState<TrackerInput[]>()
  const [uploadTracker, { loading }] = useMutation(UPLOAD_TRACKER_MUTATION)
  const [dropzoneContent, setDropzoneContent] = useState<ReactNode>(
    <Typography>File type should be .csv</Typography>
  )

  return (
    <Box display="flex" flexDirection="column">
      {!uploadedData && (
        <Button
          variant="outlined"
          onClick={() => setUpload(false)}
          sx={{ alignSelf: "center" }}
        >
          back
        </Button>
      )}
      <Dropzone
        multiple={false}
        maxFiles={1}
        onDropAccepted={async (acceptedFiles) => {
          const reader = new FileReader()
          reader.onload = () => {
            if (reader.result)
              parse(reader.result.toString(), (_err, rows) => {
                const userData: TrackerInput[] = rows
                  .map(([numberCreativeHours, rating, overview]: string[]) => {
                    // invalidate rows of the wrong type
                    if (!!Number(numberCreativeHours) && !!Number(rating))
                      return {
                        numberCreativeHours: Number(numberCreativeHours),
                        rating: Number(rating),
                        // TODO: ensure punctuation when merged with feature/dashboard2 branch
                        overview: overview.slice(0, OVERVIEW_CHAR_LIMIT).trim(),
                      }
                  })
                  // filter out invalid rows
                  .filter((datum: TrackerInput | undefined) => datum !== undefined)

                setUploadedData(userData)
                setDropzoneContent(
                  <Box
                    component="table"
                    bgcolor="#ddd"
                    border="solid"
                    sx={{ borderCollapse: "collapse" }}
                  >
                    <Box component="thead">
                      <Box component="tr">
                        <BorderedTableComponent component="th">
                          hours
                        </BorderedTableComponent>
                        <BorderedTableComponent component="th">
                          rating
                        </BorderedTableComponent>
                        <BorderedTableComponent component="th">
                          overview
                        </BorderedTableComponent>
                      </Box>
                    </Box>
                    <Box component="tbody">
                      {userData.map(
                        ({ overview, numberCreativeHours, rating }, idx) => (
                          <Box component="tr" key={idx}>
                            <BorderedTableComponent component="td">
                              {numberCreativeHours}
                            </BorderedTableComponent>
                            <BorderedTableComponent component="td">
                              {rating}
                            </BorderedTableComponent>
                            <BorderedTableComponent component="td">
                              {overview}
                            </BorderedTableComponent>
                          </Box>
                        )
                      )}
                    </Box>
                  </Box>
                )
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
              maxHeight: "65vh",
              overflow: uploadedData && "scroll",
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
              <Box mx={5} maxHeight="65vh">
                {dropzoneContent}
              </Box>
            </Box>
          </Box>
        )}
      </Dropzone>
      {uploadedData && (
        <Box display="flex" alignSelf="center">
          <Button
            sx={{ m: 1 }}
            variant="outlined"
            onClick={() =>
              uploadTracker({
                variables: {
                  data: uploadedData.reverse(),
                },
              })
                .then(
                  (res) => {
                    setSnackbarOpen(true)
                    setSnackbarMessage(res.data?.uploadTracker.uploaded!)
                  },
                  (res) =>
                    setDropzoneContent(
                      <Typography>
                        {res.data?.uploadTracker.errors &&
                          res.data.uploadTracker.errors[0].message}
                      </Typography>
                    )
                )
                .finally(() => router.push("/"))
            }
          >
            {loading ? "...processing" : "upload"}
          </Button>
          <Button sx={{ m: 1 }} variant="outlined" onClick={() => setUpload(false)}>
            cancel
          </Button>
        </Box>
      )}
    </Box>
  )
}
