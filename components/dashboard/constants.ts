import { PartOfSpeech } from "@/generated/graphql"

const defaultTags: PartOfSpeech["tag"][] = [
  "ADJ",
  "VERB",
  "NOUN",
  "ADV",
  "ADP",
  "PRON",
  "CONJ",
  "DET",
  "NUM",
  "PRT",
  "PUNCT",
]

const POPOVER_WIDTH = 300

export { defaultTags, POPOVER_WIDTH }
