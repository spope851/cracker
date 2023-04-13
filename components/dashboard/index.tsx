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
import React, { useEffect, useState } from "react"
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
import type { Entity, Sentence, Token } from "./types"
import Metrics from "./metrics"

const Dashboard: React.FC = () => {
  const router = useRouter()
  const [nlpLoading, setLoading] = useState(true)
  const [analizeEntities, setAnalizeEntities] = useState(true)
  const [entities, setEntities] = useState<Entity[]>()
  const [tokens, setTokens] = useState<Token[]>()
  const [sentences, setSentences] = useState<Sentence[]>()
  const [runningAvg, setRunningAvg] = useState<RunningAverage>("30")
  const { data, loading } = useQuery(DASBOARD_QUERY, { variables: { runningAvg } })

  useEffect(() => {
    ;(async () => {
      if (!loading) {
        setLoading(true)
        const req = await fetch("/api/nlp", {
          method: "post",
          body: JSON.stringify({
            wordcloud: data?.dashboard.dashboard?.dashboardMetrics.overviews,
            runningAvg,
          }),
        })
          .then((res) => res.json())
          .then((res) => {
            setEntities(res.entities)
            setTokens(res.tokens)
            setSentences(res.sentences)
            setLoading(false)
          })
        return req
      }
    })()
  }, [runningAvg, loading])

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
        tokens={tokens}
        entities={entities}
        sentences={sentences}
        rawData={rawData.slice(0, Number(runningAvg))}
        loading={nlpLoading}
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
