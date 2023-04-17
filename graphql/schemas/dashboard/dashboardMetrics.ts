import { Field, Float, Int, ObjectType } from "type-graphql"

@ObjectType()
class Ratings {
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
}

@ObjectType()
class DashboardMetrics {
  @Field(() => Int)
  daysOfUse!: number
  @Field(() => Float)
  avgHours!: number
  @Field(() => Ratings)
  ratings!: Ratings
}

export { DashboardMetrics }
