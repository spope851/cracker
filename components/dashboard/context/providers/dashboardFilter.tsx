import { Track } from "@/generated/graphql"
import { SelectChangeEvent } from "@mui/material"
import React, { ReactNode, useEffect, useState } from "react"
import { defaultTags } from "../../constants"
import type {
  Token,
  FilteredToken,
  Entity,
  FilteredEntity,
  Sentence,
} from "../../types"
import { DashboardFilterContext } from "../dashboardFilter"

export const DashboardFilterContextProvider: React.FC<{
  children: ReactNode
  tokens?: Token[]
  loading: boolean
  rawData: Track[]
  avgHours: number
  entities?: Entity[]
  sentences?: Sentence[]
}> = ({ children, tokens, rawData, loading, avgHours, entities, sentences }) => {
  const [filteredTokens, setFilteredTokens] = useState<FilteredToken[]>()
  const [tokenTags, setTokenTags] = useState<string[]>(defaultTags.slice(0, 4))
  const [minTokenCount, setMinTokenCount] = useState(2)
  const [filteredEntities, setFilteredEntities] = useState<FilteredEntity[]>()
  const [minEntityCount, setMinEntityCount] = useState(2)
  const [filteredSentences, setFilteredSentences] = useState<Sentence[]>()
  const [sentenceTerm, setSentenceTerm] = useState<string>()

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

  const findTokens = (content: string) =>
    rawData.filter((datum) =>
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
    ;(async () => {
      await fetch("/api/getCachedTokens", { method: "get" })
        .then((res) => res.json())
        // TODO: implement token caching
        .then((res) => {
          setFilteredTokens(
            tokens
              // filter by tag
              ?.filter((i) => tokenTags.indexOf(i.partOfSpeech.tag) > -1)
              // get counts
              .reduce((p: any[], c) => {
                const r = p
                const exists = p.find(
                  (i) =>
                    i.token.text.content.toLowerCase() ===
                    c.text.content.toLowerCase()
                )
                if (!exists)
                  r.push({
                    token: c,
                    count: 1,
                    hide:
                      // filteredTokens?.find((t) => t.token === c)?.hide ||
                      // res[c.text.content].hide ||
                      false,
                  })
                else r[p.indexOf(exists)].count += 1
                return r
              }, [])
              // filter by minCount
              .filter((i) => i.count >= minTokenCount)
              .sort((a, b) => (a.count < b.count ? 1 : -1))
          )
        })
        .finally(
          async () =>
            await fetch("/api/cacheTokens", {
              method: "post",
              body: JSON.stringify(
                filteredTokens?.reduce((p, c) => {
                  return { ...p, [c.token.text.content]: { hide: c.hide } }
                }, {})
              ),
            })
        )
    })()
  }, [tokens, tokenTags, minTokenCount])

  useEffect(() => {
    setFilteredEntities(
      entities
        ?.map((entity) => {
          return {
            entity,
            count: entity.mentions.length,
            hide: false,
          }
        })
        // filter by minCount
        .filter((i) => i.count >= minEntityCount)
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
      sentenceTerm
        ? sentences?.filter(
            (sentence) => sentence.text.content.search(sentenceTerm) > -1
          )
        : sentences
    )
  }, [sentences, sentenceTerm])

  const findSentence = (content: string) =>
    rawData.find((datum) => datum.overview.search(content) > -1)

  return (
    <DashboardFilterContext.Provider
      value={{
        filteredTokens,
        setFilteredTokens,
        tokenTags,
        setTokenTags,
        minTokenCount,
        setMinTokenCount,
        loading,
        avgHours,
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
        sentenceTerm,
        setSentenceTerm,
      }}
    >
      {children}
    </DashboardFilterContext.Provider>
  )
}
