import { graphql } from "@/generated"

export const WORDCLOUD_QUERY = graphql(`
  query WordcloudQuery {
    dashboard {
      dashboard {
        thirtyDayWordcloud
        sixtyDayWordcloud
        ninetyDayWordcloud
        yearWordcloud
      }
    }
  }
`)
