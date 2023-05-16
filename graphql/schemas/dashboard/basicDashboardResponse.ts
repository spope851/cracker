import { PsqlError } from "@/graphql/error"
import { Field, Int, ObjectType } from "type-graphql"
import { Text } from "./nlp"
import { Track } from "../track"

@ObjectType()
class BasicWord {
  @Field(() => Text, { nullable: true })
  text?: Text | null

  @Field(() => [Track], { nullable: true })
  mentions?: Track[] | null
}

@ObjectType()
class Word {
  @Field(() => BasicWord!)
  word!: BasicWord

  @Field(() => Int!)
  count!: number

  @Field()
  hide!: boolean
}

@ObjectType()
class BasicSentence extends Track {
  @Field(() => Text, { nullable: true })
  text?: Text | null
}

@ObjectType()
class BasicDashboard {
  @Field(() => [BasicSentence])
  sentences?: BasicSentence[]

  @Field(() => [Word])
  words?: Word[]
}

@ObjectType()
class BasicDashboardResponse {
  @Field(() => BasicDashboard, { nullable: true })
  dashboard?: BasicDashboard

  @Field(() => [PsqlError], { nullable: true })
  errors?: PsqlError[]
}

export { BasicDashboardResponse, BasicDashboard }
