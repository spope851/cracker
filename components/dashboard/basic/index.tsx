import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material"
import React, { useContext } from "react"
import { RunningAverage } from "@/types"
import { DashboardFilterContext } from "../context"
import { useRouter } from "next/router"
import { UserContext } from "@/context/userContext"
import { Metrics } from "../metrics"
import { Wordcloud } from "../wordcloud"
import { SentencesTable } from "./sentencesTable"
import { WordTable } from "./wordTable"

const CALC_MAX_WIDTH = "calc(100vw - 40px)"

const maxWidth = {
  sm: CALC_MAX_WIDTH,
  xs: CALC_MAX_WIDTH,
}

const RUNNING_AVG_WIDTH = 150
const RUNNING_AVG_MR = 5

const BasicDashboard: React.FC = () => {
  const router = useRouter()
  const { lastPost } = useContext(UserContext)
  const {
    runningAvg,
    setRunningAvg,
    daysOfUse,
    basicWords: tokens,
  } = useContext(DashboardFilterContext)

  if (!lastPost)
    return (
      <Button onClick={() => router.push("/track")} variant="outlined">
        no data... click to track
      </Button>
    )

  return (
    <Box m={5}>
      <Stack
        flexDirection={{ md: "row", sm: "row", xs: "column" }}
        mb={1}
        rowGap={1}
      >
        <FormControl
          sx={{
            width: { md: RUNNING_AVG_WIDTH, sm: RUNNING_AVG_WIDTH },
            mr: { md: RUNNING_AVG_MR, sm: RUNNING_AVG_MR },
          }}
        >
          <InputLabel>running average</InputLabel>
          <Select
            value={runningAvg}
            label="Running Average"
            onChange={(e) => setRunningAvg(e.target.value as RunningAverage)}
          >
            <MenuItem value="30">30 days</MenuItem>
            <MenuItem disabled={daysOfUse ? daysOfUse < 30 : true} value={"60"}>
              60 days
            </MenuItem>
            <MenuItem disabled={daysOfUse ? daysOfUse < 60 : true} value={"90"}>
              90 days
            </MenuItem>
          </Select>
        </FormControl>
      </Stack>
      <Grid
        container
        justifyContent="space-between"
        columnSpacing={5}
        maxWidth={maxWidth}
        mb={5}
      >
        <Metrics />
        <WordTable />
      </Grid>
      <Grid container columnSpacing={5} maxWidth={maxWidth}>
        <SentencesTable />
        <Wordcloud
          words={
            tokens &&
            tokens.map(({ word, count, hide }, idx) => {
              return hide
                ? { text: "", value: 0, key: idx }
                : { text: word.text?.content || "", value: count, key: idx }
            })
          }
        />
      </Grid>
    </Box>
  )
}

export default BasicDashboard