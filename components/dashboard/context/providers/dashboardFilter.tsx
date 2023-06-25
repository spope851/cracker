import {
  BasicSentence,
  DashboardMetrics,
  PartOfSpeech,
  Sentence,
  Word,
} from "@/generated/graphql"
import { SelectChangeEvent } from "@mui/material"
import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react"
import { DEFAULT_FILTERS, DEFAULT_TAGS } from "../../constants"
import type { FilteredToken, FilteredEntity, TagCount } from "../../types"
import { DashboardFilterContext } from "../dashboardFilter"
import {
  DashboardFilters,
  RunningAverage,
  SentenceTableSortColumn,
  SortDir,
  WordTableSortColumn,
} from "@/types"
import {
  BASIC_DASBOARD_WORDS_QUERY,
  DASBOARD_QUERY,
  BASIC_DASBOARD_SENTENCES_QUERY,
} from "@/graphql/client"
import { useQuery } from "@apollo/client"
import {
  filterByMinCount,
  setHiddenFilter,
  filterBySentenceRating,
  filterBySentenceTerms,
  filterBySentenceHours,
} from "../../functions"

export const DashboardFilterContextProvider: React.FC<
  DashboardFilters & {
    children: ReactNode
    premium: [boolean, Dispatch<SetStateAction<boolean>>]
  }
> = ({
  children,
  premium: [premium, setPremium],
  premiumRunningAvg: cachedPremiumRunningAvg,
  analyzeEntities: cachedAnalyzeEntities,
  tokenTags: cachedTokenTags,
  minTokenCount: cachedMinTokenCount,
  minEntityCount: cachedMinEntityCount,
  sentenceTerms: cachedSentenceTerms,
  hiddenTokens: cachedHiddenTokens,
  hiddenEntities: cachedHiddenEntities,
  sentencesRating: cachedSentencesRating,
  basicRunningAvg: cachedBasicRunningAvg,
  minWordCount: cachedMinWordCount,
  basicSentencesRating: cachedBasicSentencesRating,
  hiddenWords: cachedHiddenWords,
  basicSentenceTerms: cachedBasicSentenceTerms,
  basicPreQueryRating: cachedBasicPreQueryRating,
  basicPreQueryMinHours: cachedBasicPreQueryMinHours,
  basicPreQueryMaxHours: cachedBasicPreQueryMaxHours,
  basicPostQueryMinHours: cachedBasicPostQueryMinHours,
  basicPostQueryMaxHours: cachedBasicPostQueryMaxHours,
  basicWordSortColumn: cachedBasicWordSortColumn,
  basicWordSortDir: cachedBasicWordSortDir,
  basicSentenceSortColumn: cachedBasicSentenceSortColumn,
  basicSentenceSortDir: cachedBasicSentenceSortDir,
}) => {
  // PREMIUM FILTERS

  const [analyzeEntities, setAnalyzeEntities] = useState<boolean>(
    JSON.parse(cachedAnalyzeEntities || DEFAULT_FILTERS.analyzeEntities)
  )
  const [premiumRunningAvg, setPremiumRunningAvg] = useState<RunningAverage>(
    cachedPremiumRunningAvg || DEFAULT_FILTERS.premiumRunningAvg
  )
  const [daysOfUse, setDaysOfUse] = useState<DashboardMetrics["daysOfUse"]>()
  const [filteredTokens, setFilteredTokens] = useState<FilteredToken[]>()
  const [hiddenTokens, setHiddenTokens] = useState<string[]>(
    (cachedHiddenTokens && JSON.parse(cachedHiddenTokens)) || []
  )
  const [tokenTags, setTokenTags] = useState<PartOfSpeech["tag"][]>(
    (cachedTokenTags && JSON.parse(cachedTokenTags)) || DEFAULT_FILTERS.tokenTags
  )
  const [tokenTagCounts, setTokenTagCounts] = useState<TagCount[]>()
  const [minTokenCount, setMinTokenCount] = useState(
    Number(cachedMinTokenCount) || DEFAULT_FILTERS.minTokenCount
  )
  const [filteredEntities, setFilteredEntities] = useState<FilteredEntity[]>()
  const [hiddenEntities, setHiddenEntities] = useState<string[]>(
    (cachedHiddenEntities && JSON.parse(cachedHiddenEntities)) || []
  )
  const [minEntityCount, setMinEntityCount] = useState(
    Number(cachedMinEntityCount) || DEFAULT_FILTERS.minEntityCount
  )
  const [filteredSentences, setFilteredSentences] = useState<Sentence[]>()
  const [sentencesRating, setSentencesRating] = useState<number[] | null>(
    cachedSentencesRating && JSON.parse(cachedSentencesRating)
  )
  const [sentenceTerms, setSentenceTerms] = useState<string[]>(
    (cachedSentenceTerms && JSON.parse(cachedSentenceTerms)) || []
  )
  const [avgHours, setAvgHours] = useState<DashboardMetrics["avgHours"]>()
  const { data: premiumData, loading: loadingPremium } = useQuery(DASBOARD_QUERY, {
    variables: { runningAvg: premiumRunningAvg },
    skip: !premium,
    // onCompleted: (data) => console.log(data),
  })

  const dashboard = premiumData?.dashboard.dashboard
  const rawData = dashboard?.rawData
  const tokens = dashboard?.tokens
  const entities = dashboard?.entities
  const sentences = dashboard?.sentences

  // BASIC FILTERS

  const [basicRunningAvg, setBasicRunningAvg] = useState<RunningAverage>(
    cachedBasicRunningAvg || DEFAULT_FILTERS.basicRunningAvg
  )
  const [minWordCount, setMinWordCount] = useState(
    Number(cachedMinWordCount) || DEFAULT_FILTERS.minWordCount
  )
  const [basicSentencesRating, setBasicSentencesRating] = useState<number[] | null>(
    cachedBasicSentencesRating && JSON.parse(cachedBasicSentencesRating)
  )
  const [hiddenWords, setHiddenWords] = useState<string[]>(
    (cachedHiddenWords && JSON.parse(cachedHiddenWords)) || []
  )
  const [basicSentenceTerms, setBasicSentenceTerms] = useState<string[]>(
    (cachedBasicSentenceTerms && JSON.parse(cachedBasicSentenceTerms)) || []
  )

  // PREMIUM LOGIC

  // get tag counts
  useEffect(() => {
    if (tokens)
      setTokenTagCounts(
        DEFAULT_TAGS.map((tag) => {
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
  }, [tokens, tokenTags, minTokenCount, hiddenTokens])

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
  }, [entities, minEntityCount, hiddenEntities])

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

  // for later implementation of pre query filters on premium dashboard
  // useEffect(() => {
  //   setSentencesRating(null)
  // }, [preQuyeryRating])

  const findSentence = useCallback(
    (content?: string | null) =>
      content ? rawData?.find((datum) => datum.overview.search(content) > -1) : null,
    [rawData]
  )

  useEffect(() => {
    setFilteredSentences(
      filterBySentenceRating(
        sentencesRating || [],
        filterBySentenceTerms(sentenceTerms, sentences),
        findSentence
      )
    )
  }, [sentences, sentenceTerms, sentencesRating, findSentence])

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

  // BASIC LOGIC

  const [basicWords, setBasicWords] = useState<Word[]>()
  const [basicSentences, setBasicSentences] = useState<BasicSentence[]>()
  const [basicPreQueryRating, setBasicPreQueryRating] = useState<number[] | null>(
    cachedBasicPreQueryRating ? JSON.parse(cachedBasicPreQueryRating) : null
  )
  const [basicPreQueryMinHours, setBasicPreQueryMinHours] = useState(
    Number(cachedBasicPreQueryMinHours) || DEFAULT_FILTERS.basicPreQueryMinHours
  )
  const [basicPreQueryMaxHours, setBasicPreQueryMaxHours] = useState(
    Number(cachedBasicPreQueryMaxHours) || DEFAULT_FILTERS.basicPreQueryMaxHours
  )
  const [basicPostQueryMinHours, setBasicPostQueryMinHours] = useState(
    Number(cachedBasicPostQueryMinHours) || DEFAULT_FILTERS.basicPostQueryMinHours
  )
  const [basicPostQueryMaxHours, setBasicPostQueryMaxHours] = useState(
    Number(cachedBasicPostQueryMaxHours) || DEFAULT_FILTERS.basicPostQueryMaxHours
  )

  const variables = {
    runningAvg: basicRunningAvg,
    rating: basicPreQueryRating,
    minHours: basicPreQueryMinHours,
    maxHours: basicPreQueryMaxHours,
  }

  const [basicWordSortColumn, setBasicWordSortColumn] =
    useState<WordTableSortColumn>(
      cachedBasicWordSortColumn || DEFAULT_FILTERS.basicWordSortColumn
    )
  const [basicWordSortDir, setBasicWordSortDir] = useState<SortDir>(
    cachedBasicWordSortDir || DEFAULT_FILTERS.basicWordSortDir
  )

  const { data: basicWordsQuery, loading: loadingBasicWords } = useQuery(
    BASIC_DASBOARD_WORDS_QUERY,
    {
      variables: {
        args: {
          ...variables,
          sortColumn: basicWordSortColumn,
          sortDir: basicWordSortDir,
        },
      },
      skip: premium,
      // onCompleted: (data) => console.log(data),
    }
  )

  const [basicSentenceSortColumn, setBasicSentenceSortColumn] =
    useState<SentenceTableSortColumn>(
      cachedBasicSentenceSortColumn || DEFAULT_FILTERS.basicSentenceSortColumn
    )
  const [basicSentenceSortDir, setBasicSentenceSortDir] = useState<SortDir>(
    cachedBasicSentenceSortDir || DEFAULT_FILTERS.basicSentenceSortDir
  )

  const { data: basicSentencessQuery, loading: loadingBasicSentences } = useQuery(
    BASIC_DASBOARD_SENTENCES_QUERY,
    {
      variables: {
        args: {
          ...variables,
          sortColumn: basicSentenceSortColumn,
          sortDir: basicSentenceSortDir,
        },
      },
      skip: premium,
      // onCompleted: (data) => console.log(data),
    }
  )

  const words = basicWordsQuery?.basicDashboardWords.words
  const basicQuerySentences = basicSentencessQuery?.basicDashboardSentences.sentences

  // filter words
  useEffect(() => {
    setBasicWords(
      filterByMinCount(minWordCount, words)?.map((word) => {
        return { ...word, hide: hiddenWords.includes(word.word.text?.content || "") }
      })
    )
  }, [words, minWordCount, hiddenWords])

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

  useEffect(() => {
    setBasicSentencesRating(null)
  }, [basicPreQueryRating])

  // filter sentences
  useEffect(() => {
    setBasicSentences(
      filterBySentenceHours(
        basicPostQueryMinHours,
        basicPostQueryMaxHours,
        filterBySentenceRating(
          basicSentencesRating || [],
          filterBySentenceTerms(basicSentenceTerms, basicQuerySentences)
        )
      )
    )
  }, [
    basicQuerySentences,
    basicSentencesRating,
    basicSentenceTerms,
    basicPostQueryMinHours,
    basicPostQueryMaxHours,
  ])

  // cache filters
  useEffect(() => {
    ;(async () =>
      await fetch("/api/cache/cacheDashboardFilters", {
        method: "post",
        body: JSON.stringify({
          cachedPremium: premium,
          premiumRunningAvg,
          analyzeEntities,
          tokenTags: JSON.stringify(tokenTags),
          minTokenCount,
          minEntityCount,
          sentenceTerms: JSON.stringify(sentenceTerms),
          hiddenTokens: JSON.stringify(hiddenTokens),
          hiddenEntities: JSON.stringify(hiddenEntities),
          sentencesRating: JSON.stringify(sentencesRating),
          // basic caches
          basicRunningAvg,
          minWordCount,
          basicSentencesRating: JSON.stringify(basicSentencesRating),
          hiddenWords: JSON.stringify(hiddenWords),
          basicSentenceTerms: JSON.stringify(basicSentenceTerms),
          basicPreQueryRating: JSON.stringify(basicPreQueryRating),
          basicPreQueryMinHours,
          basicPreQueryMaxHours,
          basicPostQueryMinHours,
          basicPostQueryMaxHours,
          basicWordSortColumn,
          basicWordSortDir,
          basicSentenceSortColumn,
          basicSentenceSortDir,
        }),
      }))()
  }, [
    premium,
    premiumRunningAvg,
    analyzeEntities,
    tokenTags,
    minTokenCount,
    minEntityCount,
    sentenceTerms,
    hiddenTokens,
    hiddenEntities,
    sentencesRating,
    // basic caches
    basicRunningAvg,
    minWordCount,
    basicSentencesRating,
    hiddenWords,
    basicSentenceTerms,
    basicPreQueryRating,
    basicPreQueryMinHours,
    basicPreQueryMaxHours,
    basicPostQueryMinHours,
    basicPostQueryMaxHours,
    basicWordSortColumn,
    basicWordSortDir,
    basicSentenceSortColumn,
    basicSentenceSortDir,
  ])

  return (
    <DashboardFilterContext.Provider
      value={{
        // TODO: move premium to global dashboard context
        premium: [premium, setPremium],
        // PREMIUM FEATURES
        premiumRunningAvg: [premiumRunningAvg, setPremiumRunningAvg],
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
        sentencesRating: [sentencesRating, setSentencesRating],
        findSentence,
        sentenceTerms,
        addSentenceTerm,
        removeSentenceTerm,
        // BASIC FEATURES
        loadingBasicWords,
        loadingBasicSentences,
        basicPreQueryRating: [basicPreQueryRating, setBasicPreQueryRating],
        basicPreQueryMinHours: [basicPreQueryMinHours, setBasicPreQueryMinHours],
        basicPreQueryMaxHours: [basicPreQueryMaxHours, setBasicPreQueryMaxHours],
        basicPostQueryMinHours: [basicPostQueryMinHours, setBasicPostQueryMinHours],
        basicPostQueryMaxHours: [basicPostQueryMaxHours, setBasicPostQueryMaxHours],
        basicRunningAvg: [basicRunningAvg, setBasicRunningAvg],
        basicWords,
        basicSentences,
        minWordCount: [minWordCount, setMinWordCount],
        basicSentencesRating: [basicSentencesRating, setBasicSentencesRating],
        hideWord,
        basicSentenceTerms,
        basicWordSortColumn: [basicWordSortColumn, setBasicWordSortColumn],
        basicWordSortDir: [basicWordSortDir, setBasicWordSortDir],
        basicSentenceSortColumn: [
          basicSentenceSortColumn,
          setBasicSentenceSortColumn,
        ],
        basicSentenceSortDir: [basicSentenceSortDir, setBasicSentenceSortDir],
      }}
    >
      {children}
    </DashboardFilterContext.Provider>
  )
}
