import { NextComponentType, NextPageContext } from "next"

/**
 * Authentication configuration
 */
export interface AuthEnabledComponentConfig {
  auth?: {
    role: number
    redirect: string
  }
}

/**
 * A component with authentication configuration
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ComponentWithAuth<PropsType = any> = React.FC<PropsType> &
  AuthEnabledComponentConfig

export type NextComponentWithAuth = NextComponentType<NextPageContext, any, {}> &
  Partial<AuthEnabledComponentConfig>
