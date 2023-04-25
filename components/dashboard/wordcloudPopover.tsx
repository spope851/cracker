import { Track } from "@/generated/graphql"
import { Button, Popover, Stack, Typography } from "@mui/material"
import React, { useContext, useState } from "react"
import { aboveAverage, ratingColor } from "./functions"
import { DashboardFilterContext } from "./context"
import Calendar from "react-calendar"
import { styled } from "@mui/material/styles"
import { isSameDay } from "@/utils/date"

const FOUND_DAY_PREFIX = "found-calendar-day-"

const WordcloudPopover: React.FC<{
  word: string
  open: boolean
  setOpen: (open: boolean) => void
}> = ({ word, open: selfOpen, setOpen: setSelfOpen }) => {
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [calendarPopOpen, setCalendarPopOpen] = useState(false)

  const {
    avgHours,
    findTokens: findWords,
    hideEntity,
    hideToken,
    addSentenceTerm,
    analyzeEntities,
  } = useContext(DashboardFilterContext)
  const foundData = findWords(word)

  const StyledCalendar = styled(Calendar)(() =>
    foundData?.map(({ rating }, idx) => {
      return {
        [`& .${FOUND_DAY_PREFIX}${idx}`]: {
          backgroundColor: ratingColor(rating),
        },
      }
    })
  )

  const CalendarPopover: React.FC<{ track?: Track }> = ({ track }) => (
    <Popover
      anchorEl={document.body}
      anchorReference="anchorPosition"
      anchorPosition={{ top: 0, left: 348 }}
      disableEnforceFocus
      disableAutoFocus
      disableRestoreFocus
      open={calendarPopOpen}
      onClose={() => setCalendarPopOpen(false)}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
    >
      {track ? (
        <Stack rowGap={1} p={1} bgcolor="#666" color="#fff" maxWidth={300}>
          <Typography
            variant="h5"
            alignSelf="center"
            sx={{ textDecoration: "underline" }}
          >
            {selectedDate?.toDateString()}
          </Typography>
          <Stack direction="row" columnGap={1}>
            <Typography display="flex" alignItems="center" fontWeight="bold">
              rating:{" "}
              <Typography
                p={1}
                ml={1}
                component="span"
                bgcolor={ratingColor(track.rating)}
                color="#000"
                flex={1}
                display="flex"
                justifyContent="center"
              >
                {track.rating > 0 && "+"}
                {track.rating}
              </Typography>
            </Typography>
            <Typography display="flex" alignItems="center" fontWeight="bold">
              hours:{" "}
              <Typography
                p={1}
                ml={1}
                component="span"
                bgcolor={aboveAverage(avgHours, track.numberCreativeHours)}
                color="#000"
                flex={1}
                display="flex"
                justifyContent="center"
              >
                {track.numberCreativeHours}
              </Typography>
            </Typography>
          </Stack>
          <Typography component="span" fontWeight="bold">
            {`overview: `}
            {track.overview.split(word).map((part, idx, arr) => (
              <Typography component="span" key={idx}>
                {part}
                {idx < arr.length - 1 && (
                  <Typography component="span" color="yellow" fontWeight="bold">
                    {word}
                  </Typography>
                )}
              </Typography>
            ))}
          </Typography>
        </Stack>
      ) : (
        <Typography>ERROR: data not found</Typography>
      )}
    </Popover>
  )

  return (
    <Popover
      anchorEl={document.body}
      disableEnforceFocus
      disableAutoFocus
      disableRestoreFocus
      open={selfOpen}
      onClose={() => setSelfOpen(false)}
    >
      <Stack rowGap={1} p={1} bgcolor="#666">
        <Stack rowGap={1}>
          <Button
            onClick={() => {
              analyzeEntities ? hideEntity(true, word) : hideToken(true, word)
              setSelfOpen(false)
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
              setSelfOpen(false)
            }}
            variant="outlined"
            // TODO: hover background color
            sx={{ bgcolor: "#fff" }}
            size="small"
          >
            filter sentences
          </Button>
        </Stack>
        <Stack alignItems="end" width={300}>
          <StyledCalendar
            minDetail="month"
            onClickDay={(value) => {
              setSelectedDate(value)
              setCalendarPopOpen(true)
            }}
            tileClassName={({ date }) =>
              `${FOUND_DAY_PREFIX}${foundData?.findIndex(({ createdAt }) =>
                isSameDay(date, createdAt)
              )}`
            }
            tileDisabled={({ date }) =>
              !foundData?.find(({ createdAt }) => isSameDay(date, createdAt))
            }
          />
          {selectedDate && foundData && (
            <CalendarPopover
              track={foundData.find(({ createdAt }) =>
                isSameDay(selectedDate, createdAt)
              )}
            />
          )}
        </Stack>
      </Stack>
    </Popover>
  )
}

export default WordcloudPopover
