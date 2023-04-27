import { PsqlError } from "@/graphql/error"
import { Field, ObjectType } from "type-graphql"

@ObjectType()
class UploadTrackerResponse {
  @Field(() => String, { nullable: true })
  uploaded?: string

  @Field(() => [PsqlError], { nullable: true })
  errors?: PsqlError[]
}

export { UploadTrackerResponse }
