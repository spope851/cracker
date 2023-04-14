import { ObjectType, Field, Float } from "type-graphql"

@ObjectType()
class Sentiment {
  @Field(() => Float, { nullable: true })
  magnitude?: number | null

  @Field(() => Float, { nullable: true })
  score?: number | null
}

export { Sentiment }
