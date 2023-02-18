import { Field, InputType } from "type-graphql"

@InputType()
class UserInput {
  @Field(() => String, { nullable: true })
  full_name?: string

  @Field(() => String)
  email!: string

  @Field(() => String)
  username!: string

  @Field(() => String)
  password!: string
}

export { UserInput }
