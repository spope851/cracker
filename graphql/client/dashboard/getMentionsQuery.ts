import { graphql } from "@/generated"

export const GET_MENTIONS_QUERY = graphql(`
  query GetWordMentions($mentions: [Int!]!) {
    getWordMentions(mentions: $mentions) {
      mentions {
        id
        overview
        numberCreativeHours
        rating
        createdAt
      }
    }
  }
`)
