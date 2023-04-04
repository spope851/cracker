import { UPLOAD_TRACKER_MUTATION } from "@/graphql/client/track/uploadTrackerMutation"
import { useMutation } from "@apollo/client"
import { Box, BoxProps, Button, Typography } from "@mui/material"
import React, { PropsWithChildren, ReactNode, useState } from "react"
import Dropzone from "react-dropzone"
import * as csv from "csv"
import { useSession } from "next-auth/react"
import { TrackerInput } from "@/generated/graphql"
import { OVERVIEW_CHAR_LIMIT } from "@/constants"
import { useRouter } from "next/router"

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
  const [uploadedData, setUploadedData] = useState<TrackerInput[]>()
  const [uploadTracker, { loading, data }] = useMutation(UPLOAD_TRACKER_MUTATION)
  const [dropzoneContent, setDropzoneContent] = useState<ReactNode>(
    <Typography>File type should be .csv</Typography>
  )
  const session = useSession()

  return (
    <>
      {!uploadedData && (
        <Button variant="outlined" onClick={() => setUpload(false)}>
          back
        </Button>
      )}
      <Dropzone
        multiple={false}
        maxFiles={1}
        onDropAccepted={async (acceptedFiles) => {
          const reader = new FileReader()
          reader.onload = () => {
            csv.parse(reader.result as Buffer, (_err, rows) => {
              rows.shift()
              const userData: TrackerInput[] = rows.map(
                ([numberCreativeHours, rating, overview]: string[]) => {
                  return {
                    numberCreativeHours: Number(numberCreativeHours),
                    rating: Number(rating),
                    overview: overview.slice(0, OVERVIEW_CHAR_LIMIT),
                    user: session.data?.user.id,
                  }
                }
              )
              setUploadedData(userData)
              setDropzoneContent(
                <>
                  {loading ? (
                    "...processing"
                  ) : (
                    <Box
                      component="table"
                      bgcolor="#ddd"
                      border="solid"
                      sx={{ borderCollapse: "collapse" }}
                    >
                      <Box component="thead">
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
                      <Box component="tbody">
                        {userData.map(
                          ({ overview, numberCreativeHours, rating }) => (
                            <Box component="tr">
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
                  )}
                </>
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
              overflow: "auto",
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
        <Button
          variant="outlined"
          onClick={() =>
            uploadTracker({
              variables: {
                data: uploadedData.reverse(),
              },
            })
              .then(
                () => setDropzoneContent(data?.uploadTracker.uploaded),
                () =>
                  setDropzoneContent(
                    data?.uploadTracker.errors &&
                      data.uploadTracker.errors[0].message
                  )
              )
              .finally(() => router.push("/"))
          }
        >
          upload
        </Button>
      )}
    </>
  )
}
