import { Field, ObjectType } from "type-graphql"
import { User } from "../user"

@ObjectType()
class UserResponse extends User {
  @Field(() => String!)
  lastPost!: string
}

@ObjectType()
class GetUserResponse {
  @Field(() => UserResponse, { nullable: true })
  user?: UserResponse

  @Field(() => String, { nullable: true })
  error?: string
}

export { GetUserResponse }
