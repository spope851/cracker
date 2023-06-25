import { PartOfSpeech } from "@/generated/graphql"
import {
  RunningAverage,
  SentenceTableSortColumn,
  SortDir,
  WordTableSortColumn,
} from "@/types"

const DEFAULT_TAGS: PartOfSpeech["tag"][] = [
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

const DEFAULT_FILTERS = {
  analyzeEntities: "true",
  premiumRunningAvg: "30" as RunningAverage,
  tokenTags: DEFAULT_TAGS.slice(0, 4),
  minTokenCount: 2,
  minEntityCount: 2,
  basicRunningAvg: "30" as RunningAverage,
  minWordCount: 2,
  basicPreQueryMinHours: 0,
  basicPreQueryMaxHours: 24,
  basicPostQueryMinHours: 0,
  basicPostQueryMaxHours: 24,
  basicWordSortColumn: "count" as WordTableSortColumn,
  basicWordSortDir: "desc" as SortDir,
  basicSentenceSortColumn: "date" as SentenceTableSortColumn,
  basicSentenceSortDir: "desc" as SortDir,
}

export { DEFAULT_TAGS, POPOVER_WIDTH, DEFAULT_FILTERS }
