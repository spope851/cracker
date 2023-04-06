import { graphql } from "@/generated"

export const ME_QUERY = graphql(`
  query Me($refetch: Boolean) {
    me(refetch: $refetch) {
      me {
        user {
          email
          username
          role
        }
        lastPost {
          id
          overview
          numberCreativeHours
          rating
          user
          createdAt
        }
      }
    }
  }
`)
