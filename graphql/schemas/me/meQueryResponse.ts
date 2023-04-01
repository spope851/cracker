import { Field, ObjectType } from "type-graphql"
import { Me } from "./me"

@ObjectType()
class MeQueryResponse {
  @Field(() => Me, { nullable: true })
  me?: Me

  @Field(() => String, { nullable: true })
  error?: string
}

export { MeQueryResponse }
