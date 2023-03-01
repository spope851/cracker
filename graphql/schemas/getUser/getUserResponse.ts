import { Field, ObjectType } from "type-graphql"
import { User } from "../user"

@ObjectType()
class GetUserResponse {
  @Field(() => User, { nullable: true })
  user?: User

  @Field(() => String, { nullable: true })
  error?: string
}

export { GetUserResponse }
