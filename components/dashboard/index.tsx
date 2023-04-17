import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Tab,
  Tabs,
} from "@mui/material"
import React, { useContext, useEffect, useState } from "react"
import EntityTable from "./entityTable"
import { RunningAverage } from "@/types"
import TokenTable from "./tokenTable"
import SentencesTable from "./sentencesTable"
import TokenWordcloud from "./tokenWordcloud"
import EntityWordcloud from "./entityWordcloud"
import { DashboardFilterContextProvider } from "./context"
import Metrics from "./metrics"
import { DashboardMetrics } from "@/generated/graphql"
import { useRouter } from "next/router"
import { UserContext } from "@/context/userContext"

const Dashboard: React.FC<{
  runningAvg: RunningAverage | null
  analyzeEntities: string | null
}> = ({ runningAvg: cachedRunningAvg, analyzeEntities: cachedAnalyzeEntities }) => {
  const router = useRouter()
  const { lastPost } = useContext(UserContext)
  const [analyzeEntities, setAnalyzeEntities] = useState<boolean>(
    JSON.parse(cachedAnalyzeEntities || "true")
  )
  const [runningAvg, setRunningAvg] = useState<RunningAverage>(
    cachedRunningAvg || "30"
  )
  const [daysOfUse, setDaysOfUse] = useState<DashboardMetrics["daysOfUse"]>()

  useEffect(() => {
    ;(async () =>
      await fetch("/api/cacheDashboardFilters", {
        method: "post",
        body: JSON.stringify({ runningAvg, analyzeEntities }),
      }))()
  }, [runningAvg, analyzeEntities])

  if (!lastPost)
    return (
      <Button onClick={() => router.push("/track")} variant="outlined">
        no data... click to track
      </Button>
    )

  return (
    <Box m={5}>
      <DashboardFilterContextProvider runningAvg={runningAvg}>
        <Stack flexDirection="row" mb={1}>
          <FormControl sx={{ width: 150, mr: 5 }}>
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
          <Tabs
            value={analyzeEntities ? 0 : 1}
            onChange={() => setAnalyzeEntities(!analyzeEntities)}
            sx={{ borderBottom: 1, borderColor: "divider", width: "100%" }}
          >
            <Tab label="analyze entities" />
            <Tab label="analyze tokens" />
          </Tabs>
        </Stack>
        <Grid container justifyContent="space-between" mb={5} columnSpacing={5}>
          <Metrics runningAvg={runningAvg} setDaysOfUse={setDaysOfUse} />
          {analyzeEntities ? <EntityTable /> : <TokenTable />}
        </Grid>
        <Grid container columnSpacing={5}>
          <SentencesTable />
          {analyzeEntities ? <EntityWordcloud /> : <TokenWordcloud />}
        </Grid>
      </DashboardFilterContextProvider>
    </Box>
  )
}

export default Dashboard
