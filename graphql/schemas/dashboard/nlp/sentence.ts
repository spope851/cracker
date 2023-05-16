import { ObjectType, Field } from "type-graphql"
import { Sentiment, Text } from "."

@ObjectType()
class Sentence {
  @Field(() => Sentiment, { nullable: true })
  sentiment?: Sentiment | null

  @Field(() => Text, { nullable: true })
  text?: Text | null
}

export { Sentence }
