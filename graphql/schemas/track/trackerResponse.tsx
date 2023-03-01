import { PsqlError } from "@/graphql/error"
import { Field, ObjectType } from "type-graphql"
import { Track } from "./track"

@ObjectType()
class TrackerResponse {
  @Field(() => Track, { nullable: true })
  track?: Track

  @Field(() => [PsqlError], { nullable: true })
  errors?: PsqlError[]
}

export { TrackerResponse }
