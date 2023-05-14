import { FeatureFlag as FFSchema } from "@/generated/graphql"
import { createContext } from "react"

type FeatureFlag = Partial<FFSchema>

export type FeatureFlagsContextProps = {
  premiumDashboardSwitch: FeatureFlag
  adminDashboardMenuItem: FeatureFlag
}

const defaultFlag = { isEnabled: false, requiredRole: -1 }

export const FeatureFlagsContext = createContext<FeatureFlagsContextProps>({
  premiumDashboardSwitch: defaultFlag,
  adminDashboardMenuItem: defaultFlag,
} as FeatureFlagsContextProps)
