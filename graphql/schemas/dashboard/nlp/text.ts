import { ObjectType, Field, Int } from "type-graphql"

@ObjectType()
class Text {
  @Field(() => String, { nullable: true })
  content?: string | null

  @Field(() => Int, { nullable: true })
  beginOffset?: number | null
}

export { Text }
