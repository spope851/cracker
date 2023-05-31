import { graphql } from "@/generated"

export const BASIC_DASBOARD_SENTENCES_QUERY = graphql(`
  query BasicDashboardSentences(
    $runningAvg: String!
    $maxHours: Float
    $minHours: Float
    $rating: [Int!]
  ) {
    basicDashboardSentences(
      runningAvg: $runningAvg
      maxHours: $maxHours
      minHours: $minHours
      rating: $rating
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
