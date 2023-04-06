import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material"
import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { DASBOARD_QUERY } from "@/graphql/client"
import { useQuery } from "@apollo/client"
import { useSession } from "next-auth/react"
import Entities, { Entity } from "./entities"
import PieChart from "../pieChart"
import { RunningAverage } from "@/types"
import { splitDashboardData } from "@/utils/dashboard"
import Tokens, { Token } from "./tokens"
import Sentences from "./sentences"

const DashboardDatum: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Typography sx={{ float: "right" }} component="span" fontWeight="bold">
    {children}
  </Typography>
)

const Dashboard: React.FC = () => {
  const router = useRouter()
  const session = useSession()
  const [nlpLoading, setLoading] = useState(true)
  const [entities, setEntities] = useState<Entity[]>()
  const [tokens, setTokens] = useState<Token[]>()
  const [sentences, setSentences] = useState<any[]>()
  const [runningAvg, setRunningAvg] = useState<RunningAverage>("30")
  const { data, loading } = useQuery(DASBOARD_QUERY, {
    variables: { user: Number(session.data?.user.id) },
  })

  useEffect(() => {
    ;(async () => {
      if (!loading) {
        const wordcloud = () => {
          if (runningAvg === "30")
            return data?.dashboard.dashboard?.dashboardMetrics.thirtyDayWordcloud
          else if (runningAvg === "60")
            return data?.dashboard.dashboard?.dashboardMetrics.sixtyDayWordcloud
          else if (runningAvg === "90")
            return data?.dashboard.dashboard?.dashboardMetrics.ninetyDayWordcloud
          else return data?.dashboard.dashboard?.dashboardMetrics.yearWordcloud
        }
        setLoading(true)
        const req = await fetch("/api/nlp", {
          method: "post",
          body: JSON.stringify({ wordcloud: wordcloud(), runningAvg }),
        })
          .then((res) => res.json())
          .then((res) => {
            console.log(res)
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
  if (data?.dashboard?.dashboard?.dashboardMetrics.thirtyDayAvg === undefined)
    return (
      <Button onClick={() => router.push("/track")} variant="outlined">
        no data... click to track
      </Button>
    )

  const { daysOfUse } = data.dashboard.dashboard.dashboardMetrics

  const dashboardDatasets = splitDashboardData(
    data.dashboard.dashboard.dashboardMetrics
  )

  const dataset = dashboardDatasets[runningAvg]
  const { neg2, neg1, zero, one, two, avg } = dataset

  return (
    <Box m={5}>
      <Grid container justifyContent="space-between" mb={5} columnSpacing={5}>
        <Grid container item md={5} sm={6}>
          <FormControl fullWidth>
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
          <Grid
            item
            flex={1}
            border="solid"
            borderRadius={2}
            p={5}
            display="flex"
            flexDirection="column"
          >
            <Typography>
              {`avg daily creative hours:`}
              <DashboardDatum>{avg.toFixed(1)}</DashboardDatum>
            </Typography>
            <br />
            <Typography>
              {`on track for `}
              <Typography fontWeight="bold" component="span">
                {(Number(avg) * 356).toFixed()}
              </Typography>
              {` creative hours this year`}
            </Typography>
            <br />
            <Typography
              variant="h6"
              textAlign="center"
              sx={{ textDecoration: "underline" }}
            >
              Ratings
            </Typography>
            <Grid item height={300} width={350} alignSelf="center">
              <PieChart data={{ neg2, neg1, zero, one, two }} />
            </Grid>
          </Grid>
        </Grid>
        <Entities entities={entities} loading={nlpLoading} />
      </Grid>
      <Tokens
        tokens={tokens}
        loading={nlpLoading}
        rawData={data.dashboard.dashboard.rawData.slice(0, Number(runningAvg))}
        avgHours={Number(avg.toFixed(2))}
      />
      <Sentences
        sentences={sentences}
        loading={nlpLoading}
        rawData={data.dashboard.dashboard.rawData.slice(0, Number(runningAvg))}
        avgHours={Number(avg.toFixed(2))}
      />
    </Box>
  )
}

export default Dashboard
