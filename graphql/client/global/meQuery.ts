import { graphql } from "@/generated"

export const ME_QUERY = graphql(`
  query Me($refetch: Boolean) {
    me(refetch: $refetch) {
      error
      user {
        email
        id
        role
        username
        lastPost
      }
    }
  }
`)
