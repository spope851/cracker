import { DashboardMetrics, PartOfSpeech, Sentence, Track } from "@/generated/graphql"
import { SelectChangeEvent } from "@mui/material"
import { createContext, Dispatch, SetStateAction } from "react"
import type { FilteredEntity, FilteredToken, TagCount } from "../types"

type DashboardFilterContextProps = {
  filteredTokens?: FilteredToken[]
  setFilteredTokens: Dispatch<SetStateAction<FilteredToken[] | undefined>>
  tokenTags: PartOfSpeech["tag"][]
  tokenTagCounts?: TagCount[]
  setTokenTags: Dispatch<SetStateAction<PartOfSpeech["tag"][]>>
  minTokenCount: number
  setMinTokenCount: Dispatch<SetStateAction<number>>
  loading: boolean
  avgHours?: DashboardMetrics["avgHours"]
  setAvgHours: Dispatch<SetStateAction<DashboardMetrics["avgHours"] | undefined>>
  hideToken: (hide: boolean, idx: number) => void
  findTokens: (content?: string | null) => Track[] | undefined
  handleTokenTagsChange: (event: SelectChangeEvent<string[]>) => void
  filteredEntities?: FilteredEntity[]
  hideEntity: (hide: boolean, idx: number) => void
  minEntityCount: number
  setMinEntityCount: Dispatch<SetStateAction<number>>
  filteredSentences?: Sentence[]
  setFilteredSentences: Dispatch<SetStateAction<Sentence[] | undefined>>
  findSentence: (content?: string | null) => Track | null | undefined
  sentenceTerms: string[]
  addSentenceTerm: (term?: string | null) => void
  removeSentenceTerm: (term: string) => void
}

export const DashboardFilterContext = createContext<DashboardFilterContextProps>(
  {} as DashboardFilterContextProps
)
