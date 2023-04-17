import { PsqlError } from "@/graphql/error"
import { Field, ObjectType } from "type-graphql"
import { DashboardMetrics } from "./dashboardMetrics"

@ObjectType()
class DashboardMetricsResponse {
  @Field(() => DashboardMetrics, { nullable: true })
  dashboardMetrics?: DashboardMetrics

  @Field(() => [PsqlError], { nullable: true })
  errors?: PsqlError[]
}

export { DashboardMetricsResponse }
