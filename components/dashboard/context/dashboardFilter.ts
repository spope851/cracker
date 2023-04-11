import { Track } from "@/generated/graphql"
import type { Ratings } from "@/types"
import { SelectChangeEvent } from "@mui/material"
import { createContext, Dispatch, SetStateAction } from "react"
import type { FilteredEntity, FilteredToken, Sentence, TagCount } from "../types"

type DashboardFilterContextProps = {
  filteredTokens?: FilteredToken[]
  setFilteredTokens: Dispatch<SetStateAction<FilteredToken[] | undefined>>
  tokenTags: string[]
  tokenTagCounts?: TagCount[]
  setTokenTags: Dispatch<SetStateAction<string[]>>
  minTokenCount: number
  setMinTokenCount: Dispatch<SetStateAction<number>>
  loading: boolean
  avgHours: number
  ratings: Ratings
  hideToken: (hide: boolean, idx: number) => void
  findTokens: (content: string) => Track[]
  handleTokenTagsChange: (event: SelectChangeEvent<string[]>) => void
  filteredEntities?: FilteredEntity[]
  hideEntity: (hide: boolean, idx: number) => void
  minEntityCount: number
  setMinEntityCount: Dispatch<SetStateAction<number>>
  filteredSentences?: Sentence[]
  setFilteredSentences: Dispatch<SetStateAction<Sentence[] | undefined>>
  findSentence: (content: string) => Track | undefined
  sentenceTerms: string[]
  addSentenceTerm: (term: string) => void
  removeSentenceTerm: (term: string) => void
}

export const DashboardFilterContext = createContext<DashboardFilterContextProps>(
  {} as DashboardFilterContextProps
)
