import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
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
import { useSession } from "next-auth/react"
import { ModalContext } from "@/context/modalContext"
import { Modal } from "@/components/wrappers"

const CALC_MAX_WIDTH = "calc(100vw - 40px)"

const maxWidth = {
  sm: CALC_MAX_WIDTH,
  xs: CALC_MAX_WIDTH,
}

const RUNNING_AVG_WIDTH = 150
const RUNNING_AVG_MR = 5

const BasicDashboard: React.FC = () => {
  const session = useSession()
  const router = useRouter()
  const { setModalContent, setModalOpen } = useContext(ModalContext)
  const { lastPost } = useContext(UserContext)
  const {
    premium: [, setPremium],
    basicRunningAvg: [basicRunningAvg, setBasicRunningAvg],
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
        flexDirection="row"
        mb={1}
        rowGap={1}
        justifyContent="space-between"
        alignItems="center"
      >
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
        <FormControlLabel
          control={
            <Switch
              checked={false}
              onChange={() => {
                if (session.data?.user.role === 3) setPremium(true)
                else {
                  setModalContent(
                    <Modal>
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
                    </Modal>
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
