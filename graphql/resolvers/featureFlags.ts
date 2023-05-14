import { PgQueryResponse } from "@/types"
import { pool } from "@/utils/postgres"
import { Query, Resolver } from "type-graphql"
import { FeatureFlag } from "../schemas"

@Resolver()
class FeatureFlagsResolver {
  @Query(() => [FeatureFlag])
  async featureFlags(): Promise<FeatureFlag[]> {
    const query: Promise<
      PgQueryResponse<{
        id: number
        name: string
        description: string
        is_enabled: string
        required_role: number | null
      }>
    > = await pool.query(`SELECT * from feature_flags;`)

    return (await query).rows.map(
      ({ id, name, description, is_enabled, required_role }) => {
        return {
          id: id.toString(),
          name,
          description,
          isEnabled: Boolean(Number(is_enabled)),
          requiredRole: required_role,
        }
      }
    )
  }
}

export { FeatureFlagsResolver }
