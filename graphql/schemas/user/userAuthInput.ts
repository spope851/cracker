import { InputType, Field } from "type-graphql"

@InputType()
export class UserAuthInput {
  @Field(() => String)
  token!: string

  @Field(() => String)
  id!: string
}
