import { Grid, Typography } from "@mui/material"
import React, { useContext, useEffect } from "react"
import PieChart from "../pieChart"
import { DASBOARD_METRICS_QUERY } from "@/graphql/client"
import { useQuery } from "@apollo/client"
import { DashboardFilterContext } from "./context"

export const Metrics: React.FC = () => {
  const {
    premium: [premium],
    basicRunningAvg,
    premiumRunningAvg,
    setDaysOfUse,
    setAvgHours,
  } = useContext(DashboardFilterContext)
  const { data, loading } = useQuery(DASBOARD_METRICS_QUERY, {
    variables: { runningAvg: premium ? premiumRunningAvg[0] : basicRunningAvg[0] },
  })

  const dashboardMetrics = data?.dashboardMetrics.dashboardMetrics

  useEffect(() => {
    setDaysOfUse(dashboardMetrics?.daysOfUse)
    setAvgHours(dashboardMetrics?.avgHours)
  }, [
    data,
    dashboardMetrics?.avgHours,
    dashboardMetrics?.daysOfUse,
    setAvgHours,
    setDaysOfUse,
  ])

  return (
    <Grid container item md={4} sm={12} xs={12} mb={{ md: 0, sm: 5, xs: 5 }}>
      <Grid
        item
        flex={1}
        boxShadow={
          "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;"
        }
        borderRadius={2}
        p={5}
        display="flex"
        flexDirection="column"
        overflow="auto"
      >
        {loading ? (
          "...fetching"
        ) : (
          <>
            <Typography>
              {`Average daily creative hours:`}
              <Typography ml={1} component="span" fontWeight="bold">
                {dashboardMetrics?.avgHours?.toFixed(1)}
              </Typography>
            </Typography>
            <br />
            <Typography>
              {`You're on track for `}
              <Typography fontWeight="bold" component="span">
                {dashboardMetrics?.avgHours &&
                  (dashboardMetrics.avgHours * 356).toFixed()}
              </Typography>
              {` creative hours this year!`}
            </Typography>
            <br />
            <Typography
              variant="h5"
              fontWeight={"600"}
              textAlign="center"
              sx={{ textDecoration: "underline" }}
            >
              Ratings
            </Typography>
            <Grid item height={300} width={350} alignSelf="center">
              {dashboardMetrics?.ratings && (
                <PieChart data={dashboardMetrics.ratings} />
              )}
            </Grid>
          </>
        )}
      </Grid>
    </Grid>
  )
}
