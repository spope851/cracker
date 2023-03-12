import { graphql } from "@/generated"

export const TRACKER_MUTATION = graphql(`
  mutation TrackerMutation($tracker: TrackerInput!) {
    track(tracker: $tracker) {
      errors {
        message
        field
      }
      track {
        numberCreativeHours
        overview
        rating
        user
        id
      }
    }
  }
`)
