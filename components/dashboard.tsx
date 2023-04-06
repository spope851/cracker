import { Button, Grid, Typography } from "@mui/material"
import React from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { DASBOARD_QUERY } from "@/graphql/client"
import { useQuery } from "@apollo/client"

const DashboardDatum: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Typography sx={{ float: "right" }} component="span">
    {children}
  </Typography>
)

const Dashboard: React.FC = () => {
  const router = useRouter()
  const { data, loading } = useQuery(DASBOARD_QUERY)

  if (loading) return <>...loading</>
  if (data?.dashboard?.dashboard?.thirtyDayAvg === undefined)
    return (
      <Button onClick={() => router.push("/track")} variant="outlined">
        no data... click to track
      </Button>
    )
  const {
    thirtyDayAvg,
    sixtyDayAvg,
    ninetyDayAvg,
    thirtyDayCountNeg2,
    thirtyDayCountNeg1,
    thirtyDayCount0,
    thirtyDayCount1,
    thirtyDayCount2,
    sixtyDayCountNeg2,
    sixtyDayCountNeg1,
    sixtyDayCount0,
    sixtyDayCount1,
    sixtyDayCount2,
    ninetyDayCountNeg2,
    ninetyDayCountNeg1,
    ninetyDayCount0,
    ninetyDayCount1,
    ninetyDayCount2,
  } = data.dashboard.dashboard

  const dashboardDatasets = {
    "30": {
      avg: thirtyDayAvg,
      neg2: thirtyDayCountNeg2,
      neg1: thirtyDayCountNeg1,
      zero: thirtyDayCount0,
      one: thirtyDayCount1,
      two: thirtyDayCount2,
    },
    "60": {
      avg: sixtyDayAvg,
      neg2: sixtyDayCountNeg2,
      neg1: sixtyDayCountNeg1,
      zero: sixtyDayCount0,
      one: sixtyDayCount1,
      two: sixtyDayCount2,
    },
    "90": {
      avg: ninetyDayAvg,
      neg2: ninetyDayCountNeg2,
      neg1: ninetyDayCountNeg1,
      zero: ninetyDayCount0,
      one: ninetyDayCount1,
      two: ninetyDayCount2,
    },
  }

  return (
    <Grid container width="100vw" justifyContent="space-evenly">
      {Object.entries(dashboardDatasets).map(([key, val]) => (
        <Grid item md={3} key={key} border="solid" borderRadius={2} p={5} m={5}>
          <Typography variant="h5">
            <Link href={`/${key}`}>{`${key} day data`}</Link>
          </Typography>
          <Typography>
            {`avg daily creative hours:`}
            <DashboardDatum>{val.avg.toFixed()}</DashboardDatum>
          </Typography>
          <br />
          <Typography>
            {`on track to hit `}
            <Typography fontWeight="bold" component="span">
              {(Number(val.avg) * 356).toFixed()}
            </Typography>
            {` creative hours this year`}
          </Typography>
          <Typography variant="h6" mt={2}>
            breakdown of good/bad days
          </Typography>
          <br />
          <Typography>
            {`excellent (+2 rating):`}
            <DashboardDatum>{val.two}</DashboardDatum>
          </Typography>
          <Typography>
            {`great (+1 rating):`}
            <DashboardDatum>{val.one}</DashboardDatum>
          </Typography>
          <Typography>
            {`meh (0 rating):`}
            <DashboardDatum>{val.zero}</DashboardDatum>
          </Typography>
          <Typography>
            {`not great (-1 rating):`}
            <DashboardDatum>{val.neg1}</DashboardDatum>
          </Typography>
          <Typography>
            {`not very good (-2 rating):`}
            <DashboardDatum>{val.neg2}</DashboardDatum>
          </Typography>
        </Grid>
      ))}
    </Grid>
  )
}

export default Dashboard
