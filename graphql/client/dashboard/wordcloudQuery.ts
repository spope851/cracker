import { graphql } from "@/generated"

export const WORDCLOUD_QUERY = graphql(`
  query WordcloudQuery($user: Int!) {
    dashboard(user: $user) {
      dashboard {
        thirtyDayWordcloud
        sixtyDayWordcloud
        ninetyDayWordcloud
        yearWordcloud
      }
    }
  }
`)
