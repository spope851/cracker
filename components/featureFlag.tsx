import {
  FeatureFlagsContext,
  FeatureFlagsContextProps,
} from "@/context/featureFlagsContext"
import { UserContext } from "@/context/userContext"
import { ReactNode, useContext } from "react"

export const FeatureFlag: React.FC<{
  children: ReactNode
  name: keyof FeatureFlagsContextProps
}> = ({ children, name }) => {
  const featureFlags = useContext(FeatureFlagsContext)
  const {
    user: { role },
  } = useContext(UserContext)
  if (!!featureFlags[name].requiredRole && !role) return <></>
  else {
    const allowedRole = featureFlags[name].requiredRole
      ? role && role >= featureFlags[name].requiredRole!
      : true
    return <>{featureFlags[name].isEnabled && allowedRole && children}</>
  }
}
