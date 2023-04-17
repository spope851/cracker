type RunningAverage = "30" | "60" | "90" | "365"

interface PgDashboardMetrics {
  _days_of_use: number
  _avg_hours: number
  _count_neg_two: number
  _count_neg_one: number
  _count_zero: number
  _count_plus_one: number
  _count_plus_two: number
}

export type { PgDashboardMetrics, RunningAverage }
