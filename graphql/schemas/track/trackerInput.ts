import { Field, Float, InputType, Int } from "type-graphql"

@InputType()
class TrackerInput {
  @Field(() => String)
  overview!: string

  @Field(() => Float)
  numberCreativeHours!: number

  @Field(() => Int)
  rating!: number

  @Field(() => String)
  user!: string
}

export { TrackerInput }
