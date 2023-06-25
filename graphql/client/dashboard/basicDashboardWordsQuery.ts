import { graphql } from "@/generated"

export const BASIC_DASBOARD_WORDS_QUERY = graphql(`
  query BasicDashboardWords($args: BasicDashboardInput!) {
    basicDashboardWords(args: $args) {
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
