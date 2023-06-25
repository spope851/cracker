import {
  BasicSentence,
  DashboardMetrics,
  PartOfSpeech,
  Sentence,
  Track,
  Word,
} from "@/generated/graphql"
import { SelectChangeEvent } from "@mui/material"
import { createContext, Dispatch, SetStateAction } from "react"
import type { FilteredEntity, FilteredToken, TagCount } from "../types"
import {
  RunningAverage,
  SentenceTableSortColumn,
  SortDir,
  WordTableSortColumn,
} from "@/types"

type DashboardFilterContextProps = {
  // TODO: move premium to global dashboard context
  premium: [boolean, Dispatch<SetStateAction<boolean>>]
  // PREMIUM FEATURES
  premiumRunningAvg: [RunningAverage, Dispatch<SetStateAction<RunningAverage>>]
  analyzeEntities: boolean
  setAnalyzeEntities: Dispatch<SetStateAction<boolean>>
  daysOfUse?: DashboardMetrics["daysOfUse"]
  setDaysOfUse: Dispatch<SetStateAction<DashboardMetrics["daysOfUse"] | undefined>>
  filteredTokens?: FilteredToken[]
  setFilteredTokens: Dispatch<SetStateAction<FilteredToken[] | undefined>>
  tokenTags: PartOfSpeech["tag"][]
  tokenTagCounts?: TagCount[]
  setTokenTags: Dispatch<SetStateAction<PartOfSpeech["tag"][]>>
  minTokenCount: number
  setMinTokenCount: Dispatch<SetStateAction<number>>
  loadingPremium: boolean
  loadingBasicWords: boolean
  loadingBasicSentences: boolean
  avgHours?: DashboardMetrics["avgHours"]
  setAvgHours: Dispatch<SetStateAction<DashboardMetrics["avgHours"] | undefined>>
  hideToken: (hide: boolean, token: string) => void
  findTokens: (content?: string | null) => Track[] | undefined
  handleTokenTagsChange: (event: SelectChangeEvent<string[]>) => void
  filteredEntities?: FilteredEntity[]
  hideEntity: (hide: boolean, entity: string) => void
  minEntityCount: number
  setMinEntityCount: Dispatch<SetStateAction<number>>
  filteredSentences?: Sentence[]
  setFilteredSentences: Dispatch<SetStateAction<Sentence[] | undefined>>
  sentencesRating: [number[] | null, Dispatch<SetStateAction<number[] | null>>]
  findSentence: (content?: string | null) => Track | null | undefined
  sentenceTerms: string[]
  addSentenceTerm: (term?: string | null) => void
  removeSentenceTerm: (term: string) => void
  // BASIC FEATURES
  basicRunningAvg: [RunningAverage, Dispatch<SetStateAction<RunningAverage>>]
  basicPreQueryRating: [number[] | null, Dispatch<SetStateAction<number[] | null>>]
  basicPreQueryMinHours: [number, Dispatch<SetStateAction<number>>]
  basicPreQueryMaxHours: [number, Dispatch<SetStateAction<number>>]
  basicPostQueryMinHours: [number, Dispatch<SetStateAction<number>>]
  basicPostQueryMaxHours: [number, Dispatch<SetStateAction<number>>]
  basicWords?: Word[]
  basicSentences?: BasicSentence[]
  minWordCount: [number, Dispatch<SetStateAction<number>>]
  basicSentencesRating: [number[] | null, Dispatch<SetStateAction<number[] | null>>]
  hideWord: (hide: boolean, word: string) => void
  basicSentenceTerms: string[]
  basicWordSortColumn: [
    WordTableSortColumn,
    Dispatch<SetStateAction<WordTableSortColumn>>
  ]
  basicWordSortDir: [SortDir, Dispatch<SetStateAction<SortDir>>]
  basicSentenceSortColumn: [
    SentenceTableSortColumn,
    Dispatch<SetStateAction<SentenceTableSortColumn>>
  ]
  basicSentenceSortDir: [SortDir, Dispatch<SetStateAction<SortDir>>]
}

export const DashboardFilterContext = createContext<DashboardFilterContextProps>(
  {} as DashboardFilterContextProps
)
