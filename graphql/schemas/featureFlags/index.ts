import { Field, ID, Int, ObjectType } from "type-graphql"

@ObjectType()
class FeatureFlag {
  @Field(() => ID)
  id!: string

  @Field(() => String)
  name!: string

  @Field(() => String)
  description!: string

  @Field(() => Boolean)
  isEnabled!: boolean

  @Field(() => Int, { nullable: true })
  requiredRole?: number | null
}

export { FeatureFlag }
