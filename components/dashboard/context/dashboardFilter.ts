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
import { RunningAverage } from "@/types"

type DashboardFilterContextProps = {
  // TODO: move premium to global dashboard context
  premium: boolean
  // PREMIUM FEATURES
  runningAvg: RunningAverage
  setRunningAvg: Dispatch<SetStateAction<RunningAverage>>
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
  loadingBasic: boolean
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
  sentencesRating: number | ""
  setSentencesRating: Dispatch<SetStateAction<number | "">>
  findSentence: (content?: string | null) => Track | null | undefined
  sentenceTerms: string[]
  addSentenceTerm: (term?: string | null) => void
  removeSentenceTerm: (term: string) => void
  // BASIC FEATURES
  basicWords?: Word[]
  basicSentences?: BasicSentence[]
  minWordCount: [number, Dispatch<SetStateAction<number>>]
  basicSentencesRating: [number | "", Dispatch<SetStateAction<number | "">>]
  hideWord: (hide: boolean, word: string) => void
  basicSentenceTerms: string[]
}

export const DashboardFilterContext = createContext<DashboardFilterContextProps>(
  {} as DashboardFilterContextProps
)
