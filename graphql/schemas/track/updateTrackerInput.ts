import { Field, InputType } from "type-graphql"
import { TrackerInput } from "./trackerInput"

@InputType()
class UpdateTrackerInput extends TrackerInput {
  @Field(() => String)
  id!: string

}

export { UpdateTrackerInput }
