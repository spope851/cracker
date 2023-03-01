import { User } from "@/graphql/schemas"

interface PgQueryResponse {
  rows: User[]
}

interface PgQueryError {
  code: string
  detail: string
}

export type { PgQueryResponse, PgQueryError }
