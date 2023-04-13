import { Grid, Typography } from "@mui/material"
import React, { useContext } from "react"
import PieChart from "../pieChart"
import { DashboardFilterContext } from "./context"

const Metrics: React.FC = () => {
  const {
    avgHours,
    ratings: { countNegTwo, countNegOne, countZero, countPlusOne, countPlusTwo },
  } = useContext(DashboardFilterContext)

  return (
    <Grid container item md={4} mb={{ md: 0, sm: 5, xs: 5 }}>
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
        <Typography>
          {`avg daily creative hours:`}
          <Typography sx={{ float: "right" }} component="span" fontWeight="bold">
            {avgHours.toFixed(1)}
          </Typography>
        </Typography>
        <br />
        <Typography>
          {`on track for `}
          <Typography fontWeight="bold" component="span">
            {(avgHours * 356).toFixed()}
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
          <PieChart
            data={{
              countNegTwo,
              countNegOne,
              countZero,
              countPlusOne,
              countPlusTwo,
            }}
          />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Metrics
