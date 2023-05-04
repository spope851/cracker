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

type DashboardFilters = {
  runningAvg: RunningAverage | null
  analyzeEntities: string | null
  tokenTags: string | null
  minTokenCount: string | null
  minEntityCount: string | null
  sentenceTerms: string | null
  hiddenTokens: string | null
  hiddenEntities: string | null
  sentencesRating: string | null
  minWordCount: string | null
  basicSentencesRating: string | null
}

export type { PgDashboardMetrics, RunningAverage, DashboardFilters }
