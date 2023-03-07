import { Field, ObjectType } from "type-graphql"
import { UserInfo } from "./userInfo"

@ObjectType()
class GetUserResponse {
  @Field(() => UserInfo, { nullable: true })
  user?: UserInfo

  @Field(() => String, { nullable: true })
  error?: string
}

export { GetUserResponse }
