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

type FilteredEntity = {
  entity: Entity
  count: number
  hide: boolean
}

type Entity = {
  sentiment: Sentiment
  mentions: any[]
  name: string
  salience: number
}

export type { Sentiment, Text, FilteredToken, Tag, Token, FilteredEntity, Entity }
