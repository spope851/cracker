import {
  BasicSentence,
  DashboardMetrics,
  PartOfSpeech,
  Sentence,
  Word,
} from "@/generated/graphql"
import { SelectChangeEvent } from "@mui/material"
import React, { ReactNode, useEffect, useState } from "react"
import { defaultTags } from "../../constants"
import type { FilteredToken, FilteredEntity, TagCount } from "../../types"
import { DashboardFilterContext } from "../dashboardFilter"
import { DashboardFilters, RunningAverage } from "@/types"
import { DASBOARD_QUERY } from "@/graphql/client"
import { useQuery } from "@apollo/client"
import { DASBOARD_BASIC_QUERY } from "@/graphql/client/dashboard/dashboardBasicQuery"

const filterByMinCount = <T extends { count: number }>(
  minCount: number,
  words?: T[]
): T[] | undefined => words?.filter((i) => i.count && i.count >= minCount)

export const DashboardFilterContextProvider: React.FC<
  DashboardFilters & { children: ReactNode; premium: boolean }
> = ({
  children,
  premium,
  runningAvg: cachedRunningAvg,
  analyzeEntities: cachedAnalyzeEntities,
  tokenTags: cachedTokenTags,
  minTokenCount: cachedMinTokenCount,
  minEntityCount: cachedMinEntityCount,
  sentenceTerms: cachedSentenceTerms,
  hiddenTokens: cachedHiddenTokens,
  hiddenEntities: cachedHiddenEntities,
  sentencesRating: cachedSentencesRating,
  minWordCount: cachedMinWordCount,
  basicSentencesRating: cachedBasicSentencesRating,
}) => {
  const [analyzeEntities, setAnalyzeEntities] = useState<boolean>(
    JSON.parse(cachedAnalyzeEntities || "true")
  )
  const [runningAvg, setRunningAvg] = useState<RunningAverage>(
    cachedRunningAvg || "30"
  )
  const [daysOfUse, setDaysOfUse] = useState<DashboardMetrics["daysOfUse"]>()
  const [filteredTokens, setFilteredTokens] = useState<FilteredToken[]>()
  const [hiddenTokens, setHiddenTokens] = useState<string[]>(
    (cachedHiddenTokens && JSON.parse(cachedHiddenTokens)) || []
  )
  const [tokenTags, setTokenTags] = useState<PartOfSpeech["tag"][]>(
    (cachedTokenTags && JSON.parse(cachedTokenTags)) || defaultTags.slice(0, 4)
  )
  const [tokenTagCounts, setTokenTagCounts] = useState<TagCount[]>()
  const [minTokenCount, setMinTokenCount] = useState(
    Number(cachedMinTokenCount) || 2
  )
  const [filteredEntities, setFilteredEntities] = useState<FilteredEntity[]>()
  const [hiddenEntities, setHiddenEntities] = useState<string[]>(
    (cachedHiddenEntities && JSON.parse(cachedHiddenEntities)) || []
  )
  const [minEntityCount, setMinEntityCount] = useState(
    Number(cachedMinEntityCount) || 2
  )
  const [filteredSentences, setFilteredSentences] = useState<Sentence[]>()
  const [sentencesRating, setSentencesRating] = useState(
    cachedSentencesRating ? Number(cachedSentencesRating) : ("" as "")
  )
  const [sentenceTerms, setSentenceTerms] = useState<string[]>(
    (cachedSentenceTerms && JSON.parse(cachedSentenceTerms)) || []
  )
  const [avgHours, setAvgHours] = useState<DashboardMetrics["avgHours"]>()
  const { data: premiumData, loading: loadingPremium } = useQuery(DASBOARD_QUERY, {
    variables: { runningAvg },
    onCompleted: (data) => console.log("premium", data),
    skip: !premium,
  })

  const [basicWords, setBasicWords] = useState<Word[]>()
  const [minWordCount, setMinWordCount] = useState(Number(cachedMinWordCount) || 2)
  const [basicSentencesRating, setBasicSentencesRating] = useState(
    cachedBasicSentencesRating ? Number(cachedBasicSentencesRating) : ("" as "")
  )
  const [basicSentences, setBasicSentences] = useState<BasicSentence[]>()

  const { data: basicData, loading: loadingBasic } = useQuery(DASBOARD_BASIC_QUERY, {
    variables: { runningAvg },
    onCompleted: (data) => console.log("basic", data),
    skip: premium,
  })

  const dashboard = premiumData?.dashboard.dashboard
  const rawData = dashboard?.rawData
  const tokens = dashboard?.tokens
  const entities = dashboard?.entities
  const sentences = dashboard?.sentences

  // cache filters
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
          hiddenTokens: JSON.stringify(hiddenTokens),
          hiddenEntities: JSON.stringify(hiddenEntities),
          sentencesRating,
          minWordCount,
          basicSentencesRating,
        }),
      }))()
  }, [
    runningAvg,
    analyzeEntities,
    tokenTags,
    minTokenCount,
    minEntityCount,
    sentenceTerms,
    hiddenTokens,
    hiddenEntities,
    sentencesRating,
    minWordCount,
    basicSentencesRating,
  ])

  // get tag counts
  useEffect(() => {
    if (tokens)
      setTokenTagCounts(
        defaultTags.map((tag) => {
          return {
            tag,
            count: tokens.filter((t) => t.partOfSpeech?.tag === tag).length,
          }
        })
      )
  }, [tokens])

  // filter tokens
  useEffect(() => {
    setFilteredTokens(
      filterByMinCount(
        minTokenCount,
        tokens
          // filter by tag
          ?.filter(
            (i) => i.partOfSpeech?.tag && tokenTags.indexOf(i.partOfSpeech.tag) > -1
          )
          // get counts
          .reduce((p: FilteredToken[], c) => {
            const r = p
            const exists = p.find(
              (i) =>
                i.token.text?.content?.toLowerCase() ===
                c.text?.content?.toLowerCase()
            )
            if (!exists)
              r.push({
                token: c,
                count: 1,
                hide: hiddenTokens.includes(c.text?.content || ""),
              })
            else r[p.indexOf(exists)].count += 1
            return r
          }, [])
      )
        // TODO: move all sorting to sql
        ?.sort((a, b) => (a.count < b.count ? 1 : -1))
    )
  }, [tokens, tokenTags, minTokenCount])

  const hideToken = (hide: boolean, token: string) => {
    setFilteredTokens((oldTokens) => {
      let newTokens
      if (oldTokens) {
        newTokens = [...oldTokens].map((oldToken) => {
          return {
            ...oldToken,
            hide: oldToken.token.text?.content === token ? hide : oldToken.hide,
          }
        })
      }
      return newTokens
    })

    if (hide)
      setHiddenTokens((oldTokens) => {
        let newTokens = [...oldTokens]
        filteredTokens && newTokens.push(token)
        return newTokens
      })
    else
      setHiddenTokens((oldTokens) => {
        let newTokens = [...oldTokens]
        if (filteredTokens) {
          newTokens = newTokens.filter((newToken) => newToken !== token)
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

  // filter entities
  useEffect(() => {
    setFilteredEntities(
      filterByMinCount(
        minEntityCount,
        entities?.map((entity) => {
          return {
            entity,
            count: entity.mentions?.length || 0,
            hide: hiddenEntities.includes(entity.name || ""),
          }
        })
      )
        // order by count
        ?.sort((a, b) =>
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

  const hideEntity = (hide: boolean, entity: string) => {
    setFilteredEntities((oldEntities) => {
      let newEntities
      if (oldEntities) {
        newEntities = [...oldEntities].map((oldEntity) => {
          return {
            ...oldEntity,
            hide: oldEntity.entity.name === entity ? hide : oldEntity.hide,
          }
        })
      }
      return newEntities
    })

    if (hide)
      setHiddenEntities((oldEntities) => {
        let newEntities = [...oldEntities]
        newEntities.push(entity)
        return newEntities
      })
    else
      setHiddenEntities((oldEntities) => {
        let newEntities = [...oldEntities]
        if (filteredEntities) {
          newEntities = newEntities.filter((newEntity) => newEntity !== entity)
        }
        return newEntities
      })
  }

  // filter sentences
  useEffect(() => {
    setFilteredSentences(
      sentences
        // filter by sentence terms
        ?.filter(
          (sentence) =>
            sentence.text?.content &&
            new RegExp(sentenceTerms.join("|")).test(sentence.text.content)
        )
        // filter by sentence ratings
        .filter((sentence) => {
          if (sentencesRating === "") return true
          if (sentence.text?.content) {
            const foundSentence = findSentence(sentence.text.content)
            return foundSentence?.rating === sentencesRating
          }
        })
    )
  }, [sentences, sentenceTerms, sentencesRating])

  const removeSentenceTerm = (term: string) => {
    setSentenceTerms((oldTerms) => [...oldTerms.filter((ot) => ot !== term)])
  }

  const addSentenceTerm = (term?: string | null) => {
    term && setSentenceTerms((oldTerms) => [...oldTerms, term])
  }

  const findSentence = (content?: string | null) =>
    content ? rawData?.find((datum) => datum.overview.search(content) > -1) : null

  // BASIC FILTERS

  const words = basicData?.dashboardBasic.dashboard?.words
  const basicQuerySentences = basicData?.dashboardBasic.dashboard?.sentences

  // filter words
  useEffect(() => {
    setBasicWords(filterByMinCount(minWordCount, words))
  }, [words, minWordCount])

  // filter sentences
  useEffect(() => {
    setBasicSentences(
      basicQuerySentences
        // filter by sentence terms
        // ?.filter(
        //   (sentence) =>
        //     sentence.text?.content &&
        //     new RegExp(sentenceTerms.join("|")).test(sentence.text.content)
        // )
        // filter by sentence ratings
        ?.filter((sentence) => {
          if (basicSentencesRating === "") return true
          if (sentence.text?.content) {
            return sentence.rating === basicSentencesRating
          }
        })
    )
  }, [basicQuerySentences, basicSentencesRating])

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
        loadingPremium,
        loadingBasic,
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
        sentencesRating,
        setSentencesRating,
        findSentence,
        sentenceTerms,
        addSentenceTerm,
        removeSentenceTerm,
        basicWords,
        basicSentences,
        minWordCount: [minWordCount, setMinWordCount],
        basicSentencesRating: [basicSentencesRating, setBasicSentencesRating],
      }}
    >
      {children}
    </DashboardFilterContext.Provider>
  )
}
