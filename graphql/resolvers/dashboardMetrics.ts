import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { type MyContext } from "@/pages/api/graphql"
import { PgDashboardMetrics, PgQueryError, PgQueryResponse } from "@/types"
import { pool } from "@/utils/postgres"
import { getServerSession } from "next-auth"
import { Arg, Ctx, Query, Resolver } from "type-graphql"
import { DashboardMetrics, DashboardMetricsResponse } from "../schemas/dashboard"
import redis from "@/utils/redis"
import { CACHE_KEYS } from "@/constants"

@Resolver(DashboardMetricsResponse)
export class DashboardMetricsReslover {
  @Query(() => DashboardMetricsResponse)
  async dashboardMetrics(
    @Arg("runningAvg", () => String!) runningAvg: string,
    @Ctx() { req, res }: MyContext
  ): Promise<DashboardMetricsResponse> {
    const {
      user: { id: user },
    } = await getServerSession(req, res, authOptions)

    const cachedMetrics = await redis.get(
      `${CACHE_KEYS.dashboardMetrics}/${user}/${runningAvg}`
    )
    if (cachedMetrics)
      return {
        dashboardMetrics: JSON.parse(cachedMetrics),
      }

    return await pool
      .query(`CALL get_dashboard_metrics($1, $2);`, [user, runningAvg])
      .then(async (res: PgQueryResponse<PgDashboardMetrics>) => {
        const {
          _days_of_use,
          _avg_hours,
          _count_neg_two,
          _count_neg_one,
          _count_zero,
          _count_plus_one,
          _count_plus_two,
        } = res.rows[0]

        const dashboardMetrics: DashboardMetrics = {
          daysOfUse: Number(_days_of_use),
          avgHours: Number(_avg_hours),
          ratings: {
            countNegTwo: Number(_count_neg_two),
            countNegOne: Number(_count_neg_one),
            countZero: Number(_count_zero),
            countPlusOne: Number(_count_plus_one),
            countPlusTwo: Number(_count_plus_two),
          },
        }

        await redis.set(
          `${CACHE_KEYS.dashboardMetrics}/${user}/${runningAvg}`,
          JSON.stringify(dashboardMetrics)
        )
        return { dashboardMetrics }
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
  }
}
