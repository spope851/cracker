import { PsqlError } from "@/graphql/error"
import { Field, Int, ObjectType } from "type-graphql"
import { Text } from "./nlp"
import { Track } from "../track"

@ObjectType()
class BasicWord {
  @Field(() => Text, { nullable: true })
  text?: Text | null

  @Field(() => [Int])
  mentions!: number[]
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
class GetSentences {
  @Field(() => [BasicSentence], { nullable: true })
  sentences?: BasicSentence[]

  @Field(() => [PsqlError], { nullable: true })
  errors?: PsqlError[]
}

@ObjectType()
class GetWords {
  @Field(() => [Word])
  words?: Word[]

  @Field(() => [PsqlError], { nullable: true })
  errors?: PsqlError[]
}

@ObjectType()
class GetMentions {
  @Field(() => [Track])
  mentions?: Track[]

  @Field(() => [PsqlError], { nullable: true })
  errors?: PsqlError[]
}

export { GetWords, GetSentences, Word, BasicSentence, GetMentions }
