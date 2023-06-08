import { graphql } from "@/generated"

export const BASIC_DASBOARD_SENTENCES_QUERY = graphql(`
  query BasicDashboardSentences(
    $runningAvg: String!
    $maxHours: Float
    $minHours: Float
    $rating: [Int!]
    $sortColumn: String
    $sortDir: String
  ) {
    basicDashboardSentences(
      runningAvg: $runningAvg
      maxHours: $maxHours
      minHours: $minHours
      rating: $rating
      sortColumn: $sortColumn
      sortDir: $sortDir
    ) {
      sentences {
        id
        overview
        numberCreativeHours
        rating
        createdAt
        user
        text {
          content
        }
      }
    }
  }
`)
