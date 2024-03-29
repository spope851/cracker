import { PsqlError } from "@/graphql/error"
import { Field, ObjectType } from "type-graphql"
import { User } from "../user"

@ObjectType()
class RegisterResponse {
  @Field(() => User, { nullable: true })
  user?: User

  @Field(() => [PsqlError], { nullable: true })
  errors?: PsqlError[]
}

export { RegisterResponse }
