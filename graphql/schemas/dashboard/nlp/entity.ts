import { ObjectType, Field, Float } from "type-graphql"
import { Sentence, Sentiment } from "."

@ObjectType()
class Entity {
  @Field(() => Sentiment, { nullable: true })
  sentiment?: Sentiment | null

  @Field(() => [Sentence], { nullable: true })
  mentions?: Sentence[] | null

  @Field(() => String, { nullable: true })
  name?: string | null

  @Field(() => Float, { nullable: true })
  salience?: number | null
}

export { Entity }
