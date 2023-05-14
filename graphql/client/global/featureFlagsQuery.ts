import { graphql } from "@/generated"
export const FEATURE_FLAGS_QUERY = graphql(`
  query FeatureFlags {
    featureFlags {
      id
      name
      description
      isEnabled
      requiredRole
    }
  }
`)
