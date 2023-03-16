import { graphql } from "@/generated"

export const TODAYS_POST_QUERY = graphql(`
  query Query($user: Int!) {
    todaysPost(user: $user) {
      overview
      numberCreativeHours
      rating
    }
  }
`)
