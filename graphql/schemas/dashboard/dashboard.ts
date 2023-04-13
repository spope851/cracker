import { Field, Float, Int, ObjectType } from "type-graphql"

@ObjectType()
class DashboardMetrics {
  @Field(() => Int)
  daysOfUse!: number
  @Field(() => Float)
  avgHours!: number
  @Field(() => Int)
  countNegOne!: number
  @Field(() => Int)
  countNegTwo!: number
  @Field(() => Int)
  countZero!: number
  @Field(() => Int)
  countPlusOne!: number
  @Field(() => Int)
  countPlusTwo!: number
  @Field(() => String)
  overviews!: string
}

export { DashboardMetrics }
