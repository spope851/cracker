import { graphql } from "@/generated"

export const BASIC_DASBOARD_SENTENCES_QUERY = graphql(`
  query BasicDashboardSentences($args: BasicDashboardInput!) {
    basicDashboardSentences(args: $args) {
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
