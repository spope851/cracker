import { User } from "@/graphql/schemas"
import { Track } from "@/graphql/schemas/track"

interface TrackQueryResponse {
  rows: (Omit<Track, "numberCreativeHours"> & { number_creative_hours: string })[]
}

interface RegisterQueryResponse {
  rows: User[]
}

interface PgQueryError {
  code: string
  detail: string
}

export type { RegisterQueryResponse, PgQueryError, TrackQueryResponse }
