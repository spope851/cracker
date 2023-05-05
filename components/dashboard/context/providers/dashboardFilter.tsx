import {
  BasicSentence,
  DashboardMetrics,
  PartOfSpeech,
  Sentence,
  Text,
  Track,
  Word,
} from "@/generated/graphql"
import { SelectChangeEvent } from "@mui/material"
import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react"
import { defaultTags } from "../../constants"
import type { FilteredToken, FilteredEntity, TagCount } from "../../types"
import { DashboardFilterContext } from "../dashboardFilter"
import { DashboardFilters, RunningAverage } from "@/types"
import { DASBOARD_QUERY } from "@/graphql/client"
import { useQuery } from "@apollo/client"
import { DASBOARD_BASIC_QUERY } from "@/graphql/client/dashboard/dashboardBasicQuery"

const setHiddenFilter = (
  hide: boolean,
  newFilter: string,
  setter: Dispatch<SetStateAction<string[]>>
) => {
  if (hide)
    setter((oldTokens) => {
      let newTokens = [...oldTokens]
      newTokens.push(newFilter)
      return newTokens
    })
  else
    setter((oldTokens) =>
      [...oldTokens].filter((newToken) => newToken !== newFilter)
    )
}

const filterBySentenceTerms = <T extends { text?: Text | null }>(
  sentenceTerms: string[],
  sentences?: T[] | null
): T[] | undefined =>
  sentences?.filter(
    (sentence) =>
      sentence.text?.content &&
      new RegExp(sentenceTerms.join("|")).test(sentence.text.content)
  )

const filterBySentenceRating = <T extends { text?: Text | null; rating?: number }>(
  sentencesRating: number | "",
  sentences?: T[],
  findSentence?: (content?: string) => Track | null | undefined
): T[] | undefined =>
  sentences?.filter((sentence) => {
    if (sentencesRating === "") return true
    else if (sentence.text?.content) {
      const rating =
        sentence.rating ||
        (findSentence && findSentence(sentence.text?.content)?.rating)
      return rating === sentencesRating
    }
  })

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
  hiddenWords: cachedHiddenWords,
  basicSentenceTerms: cachedBasicSentenceTerms,
}) => {
  // PREMIUM FILTERS

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

  const dashboard = premiumData?.dashboard.dashboard
  const rawData = dashboard?.rawData
  const tokens = dashboard?.tokens
  const entities = dashboard?.entities
  const sentences = dashboard?.sentences

  // BASIC FILTERS

  const [minWordCount, setMinWordCount] = useState(Number(cachedMinWordCount) || 2)
  const [basicSentencesRating, setBasicSentencesRating] = useState(
    cachedBasicSentencesRating ? Number(cachedBasicSentencesRating) : ("" as "")
  )
  const [hiddenWords, setHiddenWords] = useState<string[]>(
    (cachedHiddenWords && JSON.parse(cachedHiddenWords)) || []
  )
  const [basicSentenceTerms, setBasicSentenceTerms] = useState<string[]>(
    (cachedBasicSentenceTerms && JSON.parse(cachedBasicSentenceTerms)) || []
  )

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
          // basic caches
          minWordCount,
          basicSentencesRating,
          hiddenWords: JSON.stringify(hiddenWords),
          basicSentenceTerms: JSON.stringify(basicSentenceTerms),
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
    // basic caches
    minWordCount,
    basicSentencesRating,
    hiddenWords,
    basicSentenceTerms,
  ])

  // PREMIUM LOGIC

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
    setFilteredTokens((oldTokens) =>
      [...oldTokens!].map((oldToken) => {
        return {
          ...oldToken,
          hide: oldToken.token.text?.content === token ? hide : oldToken.hide,
        }
      })
    )

    setHiddenFilter(hide, token, setHiddenTokens)
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
    setFilteredEntities((oldEntities) =>
      [...oldEntities!].map((oldEntity) => {
        return {
          ...oldEntity,
          hide: oldEntity.entity.name === entity ? hide : oldEntity.hide,
        }
      })
    )

    setHiddenFilter(hide, entity, setHiddenEntities)
  }

  // filter sentences
  useEffect(() => {
    setFilteredSentences(
      filterBySentenceRating(
        sentencesRating,
        filterBySentenceTerms(sentenceTerms, sentences),
        findSentence
      )
    )
  }, [sentences, sentenceTerms, sentencesRating])

  const removeSentenceTerm = (term: string) => {
    if (premium)
      setSentenceTerms((oldTerms) => [...oldTerms.filter((ot) => ot !== term)])
    else
      setBasicSentenceTerms((oldTerms) => [...oldTerms.filter((ot) => ot !== term)])
  }

  const addSentenceTerm = (term?: string | null) => {
    if (term) {
      if (premium) setSentenceTerms((oldTerms) => [...oldTerms, term])
      else setBasicSentenceTerms((oldTerms) => [...oldTerms, term])
    }
  }

  const findSentence = (content?: string | null) =>
    content ? rawData?.find((datum) => datum.overview.search(content) > -1) : null

  // BASIC LOGIC

  const [basicWords, setBasicWords] = useState<Word[]>()
  const [basicSentences, setBasicSentences] = useState<BasicSentence[]>()

  const { data: basicData, loading: loadingBasic } = useQuery(DASBOARD_BASIC_QUERY, {
    variables: { runningAvg },
    onCompleted: (data) => console.log("basic", data),
    skip: premium,
  })

  const words = basicData?.dashboardBasic.dashboard?.words
  const basicQuerySentences = basicData?.dashboardBasic.dashboard?.sentences

  // filter words
  useEffect(() => {
    setBasicWords(
      filterByMinCount(minWordCount, words)?.map((word) => {
        return { ...word, hide: hiddenWords.includes(word.word.text?.content || "") }
      })
    )
  }, [words, minWordCount])

  const hideWord = (hide: boolean, word: string) => {
    // TODO: write generic function
    setBasicWords((oldWords) =>
      [...oldWords!].map((oldWord) => {
        return {
          ...oldWord,
          hide: oldWord.word.text?.content === word ? hide : oldWord.hide,
        }
      })
    )

    setHiddenFilter(hide, word, setHiddenWords)
  }

  // filter sentences
  useEffect(() => {
    setBasicSentences(
      filterBySentenceRating(
        basicSentencesRating,
        filterBySentenceTerms(basicSentenceTerms, basicQuerySentences)
      )
    )
  }, [basicQuerySentences, basicSentencesRating, basicSentenceTerms])

  return (
    <DashboardFilterContext.Provider
      value={{
        // TODO: move premium to global dashboard context
        premium,
        // PREMIUM FEATURES
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
        // BASIC FEATURES
        basicWords,
        basicSentences,
        minWordCount: [minWordCount, setMinWordCount],
        basicSentencesRating: [basicSentencesRating, setBasicSentencesRating],
        hideWord,
        basicSentenceTerms,
      }}
    >
      {children}
    </DashboardFilterContext.Provider>
  )
}
