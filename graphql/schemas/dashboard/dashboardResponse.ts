import { PsqlError } from "@/graphql/error"
import { Field, ObjectType } from "type-graphql"
import { Track } from "../track"
import { DashboardMetrics } from "./dashboard"

@ObjectType()
class Dashboard {
  @Field(() => DashboardMetrics)
  dashboardMetrics!: DashboardMetrics

  @Field(() => [Track])
  rawData!: Track[]
}

@ObjectType()
class DashboardResponse {
  @Field(() => Dashboard, { nullable: true })
  dashboard?: Dashboard

  @Field(() => [PsqlError], { nullable: true })
  errors?: PsqlError[]
}

export { DashboardResponse, Dashboard }
