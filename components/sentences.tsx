import { Track } from "@/generated/graphql"
import { Box, Grid, Stack, Tooltip, Typography } from "@mui/material"
import React, { ReactNode, useEffect, useState } from "react"

const TH: React.FC<{ children: ReactNode }> = ({ children }) => (
  <Box component="th" whiteSpace="nowrap" p={1}>
    {children}
  </Box>
)

const TD: React.FC<{ children: ReactNode; bgcolor?: string }> = ({
  children,
  bgcolor = "#fff",
}) => (
  <Box component="td" border={2} p={1} borderColor="black" bgcolor={bgcolor}>
    {children}
  </Box>
)

type Tag =
  | "ADJ"
  | "VERB"
  | "NOUN"
  | "ADV"
  | "ADP"
  | "PRON"
  | "CONJ"
  | "DET"
  | "NUM"
  | "PRT"
  | "PUNCT"

const tags = [
  "ADJ",
  "VERB",
  "NOUN",
  "ADV",
  "ADP",
  "PRON",
  "CONJ",
  "DET",
  "NUM",
  "PRT",
  "PUNCT",
]

type Sentiment = {
  score: number
  magnitude: number
}

type Text = {
  content: string
  beginOffset: number
}

export type Sentence = {
  sentiment: Sentiment
  text: Text
}

type FilteredSentence = {}

const Sentences: React.FC<{
  sentences?: Sentence[]
  loading: boolean
  rawData: Track[]
  avgHours: number
}> = ({ sentences, loading, rawData, avgHours }) => {
  const [filteredTokens, setFilteredTokens] = useState<FilteredSentence[]>()

  useEffect(() => {
    setFilteredTokens(sentences)
  }, [sentences])

  const sentimentColor = (score: number): "lightCoral" | "paleGreen" | "#fff" => {
    if (score > 0) return "paleGreen"
    if (score < 0) return "lightCoral"
    return "#fff"
  }

  return (
    <Grid container item md={12} justifyContent="space-evenly">
      <Box
        border="solid"
        borderRadius={2}
        p={5}
        textAlign="left"
        width="100%"
        height="500px"
        overflow="auto"
      >
        <Box component="table" width="100%" sx={{ borderCollapse: "collapse" }}>
          <Box component="thead">
            <Box component="tr">
              <TH>sentence</TH>
              <TH>begin offset</TH>
              <TH>sentiment score</TH>
              <TH>sentiment magnitude</TH>
            </Box>
          </Box>
          <Box component="tbody">
            {loading ? (
              <Box component="tr">
                <Box component="td">...fetching</Box>
              </Box>
            ) : (
              sentences &&
              sentences.map(
                (
                  {
                    text: { beginOffset, content },
                    sentiment: { magnitude, score },
                  },
                  idx
                ) => {
                  const bgcolor = sentimentColor(score)
                  return (
                    <Box
                      key={idx}
                      component="tr"
                      color={"#000"}
                      fontWeight={Math.abs(score) > 0 ? "bold" : ""}
                    >
                      <TD bgcolor={bgcolor}>{content}</TD>
                      <TD bgcolor={bgcolor}>{beginOffset}</TD>
                      <TD bgcolor={bgcolor}>{Number(score).toFixed(3)}</TD>
                      <TD bgcolor={bgcolor}>{Number(magnitude).toFixed(3)}</TD>
                    </Box>
                  )
                }
              )
            )}
          </Box>
        </Box>
      </Box>
    </Grid>
  )
}

export default Sentences
