import { graphql } from "@/generated"

export const ME_QUERY = graphql(`
  query Me($user: UserAuthInput!, $refetch: Boolean) {
    me(user: $user, refetch: $refetch) {
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
