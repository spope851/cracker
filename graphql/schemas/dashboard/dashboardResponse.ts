import { PsqlError } from "@/graphql/error"
import { Field, ObjectType } from "type-graphql"
import { Dashboard } from "./dashboard"

@ObjectType()
class DashboardResponse {
  @Field(() => Dashboard, { nullable: true })
  dashboard?: Dashboard

  @Field(() => [PsqlError], { nullable: true })
  errors?: PsqlError[]
}

export { DashboardResponse }
