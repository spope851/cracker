import { ObjectType, Field } from "type-graphql"
import { PartOfSpeech, Text } from "."
import { google } from "@google-cloud/language/build/protos/protos"

@ObjectType()
class Token {
  @Field(() => PartOfSpeech, { nullable: true })
  partOfSpeech?: google.cloud.language.v1.PartOfSpeech | null

  @Field(() => Text, { nullable: true })
  text?: Text | null
}

export { Token }
