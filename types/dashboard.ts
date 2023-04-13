type RunningAverage = "30" | "60" | "90" | "365"

interface PgDashboard {
  _days_of_use: number
  _avg_hours: number
  _count_neg_two: number
  _count_neg_one: number
  _count_zero: number
  _count_plus_one: number
  _count_plus_two: number
  _overviews: string
}

type Ratings = {
  countNegTwo: number
  countNegOne: number
  countZero: number
  countPlusOne: number
  countPlusTwo: number
}

export type { PgDashboard, RunningAverage, Ratings }
