import { Field, ObjectType } from "type-graphql"
import { LastPost } from "../track"
import { User } from "../user"

@ObjectType()
export class Me {
  @Field(() => User!)
  user!: User

  @Field(() => LastPost!)
  lastPost!: LastPost
}
