type RunningAverage = "30" | "60" | "90" | "365"

type SentenceTableSortColumn = "sentence" | "hours" | "rating" | "date"

type WordTableSortColumn = "count" | "word"

type SortDir = "asc" | "desc"

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
  cachedPremium: string | null
  premiumRunningAvg: RunningAverage | null
  analyzeEntities: string | null
  tokenTags: string | null
  minTokenCount: string | null
  minEntityCount: string | null
  sentenceTerms: string | null
  hiddenTokens: string | null
  hiddenEntities: string | null
  sentencesRating: string | null
  basicRunningAvg: RunningAverage | null
  minWordCount: string | null
  basicSentencesRating: string | null
  hiddenWords: string | null
  basicSentenceTerms: string | null
  basicPreQueryRating: string | null
  basicPreQueryMinHours: string | null
  basicPreQueryMaxHours: string | null
  basicPostQueryMinHours: string | null
  basicPostQueryMaxHours: string | null
  basicWordSortColumn: WordTableSortColumn | null
  basicWordSortDir: SortDir | null
  basicSentenceSortColumn: SentenceTableSortColumn | null
  basicSentenceSortDir: SortDir | null
}

export type {
  PgDashboardMetrics,
  RunningAverage,
  DashboardFilters,
  WordTableSortColumn,
  SentenceTableSortColumn,
  SortDir,
}
