import { graphql } from "@/generated"
export const FEATURE_FLAG_QUERY = graphql(`
  query FeatureFlags {
    featureFlags {
      name
      isEnabled
      requiredRole
    }
  }
`)
