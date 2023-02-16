import { Field, ID, ObjectType } from "type-graphql"

@ObjectType()
class User {
  @Field(() => ID)
  id!: string

  @Field(() => String, { nullable: true })
  full_name?: string

  @Field(() => String)
  email!: string

  @Field(() => String)
  username!: string

  @Field(() => String)
  password!: string
}

export { User }
