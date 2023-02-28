import { PgDashboard, PgQueryError, PgQueryResponse } from "@/types"
import { pool } from "@/utils/postgres"
import { Arg, Int, Query, Resolver } from "type-graphql"
import { DashboardResponse } from "../schemas/dashboard"

@Resolver(DashboardResponse)
export class DashboardReslover {
  @Query(() => DashboardResponse)
  async dashboard(@Arg("user", () => Int) user: number): Promise<DashboardResponse> {
    const dashboardData: Promise<DashboardResponse> = await pool
      .query(`CALL get_user_dashboard($1);`, [user])
      .then((res: PgQueryResponse<PgDashboard>) => {
        const {
          _30_day_avg,
          _60_day_avg,
          _90_day_avg,
          _year_avg,
          _30_day_count_neg_2,
          _30_day_count_neg_1,
          _30_day_count_0,
          _30_day_count_1,
          _30_day_count_2,
          _60_day_count_neg_2,
          _60_day_count_neg_1,
          _60_day_count_0,
          _60_day_count_1,
          _60_day_count_2,
          _90_day_count_neg_2,
          _90_day_count_neg_1,
          _90_day_count_0,
          _90_day_count_1,
          _90_day_count_2,
          _year_count_neg_1,
          _year_count_neg_2,
          _year_count_0,
          _year_count_1,
          _year_count_2,
          _30_day_wordcloud,
          _60_day_wordcloud,
          _90_day_wordcloud,
          _year_wordcloud,
        } = res.rows[0]

        return {
          dashboard: {
            thirtyDayAvg: Number(_30_day_avg),
            sixtyDayAvg: Number(_60_day_avg),
            ninetyDayAvg: Number(_90_day_avg),
            yearAvg: Number(_year_avg),
            thirtyDayCountNeg2: Number(_30_day_count_neg_2),
            thirtyDayCountNeg1: Number(_30_day_count_neg_1),
            thirtyDayCount0: Number(_30_day_count_0),
            thirtyDayCount1: Number(_30_day_count_1),
            thirtyDayCount2: Number(_30_day_count_2),
            sixtyDayCountNeg2: Number(_60_day_count_neg_2),
            sixtyDayCountNeg1: Number(_60_day_count_neg_1),
            sixtyDayCount0: Number(_60_day_count_0),
            sixtyDayCount1: Number(_60_day_count_1),
            sixtyDayCount2: Number(_60_day_count_2),
            ninetyDayCountNeg2: Number(_90_day_count_neg_2),
            ninetyDayCountNeg1: Number(_90_day_count_neg_1),
            ninetyDayCount0: Number(_90_day_count_0),
            ninetyDayCount1: Number(_90_day_count_1),
            ninetyDayCount2: Number(_90_day_count_2),
            yearCountNeg2: Number(_year_count_neg_1),
            yearCountNeg1: Number(_year_count_neg_2),
            yearCount0: Number(_year_count_0),
            yearCount1: Number(_year_count_1),
            yearCount2: Number(_year_count_2),
            thirtyDayWordcloud: _30_day_wordcloud,
            sixtyDayWordcloud: _60_day_wordcloud,
            ninetyDayWordcloud: _90_day_wordcloud,
            yearWordcloud: _year_wordcloud,
          },
        }
      })
      .catch((e: PgQueryError) => {
        console.log(e)
        return {
          errors: [
            {
              field: "unknown",
              message: "unhandled error",
            },
          ],
        }
      })
    return dashboardData
  }
}
