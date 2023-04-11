type RunningAverage = "30" | "60" | "90" | "365"

type DashboardDataset = {
  neg2: number
  neg1: number
  zero: number
  one: number
  two: number
  avg: number
  cloud: string
}

type DashboardDatasets = Record<RunningAverage, DashboardDataset>

interface PgDashboard {
  _days_of_use: number
  _30_day_avg: number
  _60_day_avg: number
  _90_day_avg: number
  _year_avg: number
  _30_day_count_neg_2: number
  _30_day_count_neg_1: number
  _30_day_count_0: number
  _30_day_count_1: number
  _30_day_count_2: number
  _60_day_count_neg_2: number
  _60_day_count_neg_1: number
  _60_day_count_0: number
  _60_day_count_1: number
  _60_day_count_2: number
  _90_day_count_neg_2: number
  _90_day_count_neg_1: number
  _90_day_count_0: number
  _90_day_count_1: number
  _90_day_count_2: number
  _year_count_neg_1: number
  _year_count_neg_2: number
  _year_count_0: number
  _year_count_1: number
  _year_count_2: number
  _30_day_wordcloud: string
  _60_day_wordcloud: string
  _90_day_wordcloud: string
  _year_wordcloud: string
}

type Ratings = { neg2: number; neg1: number; zero: number; one: number; two: number }

export type {
  PgDashboard,
  RunningAverage,
  DashboardDataset,
  DashboardDatasets,
  Ratings,
}
