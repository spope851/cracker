import { graphql } from "@/generated"

export const DASBOARD_QUERY = graphql(`
  query DashboardQuery($user: Int!) {
    dashboard(user: $user) {
      dashboard {
        thirtyDayAvg
        sixtyDayAvg
        ninetyDayAvg
        yearAvg
        thirtyDayCountNeg2
        thirtyDayCountNeg1
        thirtyDayCount0
        thirtyDayCount1
        thirtyDayCount2
        sixtyDayCountNeg2
        sixtyDayCountNeg1
        sixtyDayCount0
        sixtyDayCount1
        sixtyDayCount2
        ninetyDayCountNeg2
        ninetyDayCountNeg1
        ninetyDayCount0
        ninetyDayCount1
        ninetyDayCount2
        yearCountNeg2
        yearCountNeg1
        yearCount0
        yearCount1
        yearCount2
        thirtyDayWordcloud
        sixtyDayWordcloud
        ninetyDayWordcloud
        yearWordcloud
      }
    }
  }
`)
