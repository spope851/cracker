import { graphql } from "@/generated"

export const UPDATE_TRACKER_MUTATION = graphql(`
mutation UpdateTracker($tracker: UpdateTrackerInput!) {
  updateTrack(tracker: $tracker) {
    track {
      id
      overview
      numberCreativeHours
      rating
      user
    }
    errors {
      field
      message
    }
  }
}
`)
