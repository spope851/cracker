import { Track } from "@/generated/graphql"
import { Popover, Stack, Typography } from "@mui/material"
import React, { useContext } from "react"
import { aboveAverage, ratingColor } from "./functions"
import { DashboardFilterContext } from "./context"
import { POPOVER_WIDTH } from "./constants"

export const CalendarPopover: React.FC<{
  track?: Track
  open: boolean
  setOpen: (open: boolean) => void
  date: Date
  word: string
}> = ({ track, open, setOpen, date, word }) => {
  const { avgHours } = useContext(DashboardFilterContext)
  return (
    <Popover
      anchorEl={document.body}
      anchorReference="anchorPosition"
      anchorPosition={{ top: 0, left: POPOVER_WIDTH + 48 }}
      disableEnforceFocus
      disableAutoFocus
      disableRestoreFocus
      open={open}
      onClose={() => setOpen(false)}
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
        <Stack rowGap={1} p={1} bgcolor="#666" color="#fff" maxWidth={POPOVER_WIDTH}>
          <Typography
            variant="h5"
            alignSelf="center"
            sx={{ textDecoration: "underline" }}
          >
            {date?.toDateString()}
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
}
