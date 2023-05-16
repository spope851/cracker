import { ObjectType, Field } from "type-graphql"
import { google } from "@google-cloud/language/build/protos/protos"

@ObjectType()
class PartOfSpeech {
  @Field(() => String, { nullable: true })
  tag?: google.cloud.language.v1.PartOfSpeech.Tag | null
}

export { PartOfSpeech }
