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
import React, { useContext } from "react"
import EntityTable from "./entityTable"
import { RunningAverage } from "@/types"
import TokenTable from "./tokenTable"
import SentencesTable from "./sentencesTable"
import { DashboardFilterContext } from "./context"
import Metrics from "./metrics"
import { useRouter } from "next/router"
import { UserContext } from "@/context/userContext"
import Wordcloud from "./wordcloud"

const Dashboard: React.FC = () => {
  const router = useRouter()
  const { lastPost } = useContext(UserContext)
  const {
    runningAvg,
    setRunningAvg,
    analyzeEntities,
    setAnalyzeEntities,
    daysOfUse,
    filteredEntities: entities,
    filteredTokens: tokens,
  } = useContext(DashboardFilterContext)

  if (!lastPost)
    return (
      <Button onClick={() => router.push("/track")} variant="outlined">
        no data... click to track
      </Button>
    )

  return (
    <Box m={5}>
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
        <Metrics />
        {analyzeEntities ? <EntityTable /> : <TokenTable />}
      </Grid>
      <Grid container columnSpacing={5}>
        <SentencesTable />
        <Wordcloud
          words={
            analyzeEntities
              ? entities &&
                entities.map(({ entity, count, hide }, idx) => {
                  return hide
                    ? { text: "", value: 0, key: idx }
                    : { text: entity.name || "", value: count, key: idx }
                })
              : tokens &&
                tokens.map(({ token, count, hide }, idx) => {
                  return hide
                    ? { text: "", value: 0, key: idx }
                    : { text: token.text?.content || "", value: count, key: idx }
                })
          }
        />
      </Grid>
    </Box>
  )
}

export default Dashboard
