import { graphql } from "@/generated"

export const UPLOAD_TRACKER_MUTATION = graphql(`
  mutation UploadTracker($data: [TrackerInput!]!) {
    uploadTracker(data: $data) {
      uploaded
      errors {
        field
        message
      }
    }
  }
`)
