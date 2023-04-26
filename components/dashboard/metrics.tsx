import { Grid, Typography } from "@mui/material"
import React, { useContext, useEffect } from "react"
import PieChart from "../pieChart"
import { DASBOARD_METRICS_QUERY } from "@/graphql/client"
import { useQuery } from "@apollo/client"
import { DashboardFilterContext } from "./context"

export const Metrics: React.FC = () => {
  const { runningAvg, setDaysOfUse, setAvgHours } = useContext(
    DashboardFilterContext
  )
  const { data, loading } = useQuery(DASBOARD_METRICS_QUERY, {
    variables: { runningAvg },
  })

  const dashboardMetrics = data?.dashboardMetrics.dashboardMetrics

  useEffect(() => {
    setDaysOfUse(dashboardMetrics?.daysOfUse)
    setAvgHours(dashboardMetrics?.avgHours)
  }, [data])

  return (
    <Grid container item md={4} sm={12} xs={12} mb={{ md: 0, sm: 5, xs: 5 }}>
      <Grid
        item
        flex={1}
        border="solid"
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
              {`avg daily creative hours:`}
              <Typography sx={{ float: "right" }} component="span" fontWeight="bold">
                {dashboardMetrics?.avgHours?.toFixed(1)}
              </Typography>
            </Typography>
            <br />
            <Typography>
              {`on track for `}
              <Typography fontWeight="bold" component="span">
                {dashboardMetrics?.avgHours &&
                  (dashboardMetrics.avgHours * 356).toFixed()}
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
