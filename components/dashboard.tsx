import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material"
import React, { useState } from "react"
import { useRouter } from "next/router"
import { DASBOARD_QUERY } from "@/graphql/client"
import { useQuery } from "@apollo/client"
import { useSession } from "next-auth/react"
import Entities from "./entities"
import PieChart from "./pieChart"
import { RunningAverage } from "@/types"
import { splitDashboardData } from "@/utils/dashboard"
import Tokens from "./tokens"

const DashboardDatum: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Typography sx={{ float: "right" }} component="span" fontWeight="bold">
    {children}
  </Typography>
)

const Dashboard: React.FC = () => {
  const router = useRouter()
  const session = useSession()
  const [runningAvg, setRunningAvg] = useState<RunningAverage>("30")
  const { data, loading } = useQuery(DASBOARD_QUERY, {
    variables: { user: Number(session.data?.user.id) },
  })

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
  const { neg2, neg1, zero, one, two, avg, cloud } = dataset

  return (
    <>
      <Grid container width="100vw" justifyContent="flex-start">
        <Grid item md={5} sm={6} p={5}>
          <FormControl fullWidth sx={{ mb: 5 }}>
            <InputLabel>Running Average</InputLabel>
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
        <Entities data={cloud} />
      </Grid>
      <Tokens
        data={cloud}
        rawData={data.dashboard.dashboard.rawData}
        avgHours={Number(avg.toFixed(2))}
      />
    </>
  )
}

export default Dashboard
