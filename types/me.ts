interface PgMe {
  _id: string
  _email: string
  _role: number
  _username: string
  _last_post_id: string | null
  _last_post_overview: string | null
  _last_post_hours: number | null
  _last_post_rating: number | null
  _last_post_date: string | null
}

export type { PgMe }
