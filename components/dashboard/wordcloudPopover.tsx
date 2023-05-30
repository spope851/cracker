import { Button, Popover, Stack, Typography } from "@mui/material"
import React, { useContext, useState } from "react"
import { ratingColor } from "./functions"
import { DashboardFilterContext } from "./context"
import Calendar from "react-calendar"
import { styled } from "@mui/material/styles"
import { isSameDay } from "@/utils/date"
import { CalendarPopover } from "./calendarPopover"
import { POPOVER_WIDTH } from "./constants"
import { useQuery } from "@apollo/client"
import { GET_MENTIONS_QUERY } from "@/graphql/client"

const FOUND_DAY_PREFIX = "found-calendar-day-"

const POPOVER_BUTTON_SX = {
  bgcolor: "#fff",
  ":hover": {
    bgcolor: "#aaa",
  },
}

export const WordcloudPopover: React.FC<{
  word: string
  open: boolean
  setOpen: (open: boolean) => void
}> = ({ word, open: selfOpen, setOpen: setSelfOpen }) => {
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [calendarPopOpen, setCalendarPopOpen] = useState(false)

  const {
    premium: [premium],
    findTokens: findWords,
    basicWords,
    hideEntity,
    hideToken,
    hideWord,
    addSentenceTerm,
    analyzeEntities,
  } = useContext(DashboardFilterContext)

  const foundData = basicWords?.find(({ word: { text } }) => text?.content === word)
    ?.word.mentions

  const { data: mentionsQuery, loading } = useQuery(GET_MENTIONS_QUERY, {
    variables: { mentions: foundData as number[] },
    skip: premium,
    // onCompleted: (data) => console.log(data),
  })

  const mentions = premium
    ? findWords(word)
    : mentionsQuery?.getWordMentions.mentions

  const StyledCalendar = styled(Calendar)(() =>
    mentions?.map(({ rating }, idx) => {
      return {
        [`& .${FOUND_DAY_PREFIX}${idx}`]: {
          backgroundColor: ratingColor(rating),
        },
      }
    })
  )

  const premiumHideFns = () =>
    analyzeEntities ? hideEntity(true, word) : hideToken(true, word)

  return (
    <Popover
      anchorEl={document.body}
      disableEnforceFocus
      disableAutoFocus
      disableRestoreFocus
      open={selfOpen}
      onClose={() => setSelfOpen(false)}
    >
      {selectedDate && foundData && (
        <CalendarPopover
          track={mentions?.find(({ createdAt }) =>
            isSameDay(selectedDate, createdAt)
          )}
          open={calendarPopOpen}
          setOpen={setCalendarPopOpen}
          date={selectedDate}
          word={word}
        />
      )}
      <Stack rowGap={1} p={1} bgcolor="#666" color="#fff">
        <Typography variant="h5" alignSelf="center">
          {`${analyzeEntities ? "Entity" : "Token"}: ${word}`}
        </Typography>
        <Stack alignItems="end" width={POPOVER_WIDTH}>
          <StyledCalendar
            minDetail="month"
            onClickDay={(value) => {
              setSelectedDate(value)
              setCalendarPopOpen(true)
            }}
            tileClassName={({ date }) =>
              `${FOUND_DAY_PREFIX}${mentions?.findIndex(({ createdAt }) =>
                isSameDay(date, createdAt)
              )}`
            }
            tileDisabled={({ date }) =>
              !mentions?.find(({ createdAt }) => isSameDay(date, createdAt))
            }
          />
        </Stack>
        <Stack rowGap={1} direction="row" justifyContent="space-around">
          <Button
            onClick={() => {
              premium ? premiumHideFns() : hideWord(true, word)
              setSelfOpen(false)
            }}
            variant="outlined"
            sx={POPOVER_BUTTON_SX}
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
            sx={POPOVER_BUTTON_SX}
            size="small"
          >
            filter sentences
          </Button>
        </Stack>
      </Stack>
    </Popover>
  )
}
