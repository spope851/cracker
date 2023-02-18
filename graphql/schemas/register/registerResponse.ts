import { Field, ObjectType } from "type-graphql"
import { User, UserError } from "../user"

@ObjectType()
class RegisterResponse {
  @Field(() => User, { nullable: true })
  user?: User

  @Field(() => [UserError], { nullable: true })
  errors?: UserError[]
}

export { RegisterResponse }
