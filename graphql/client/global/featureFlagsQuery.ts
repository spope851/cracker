import { graphql } from "@/generated"
export const FEATURE_FLAGS_QUERY = graphql(`
  query FeatureFlags {
    featureFlags {
      name
      isEnabled
      requiredRole
    }
  }
`)
