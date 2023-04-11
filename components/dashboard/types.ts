type Sentiment = {
  magnitude: number
  score: number
}

type Text = {
  content: string
  beginOffset: number
}

type PartOfSpeech = {
  tag: Tag
}

type Token = {
  partOfSpeech: PartOfSpeech
  text: Text
}

type FilteredToken = {
  token: Token
  count: number
  hide: boolean
}

type Tag =
  | "ADJ"
  | "VERB"
  | "NOUN"
  | "ADV"
  | "ADP"
  | "PRON"
  | "CONJ"
  | "DET"
  | "NUM"
  | "PRT"
  | "PUNCT"

type TagCount = { tag: Tag; count: number }

type FilteredEntity = {
  entity: Entity
  count: number
  hide: boolean
}

type Mentions = {
  sentiment: Sentiment
  text: Text
}

type Entity = {
  sentiment: Sentiment
  mentions: Mentions[]
  name: string
  salience: number
}

type Sentence = {
  sentiment: Sentiment
  text: Text
}

export type {
  Sentiment,
  Text,
  FilteredToken,
  Tag,
  TagCount,
  Token,
  FilteredEntity,
  Entity,
  Sentence,
}
