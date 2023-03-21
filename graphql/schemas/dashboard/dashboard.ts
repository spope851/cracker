import { Field, Float, Int, ObjectType } from "type-graphql"

@ObjectType()
class Dashboard {
  @Field(() => Int)
  daysOfUse!: number
  @Field(() => Float)
  thirtyDayAvg!: number
  @Field(() => Float)
  sixtyDayAvg!: number
  @Field(() => Float)
  ninetyDayAvg!: number
  @Field(() => Float)
  yearAvg!: number
  @Field(() => Int)
  thirtyDayCountNeg2!: number
  @Field(() => Int)
  thirtyDayCountNeg1!: number
  @Field(() => Int)
  thirtyDayCount0!: number
  @Field(() => Int)
  thirtyDayCount1!: number
  @Field(() => Int)
  thirtyDayCount2!: number
  @Field(() => Int)
  sixtyDayCountNeg2!: number
  @Field(() => Int)
  sixtyDayCountNeg1!: number
  @Field(() => Int)
  sixtyDayCount0!: number
  @Field(() => Int)
  sixtyDayCount1!: number
  @Field(() => Int)
  sixtyDayCount2!: number
  @Field(() => Int)
  ninetyDayCountNeg2!: number
  @Field(() => Int)
  ninetyDayCountNeg1!: number
  @Field(() => Int)
  ninetyDayCount0!: number
  @Field(() => Int)
  ninetyDayCount1!: number
  @Field(() => Int)
  ninetyDayCount2!: number
  @Field(() => Int)
  yearCountNeg2!: number
  @Field(() => Int)
  yearCountNeg1!: number
  @Field(() => Int)
  yearCount0!: number
  @Field(() => Int)
  yearCount1!: number
  @Field(() => Int)
  yearCount2!: number
  @Field(() => String)
  thirtyDayWordcloud!: string
  @Field(() => String)
  sixtyDayWordcloud!: string
  @Field(() => String)
  ninetyDayWordcloud!: string
  @Field(() => String)
  yearWordcloud!: string
}

export { Dashboard }
