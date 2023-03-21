import { DashboardQueryQuery } from "@/generated/graphql"
import { DashboardDatasets } from "@/types"

const splitDashboardData = (
  data: DashboardQueryQuery["dashboard"]["dashboard"]
): DashboardDatasets => {
  const {
    thirtyDayAvg,
    sixtyDayAvg,
    ninetyDayAvg,
    yearAvg,
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
    yearCountNeg2,
    yearCountNeg1,
    yearCount0,
    yearCount1,
    yearCount2,
    thirtyDayWordcloud,
    sixtyDayWordcloud,
    ninetyDayWordcloud,
    yearWordcloud,
  } = data!

  return {
    "30": {
      avg: thirtyDayAvg,
      neg2: thirtyDayCountNeg2,
      neg1: thirtyDayCountNeg1,
      zero: thirtyDayCount0,
      one: thirtyDayCount1,
      two: thirtyDayCount2,
      cloud: thirtyDayWordcloud,
    },
    "60": {
      avg: sixtyDayAvg,
      neg2: sixtyDayCountNeg2,
      neg1: sixtyDayCountNeg1,
      zero: sixtyDayCount0,
      one: sixtyDayCount1,
      two: sixtyDayCount2,
      cloud: sixtyDayWordcloud,
    },
    "90": {
      avg: ninetyDayAvg,
      neg2: ninetyDayCountNeg2,
      neg1: ninetyDayCountNeg1,
      zero: ninetyDayCount0,
      one: ninetyDayCount1,
      two: ninetyDayCount2,
      cloud: ninetyDayWordcloud,
    },
    "365": {
      avg: yearAvg,
      neg2: yearCountNeg2,
      neg1: yearCountNeg1,
      zero: yearCount0,
      one: yearCount1,
      two: yearCount2,
      cloud: yearWordcloud,
    },
  }
}

export { splitDashboardData }
