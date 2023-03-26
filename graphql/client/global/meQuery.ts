import { graphql } from "@/generated"

export const ME_QUERY = graphql(`
  query Me($user: UserAuthInput!, $refetch: Boolean) {
    me(user: $user, refetch: $refetch) {
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
