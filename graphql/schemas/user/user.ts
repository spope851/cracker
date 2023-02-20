import { Field, ID, ObjectType } from "type-graphql"

@ObjectType()
class User {
  @Field(() => ID)
  id!: string

  @Field(() => String)
  email!: string

  @Field(() => String)
  username!: string

  password?: string
}

export { User }
