import { Field, Float, InputType, Int } from "type-graphql"
import { TrackerInput } from "./trackerInput"

@InputType()
class UploadTrackerInput extends TrackerInput {
  @Field(() => String)
  createdAt!: string
}

export { UploadTrackerInput }
