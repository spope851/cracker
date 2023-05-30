import { Track } from "@/graphql/schemas/track"

interface PgQueryResponse<T> {
  rowCount: number
  rows: T[]
}

type PgTrackerRow = Omit<Track, "numberCreativeHours"> & {
  number_creative_hours: string
  created_at: string
}

interface PgQueryError {
  code: string
  detail: string
}

type PgBasicWord = { word: string; count: string; days_used: number[] }

type PgBasicSentence = {
  sentence: string
  rating: number
  number_creative_hours: string
  created_at: string
  overview: string
}

export type {
  PgTrackerRow,
  PgQueryError,
  PgQueryResponse,
  PgBasicWord,
  PgBasicSentence,
}
