import { Field, ObjectType } from "type-graphql"

@ObjectType()
class UserError {
  @Field(() => String)
  field!: string

  @Field(() => String)
  message!: string
}

export { UserError }
