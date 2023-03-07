import { Field, ObjectType } from "type-graphql"
import { User } from "../user"

@ObjectType()
export class UserInfo extends User {
  @Field(() => String!)
  lastPost!: string
}
