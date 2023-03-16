import { Field, ObjectType } from "type-graphql"
import { Track } from "./track"

@ObjectType()
class TodaysPost extends Track {
  @Field(() => String)
  createdAt!: string
}

export { TodaysPost }
