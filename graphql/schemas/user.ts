import { Field, ID, ObjectType } from "type-graphql"

@ObjectType()
class User {
  @Field(() => ID, { nullable: true })
  id!: string

  @Field(() => String, { nullable: true })
  full_name?: string

  @Field(() => String)
  email!: string

  @Field(() => String)
  username!: string

  password!: string
}

export { User }
