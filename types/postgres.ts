import { Track } from "@/graphql/schemas/track"

interface PgQueryResponse<T> {
  rows: T[]
}

type PgTrackerRow = Omit<Track, "numberCreativeHours"> & {
  number_creative_hours: string
}

interface PgQueryError {
  code: string
  detail: string
}

export type { PgTrackerRow, PgQueryError, PgQueryResponse }
