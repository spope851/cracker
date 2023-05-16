import { Entity, Token, PartOfSpeech } from "@/generated/graphql"

type FilteredToken = {
  token: Token
  count: number
  hide: boolean
}

type TagCount = { tag: PartOfSpeech["tag"]; count: number }

type FilteredEntity = {
  entity: Entity
  count: number
  hide: boolean
}

export type { FilteredToken, TagCount, FilteredEntity }
