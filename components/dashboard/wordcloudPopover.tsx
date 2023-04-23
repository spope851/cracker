import { Track } from "@/generated/graphql"
import { Button, Popover, Stack, Tooltip, Typography } from "@mui/material"
import React, { useContext } from "react"
import { aboveAverage, ratingColor } from "./functions"
import { DashboardFilterContext } from "./context"

const WordcloudPopover: React.FC<{
  word: string
  open: boolean
  setOpen: (open: boolean) => void
}> = ({ word, open, setOpen }) => {
  const {
    avgHours,
    findTokens: findWords,
    hideEntity,
    hideToken,
    addSentenceTerm,
    analyzeEntities,
  } = useContext(DashboardFilterContext)
  const foundData = findWords(word)
  return (
    <Popover
      anchorEl={document.body}
      disableEnforceFocus
      disableAutoFocus
      disableRestoreFocus
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Stack rowGap={1} p={1} bgcolor="#666">
        <Stack rowGap={1}>
          <Button
            onClick={() => {
              analyzeEntities ? hideEntity(true, word) : hideToken(true, word)
              setOpen(false)
            }}
            variant="outlined"
            // TODO: hover background color
            sx={{ bgcolor: "#fff" }}
            size="small"
          >
            hide
          </Button>
          <Button
            onClick={() => {
              addSentenceTerm(word)
              setOpen(false)
            }}
            variant="outlined"
            // TODO: hover background color
            sx={{ bgcolor: "#fff" }}
            size="small"
          >
            filter sentences
          </Button>
        </Stack>
        <Stack alignItems="end">
          {(foundData && foundData.length > 0
            ? foundData
            : [{ overview: "", rating: 0, id: "x" } as Track]
          ).map((datum) => (
            <Tooltip
              key={datum.id}
              placement="right"
              title={
                foundData &&
                foundData.length > 0 && (
                  <>
                    <Typography display="flex" mb={"2px"} alignItems="center">
                      rating:{" "}
                      <Typography
                        p={1}
                        ml={1}
                        component="span"
                        bgcolor={ratingColor(datum.rating)}
                        color="#000"
                        flex={1}
                        display="flex"
                        justifyContent="center"
                      >
                        {datum.rating > 0 && "+"}
                        {datum.rating}
                      </Typography>
                    </Typography>
                    <Typography display="flex" alignItems="center">
                      hours:{" "}
                      <Typography
                        p={1}
                        ml={1}
                        component="span"
                        bgcolor={aboveAverage(avgHours, datum.numberCreativeHours)}
                        color="#000"
                        flex={1}
                        display="flex"
                        justifyContent="center"
                      >
                        {datum.numberCreativeHours}
                      </Typography>
                    </Typography>
                    <Tooltip
                      placement="right"
                      title={datum.overview.split(word).map((part, idx, arr) => (
                        <Typography component="span" key={idx}>
                          {part}
                          {idx < arr.length - 1 && (
                            <Typography
                              component="span"
                              color="yellow"
                              fontWeight="bold"
                            >
                              {word}
                            </Typography>
                          )}
                        </Typography>
                      ))}
                    >
                      <Typography>{`overview >`}</Typography>
                    </Tooltip>
                  </>
                )
              }
            >
              <Typography color={ratingColor(datum.rating)}>
                {foundData && foundData.length > 0
                  ? new Date(String(datum.createdAt)).toLocaleDateString()
                  : "[IGNORED]"}
              </Typography>
            </Tooltip>
          ))}
        </Stack>
      </Stack>
    </Popover>
  )
}

export default WordcloudPopover
