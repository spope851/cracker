interface PgQueryResponse {
  rows: { id: string }[]
}

interface PgQueryError {
  code: string
  detail: string
}

export type { PgQueryResponse, PgQueryError }
