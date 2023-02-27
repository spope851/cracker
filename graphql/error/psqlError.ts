import { Field, ObjectType } from "type-graphql"

@ObjectType()
class PsqlError {
  @Field(() => String)
  field!: string

  @Field(() => String)
  message!: string
}

export { PsqlError }
