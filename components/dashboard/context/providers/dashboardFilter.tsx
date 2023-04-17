import { DashboardMetrics, PartOfSpeech, Sentence } from "@/generated/graphql"
import { SelectChangeEvent } from "@mui/material"
import React, { ReactNode, useEffect, useState } from "react"
import { defaultTags } from "../../constants"
import type { FilteredToken, FilteredEntity, TagCount } from "../../types"
import { DashboardFilterContext } from "../dashboardFilter"
import { RunningAverage } from "@/types"
import { DASBOARD_QUERY } from "@/graphql/client"
import { useQuery } from "@apollo/client"

export const DashboardFilterContextProvider: React.FC<{
  children: ReactNode
  runningAvg: RunningAverage | null
  analyzeEntities: string | null
  tokenTags: string | null
  minTokenCount: string | null
  minEntityCount: string | null
  sentenceTerms: string | null
}> = ({
  children,
  runningAvg: cachedRunningAvg,
  analyzeEntities: cachedAnalyzeEntities,
  tokenTags: cachedTokenTags,
  minTokenCount: cachedMinTokenCount,
  minEntityCount: cachedMinEntityCount,
  sentenceTerms: cachedSentenceTerms,
}) => {
  const [analyzeEntities, setAnalyzeEntities] = useState<boolean>(
    JSON.parse(cachedAnalyzeEntities || "true")
  )
  const [runningAvg, setRunningAvg] = useState<RunningAverage>(
    cachedRunningAvg || "30"
  )
  const [daysOfUse, setDaysOfUse] = useState<DashboardMetrics["daysOfUse"]>()
  const [filteredTokens, setFilteredTokens] = useState<FilteredToken[]>()
  const [tokenTags, setTokenTags] = useState<PartOfSpeech["tag"][]>(
    (cachedTokenTags && JSON.parse(cachedTokenTags)) || defaultTags.slice(0, 4)
  )
  const [tokenTagCounts, setTokenTagCounts] = useState<TagCount[]>()
  const [minTokenCount, setMinTokenCount] = useState(
    Number(cachedMinTokenCount) || 2
  )
  const [filteredEntities, setFilteredEntities] = useState<FilteredEntity[]>()
  const [minEntityCount, setMinEntityCount] = useState(
    Number(cachedMinEntityCount) || 2
  )
  const [filteredSentences, setFilteredSentences] = useState<Sentence[]>()
  const [sentenceTerms, setSentenceTerms] = useState<string[]>(
    (cachedSentenceTerms && JSON.parse(cachedSentenceTerms)) || []
  )
  const [avgHours, setAvgHours] = useState<DashboardMetrics["avgHours"]>()

  const { data, loading } = useQuery(DASBOARD_QUERY, { variables: { runningAvg } })

  const dashboard = data?.dashboard.dashboard
  const rawData = dashboard?.rawData
  const tokens = dashboard?.tokens
  const entities = dashboard?.entities
  const sentences = dashboard?.sentences

  useEffect(() => {
    ;(async () =>
      await fetch("/api/cacheDashboardFilters", {
        method: "post",
        body: JSON.stringify({
          runningAvg,
          analyzeEntities,
          tokenTags: JSON.stringify(tokenTags),
          minTokenCount,
          minEntityCount,
          sentenceTerms: JSON.stringify(sentenceTerms),
        }),
      }))()
  }, [
    runningAvg,
    analyzeEntities,
    tokenTags,
    minTokenCount,
    minEntityCount,
    sentenceTerms,
  ])

  useEffect(() => {
    if (tokens)
      setTokenTagCounts(
        defaultTags.map((tag) => {
          return {
            tag,
            count: tokens?.filter((t) => t.partOfSpeech?.tag === tag).length,
          }
        })
      )
  }, [tokens])

  useEffect(() => {
    setFilteredTokens(
      tokens
        // filter by tag
        ?.filter(
          (i) => i.partOfSpeech?.tag && tokenTags.indexOf(i.partOfSpeech.tag) > -1
        )
        // get counts
        .reduce((p: any[], c) => {
          const r = p
          const exists = p.find(
            (i) =>
              i.token.text.content.toLowerCase() === c.text?.content?.toLowerCase()
          )
          if (!exists)
            r.push({
              token: c,
              count: 1,
              hide: false,
            })
          else r[p.indexOf(exists)].count += 1
          return r
        }, [])
        // filter by minCount
        .filter((i) => i.count >= minTokenCount)
        .sort((a, b) => (a.count < b.count ? 1 : -1))
    )
  }, [tokens, tokenTags, minTokenCount])

  const hideToken = (hide: boolean, idx: number) => {
    setFilteredTokens((oldTokens) => {
      let newTokens
      if (oldTokens) {
        newTokens = [...oldTokens]
        newTokens[idx].hide = hide
      }
      return newTokens
    })
  }

  const findTokens = (content?: string | null) =>
    rawData?.filter((datum) =>
      new RegExp(`(\\b)${content}(\\b)`, "g").test(datum.overview)
    )

  const handleTokenTagsChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event
    setTokenTags(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    )
  }

  useEffect(() => {
    setFilteredEntities(
      entities
        ?.map((entity) => {
          return {
            entity,
            count: entity.mentions?.length || 0,
            hide: false,
          }
        })
        // filter by minCount
        .filter((i) => i.count >= minEntityCount)
        // order by count
        .sort((a, b) =>
          a.entity.name && b.entity.name
            ? a.entity.name < b.entity.name
              ? 1
              : -1
            : 0
        )
        .sort((a, _b) => (isNaN(Number(a.entity.name)) ? 1 : -1))
        .sort((a, b) => (a.count < b.count ? 1 : -1))
    )
  }, [entities, minEntityCount])

  const hideEntity = (hide: boolean, idx: number) => {
    setFilteredEntities((oldTokens) => {
      let newTokens
      if (oldTokens) {
        newTokens = [...oldTokens]
        newTokens[idx].hide = hide
      }
      return newTokens
    })
  }

  useEffect(() => {
    setFilteredSentences(
      sentences?.filter(
        (sentence) =>
          sentence.text?.content &&
          new RegExp(sentenceTerms.join("|")).test(sentence.text.content)
      )
    )
  }, [sentences, sentenceTerms])

  const removeSentenceTerm = (term: string) => {
    setSentenceTerms((oldTerms) => [...oldTerms.filter((ot) => ot !== term)])
  }

  const addSentenceTerm = (term?: string | null) => {
    term && setSentenceTerms((oldTerms) => [...oldTerms, term])
  }

  const findSentence = (content?: string | null) =>
    content ? rawData?.find((datum) => datum.overview.search(content) > -1) : null

  return (
    <DashboardFilterContext.Provider
      value={{
        runningAvg,
        setRunningAvg,
        analyzeEntities,
        setAnalyzeEntities,
        daysOfUse,
        setDaysOfUse,
        filteredTokens,
        setFilteredTokens,
        tokenTags,
        tokenTagCounts,
        setTokenTags,
        minTokenCount,
        setMinTokenCount,
        loading,
        avgHours,
        setAvgHours,
        hideToken,
        findTokens,
        handleTokenTagsChange,
        filteredEntities,
        hideEntity,
        minEntityCount,
        setMinEntityCount,
        filteredSentences,
        setFilteredSentences,
        findSentence,
        sentenceTerms,
        addSentenceTerm,
        removeSentenceTerm,
      }}
    >
      {children}
    </DashboardFilterContext.Provider>
  )
}
