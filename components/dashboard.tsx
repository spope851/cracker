import { Button, Grid, Typography } from "@mui/material"
import React from "react"
import Link from "next/link"
import { DashboardQueryQuery } from "@/generated/graphql"
import { useRouter } from "next/router"

const Dashboard: React.FC<{
  loading: boolean
  data: DashboardQueryQuery["dashboard"]["dashboard"]
}> = ({ loading, data }) => {
  const router = useRouter()
  if (loading) return <>...loading</>
  if (data?.thirtyDayAvg === undefined)
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
  } = data!

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
    <Grid container width="100vw" px={5}>
      {Object.entries(dashboardDatasets).map(([key, val]) => (
        <Grid md={4} key={key} item>
          <Typography variant="h5">
            <Link href={`/${key}`}>{`${key} day data`}</Link>
          </Typography>
          <Typography>{`avg daily creative hours: ${val.avg.toFixed()}`}</Typography>
          <Typography>{`on track to hit ${(
            Number(val.avg) * 356
          ).toFixed()} creative hours this year`}</Typography>
          <Typography variant="h6" mt={2}>
            breakdown of good/bad days
          </Typography>
          <Typography>{`excellent (+2 rating): ${val.two}`}</Typography>
          <Typography>{`great (+1 rating): ${val.one}`}</Typography>
          <Typography>{`meh (0 rating): ${val.zero}`}</Typography>
          <Typography>{`not great (-1 rating): ${val.neg1}`}</Typography>
          <Typography>{`not very good (-2 rating): ${val.neg2}`}</Typography>
        </Grid>
      ))}
    </Grid>
  )
}

export default Dashboard
