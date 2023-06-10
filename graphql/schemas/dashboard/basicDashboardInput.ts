import { Field, Float, InputType, Int } from "type-graphql"

@InputType()
class BasicDashboardInput {
  @Field(() => String!)
  runningAvg!: string

  @Field(() => [Int], { nullable: true })
  rating?: number[] | null

  @Field(() => Float, { nullable: true })
  minHours?: number | null

  @Field(() => Float, { nullable: true })
  maxHours?: number | null

  @Field(() => String, { nullable: true })
  sortColumn?: string | null

  @Field(() => String, { nullable: true })
  sortDir?: string | null
}

export { BasicDashboardInput }
