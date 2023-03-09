import { graphql } from "@/generated"

export const REGISTER_MUTATION = graphql(`
  mutation RegisterMutation($user: UserInput!) {
    register(user: $user) {
      errors {
        field
        message
      }
      user {
        username
      }
    }
  }
`)
