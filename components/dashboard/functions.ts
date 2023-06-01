import { Track, Text } from "@/generated/graphql"
import { Dispatch, SetStateAction } from "react"

const ratingColor = (
  score?: number
): "red" | "lime" | "paleGreen" | "yellow" | "lightCoral" | "#fff" => {
  if (score === undefined) return "#fff"
  else if (score === 2) return "lime"
  else if (score === 1) return "paleGreen"
  else if (score === 0) return "yellow"
  else if (score === -1) return "lightCoral"
  else return "red"
}

const sentimentColor = (
  score?: number | null
): "lightCoral" | "paleGreen" | "#fff" => {
  if (!score) return "#fff"
  else if (score > 0) return "paleGreen"
  else return "lightCoral"
}

const aboveAverage = (avgHours?: number, numberCreativeHours?: number) => {
  if (numberCreativeHours === undefined) return "#fff"
  else if (avgHours === undefined) return "#fff"
  else return numberCreativeHours > avgHours ? "paleGreen" : "lightCoral"
}

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
  sentencesRating: number[],
  sentences?: T[],
  findSentence?: (content?: string) => Track | null | undefined
): T[] | undefined =>
  sentencesRating.length === 0
    ? sentences
    : sentences?.filter((sentence) => {
        if (sentence.text?.content) {
          const rating =
            typeof sentence.rating === "number"
              ? sentence.rating
              : findSentence && findSentence(sentence.text?.content)?.rating
          return typeof rating === "number" && sentencesRating.includes(rating)
        }
      })

const filterByMinCount = <T extends { count: number }>(
  minCount: number,
  words?: T[]
): T[] | undefined => words?.filter((i) => i.count && i.count >= minCount)

export {
  ratingColor,
  sentimentColor,
  aboveAverage,
  setHiddenFilter,
  filterBySentenceRating,
  filterByMinCount,
  filterBySentenceTerms,
}
