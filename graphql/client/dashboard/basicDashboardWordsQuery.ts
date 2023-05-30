import { graphql } from "@/generated"

export const BASIC_DASBOARD_WORDS_QUERY = graphql(`
  query BasicDashboardWords($runningAvg: String!) {
    basicDashboardWords(runningAvg: $runningAvg) {
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
