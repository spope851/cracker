import { Field, Float, ID, Int, ObjectType } from "type-graphql"

@ObjectType()
class Track {
  @Field(() => ID)
  id!: string

  @Field(() => String)
  overview!: string

  @Field(() => Float)
  numberCreativeHours!: number

  @Field(() => Int)
  rating!: number

  @Field(() => String, { nullable: true })
  createdAt?: string

  @Field(() => String, { nullable: true })
  user?: string
}

export { Track }
