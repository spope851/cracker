import { graphql } from "@/generated"

export const BASIC_DASBOARD_WORDS_QUERY = graphql(`
  query BasicDashboardWords(
    $runningAvg: String!
    $maxHours: Float
    $minHours: Float
    $rating: [Int!]
    $sortColumn: String
    $sortDir: String
  ) {
    basicDashboardWords(
      runningAvg: $runningAvg
      maxHours: $maxHours
      minHours: $minHours
      rating: $rating
      sortColumn: $sortColumn
      sortDir: $sortDir
    ) {
      words {
        word {
          text {
            content
          }
          mentions
        }
        count
        hide
      }
    }
  }
`)
