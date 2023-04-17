import { graphql } from "@/generated"

export const DASBOARD_QUERY = graphql(`
  query DashboardQuery($runningAvg: String!) {
    dashboard(runningAvg: $runningAvg) {
      dashboard {
        rawData {
          id
          overview
          numberCreativeHours
          rating
          user
          createdAt
        }
        sentences {
          sentiment {
            magnitude
            score
          }
          text {
            content
            beginOffset
          }
        }
        entities {
          sentiment {
            magnitude
            score
          }
          mentions {
            sentiment {
              magnitude
              score
            }
            text {
              content
              beginOffset
            }
          }
          name
          salience
        }
        tokens {
          partOfSpeech {
            tag
          }
          text {
            content
            beginOffset
          }
        }
      }
    }
  }
`)
