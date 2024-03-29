import { PsqlError } from "@/graphql/error"
import { Field, ObjectType } from "type-graphql"
import { Track } from "../track"
import { Entity, Sentence, Token } from "./nlp"
import { google } from "@google-cloud/language/build/protos/protos"

type IToken = google.cloud.language.v1.IToken

@ObjectType()
class Dashboard {
  @Field(() => [Track])
  rawData!: Track[]

  @Field(() => [Sentence], { nullable: true })
  sentences?: Sentence[] | null

  @Field(() => [Entity], { nullable: true })
  entities?: Entity[] | null

  @Field(() => [Token], { nullable: true })
  tokens?: IToken[] | null
}

@ObjectType()
class PremiumDashboardResponse {
  @Field(() => Dashboard, { nullable: true })
  dashboard?: Dashboard

  @Field(() => [PsqlError], { nullable: true })
  errors?: PsqlError[]
}

export { PremiumDashboardResponse, Dashboard }
