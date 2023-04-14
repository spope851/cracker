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
import React, { useState } from "react"
import { useRouter } from "next/router"
import { DASBOARD_QUERY } from "@/graphql/client"
import { useQuery } from "@apollo/client"
import EntityTable from "./entityTable"
import { RunningAverage } from "@/types"
import TokenTable from "./tokenTable"
import SentencesTable from "./sentencesTable"
import TokenWordcloud from "./tokenWordcloud"
import EntityWordcloud from "./entityWordcloud"
import { DashboardFilterContextProvider } from "./context"
import Metrics from "./metrics"

const Dashboard: React.FC = () => {
  const router = useRouter()
  const [analizeEntities, setAnalizeEntities] = useState(true)
  const [runningAvg, setRunningAvg] = useState<RunningAverage>("30")
  const { data, loading } = useQuery(DASBOARD_QUERY, { variables: { runningAvg } })

  if (loading) return <>...loading</>
  if (data?.dashboard?.dashboard?.dashboardMetrics.avgHours === undefined)
    return (
      <Button onClick={() => router.push("/track")} variant="outlined">
        no data... click to track
      </Button>
    )

  const { daysOfUse } = data.dashboard.dashboard.dashboardMetrics

  const { dashboardMetrics, rawData } = data.dashboard.dashboard

  const {
    countNegTwo,
    countNegOne,
    countZero,
    countPlusOne,
    countPlusTwo,
    avgHours,
  } = dashboardMetrics

  return (
    <Box m={5}>
      <DashboardFilterContextProvider
        tokens={data.dashboard.dashboard.tokens}
        entities={data.dashboard.dashboard.entities}
        sentences={data.dashboard.dashboard.sentences}
        rawData={rawData}
        loading={loading}
        avgHours={Number(avgHours)}
        ratings={{ countNegTwo, countNegOne, countZero, countPlusOne, countPlusTwo }}
      >
        <Stack flexDirection="row" mb={1}>
          <FormControl sx={{ width: 150, mr: 5 }}>
            <InputLabel>running average</InputLabel>
            <Select
              value={runningAvg}
              label="Running Average"
              onChange={(e) => setRunningAvg(e.target.value as RunningAverage)}
            >
              <MenuItem value={"30"}>30 days</MenuItem>
              {daysOfUse > 30 && <MenuItem value={"60"}>60 days</MenuItem>}
              {daysOfUse > 60 && <MenuItem value={"90"}>90 days</MenuItem>}
              {daysOfUse > 90 && <MenuItem value={"365"}>1 year</MenuItem>}
            </Select>
          </FormControl>
          <Tabs
            value={analizeEntities ? 0 : 1}
            onChange={() => setAnalizeEntities(!analizeEntities)}
            sx={{ borderBottom: 1, borderColor: "divider", width: "100%" }}
          >
            <Tab label="analize entities" />
            <Tab label="analize tokens" />
          </Tabs>
        </Stack>
        <Grid container justifyContent="space-between" mb={5} columnSpacing={5}>
          <Metrics />
          {analizeEntities ? <EntityTable /> : <TokenTable />}
        </Grid>
        <Grid container columnSpacing={5}>
          <SentencesTable />
          {analizeEntities ? <EntityWordcloud /> : <TokenWordcloud />}
        </Grid>
      </DashboardFilterContextProvider>
    </Box>
  )
}

export default Dashboard
