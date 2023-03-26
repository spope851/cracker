import { Field, ObjectType } from "type-graphql"
import { Track } from "./track"

@ObjectType()
class LastPost extends Track {
  @Field(() => String)
  createdAt!: string
}

export { LastPost }
