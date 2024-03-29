import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  Stack,
  Switch,
  Typography,
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
import { ModalContext } from "@/context/modalContext"
import { ModalContentWrapper } from "@/components/wrappers"
import { FeatureFlag } from "@/components/featureFlag"
import { HoursSlider } from "@/components/hoursSlider"

const CALC_MAX_WIDTH = "calc(100vw - 40px)"

const maxWidth = {
  sm: CALC_MAX_WIDTH,
  xs: CALC_MAX_WIDTH,
}

const RUNNING_AVG_WIDTH = 150
const RUNNING_AVG_MR = 5

const BasicDashboard: React.FC = () => {
  const router = useRouter()
  const { setModalContent, setModalOpen } = useContext(ModalContext)
  const { lastPost, user } = useContext(UserContext)
  const {
    premium: [, setPremium],
    basicRunningAvg: [basicRunningAvg, setBasicRunningAvg],
    basicPreQueryMaxHours,
    basicPreQueryMinHours,
    basicPreQueryRating: [basicPreQueryRating, setBasicPreQueryRating],
    daysOfUse,
    basicWords,
  } = useContext(DashboardFilterContext)

  if (!lastPost)
    return (
      <Button onClick={() => router.push("/track")} variant="outlined">
        no data... click to track
      </Button>
    )

  const { role } = user

  return (
    <Box m={5}>
      <Stack
        flexDirection="row"
        mb={1}
        rowGap={1}
        justifyContent="space-between"
        alignItems="center"
      >
        <Stack flexDirection="row" mr="auto" rowGap={1}>
          <FormControl
            sx={{
              width: { md: RUNNING_AVG_WIDTH, sm: RUNNING_AVG_WIDTH },
              mr: { md: RUNNING_AVG_MR, sm: RUNNING_AVG_MR },
              flexGrow: { md: 0, sm: 0, xs: 1 },
            }}
          >
            <InputLabel>running average</InputLabel>
            <Select
              value={basicRunningAvg}
              label="Running Average"
              onChange={(e) => {
                setBasicRunningAvg(e.target.value as RunningAverage)
              }}
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
          <FormControl
            sx={{
              width: { md: RUNNING_AVG_WIDTH, sm: RUNNING_AVG_WIDTH },
              flexGrow: { md: 0, sm: 0, xs: 1 },
              mr: RUNNING_AVG_MR,
            }}
          >
            <InputLabel>rating(s)</InputLabel>
            <Select
              multiple
              value={basicPreQueryRating || []}
              label="rating(s)"
              onChange={(e) => {
                setBasicPreQueryRating(
                  e.target.value.length > 0 ? (e.target.value as number[]) : null
                )
              }}
            >
              <MenuItem value={2}>+2</MenuItem>
              <MenuItem value={1}>+1</MenuItem>
              <MenuItem value={0}>0</MenuItem>
              <MenuItem value={-1}>-1</MenuItem>
              <MenuItem value={-2}>-2</MenuItem>
            </Select>
          </FormControl>
          <HoursSlider min={basicPreQueryMinHours} max={basicPreQueryMaxHours} />
        </Stack>
        <FeatureFlag name="premiumDashboardSwitch">
          <FormControlLabel
            control={
              <Switch
                checked={false}
                onChange={() => {
                  if (role && role >= 2) setPremium(true)
                  else {
                    setModalContent(
                      <ModalContentWrapper>
                        <Typography>
                          You must be a premium member to use this feature
                        </Typography>
                        <Button
                          variant="outlined"
                          onClick={() => {
                            setModalOpen(false)
                            router.push("/upgrade")
                          }}
                        >
                          upgrade
                        </Button>
                      </ModalContentWrapper>
                    )
                    setModalOpen(true)
                  }
                }}
              />
            }
            label="premium"
            labelPlacement="start"
            sx={{ mb: { md: 1, sm: 1 }, mr: { md: 0, sm: 0 } }}
          />
        </FeatureFlag>
      </Stack>
      <Grid
        container
        justifyContent="space-between"
        columnSpacing={5}
        width={maxWidth}
        mb={5}
      >
        <Metrics />
        <WordTable />
      </Grid>
      <Grid container columnSpacing={5} width={maxWidth}>
        <SentencesTable />
        <Wordcloud
          words={
            basicWords &&
            basicWords.map(({ word, count, hide }, idx) => {
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
