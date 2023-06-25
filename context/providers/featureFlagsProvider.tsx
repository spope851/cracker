import { FEATURE_FLAG_QUERY } from "@/graphql/client"
import { useQuery } from "@apollo/client"
import React, { useMemo } from "react"
import { FeatureFlagsContext } from "../featureFlagsContext"
import { FeatureFlagsContextProps } from "../featureFlagsContext"

export const FeatureFlagsContextProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const { loading, data } = useQuery(FEATURE_FLAG_QUERY)

  const contextValue = useMemo(() => {
    const featureFlagsContextProps = {} as FeatureFlagsContextProps
    data?.featureFlags.forEach(({ name, isEnabled, requiredRole }) => {
      featureFlagsContextProps[name as keyof FeatureFlagsContextProps] = {
        isEnabled,
        requiredRole,
      }
    })
    return featureFlagsContextProps
  }, [data])

  if (loading || !data) return <>{children}</>

  return (
    <FeatureFlagsContext.Provider value={contextValue}>
      {children}
    </FeatureFlagsContext.Provider>
  )
}
