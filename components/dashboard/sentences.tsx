import { Track } from "@/generated/graphql"
import { Box, Grid } from "@mui/material"
import React, { ReactNode } from "react"
import { Sentiment, Text } from "./types"

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

export type Sentence = {
  sentiment: Sentiment
  text: Text
}

const sentimentColor = (score: number): "lightCoral" | "paleGreen" | "#fff" => {
  if (score > 0) return "paleGreen"
  if (score < 0) return "lightCoral"
  return "#fff"
}

const Sentences: React.FC<{
  sentences?: Sentence[]
  loading: boolean
  rawData: Track[]
  avgHours: number
}> = ({ sentences, loading, rawData, avgHours }) => {
  const findSentence = (content: string) =>
    rawData.find((datum) => datum.overview.search(content) > -1)

  const aboveAverage = (numberCreativeHours?: number) => {
    if (!numberCreativeHours) return "#fff"
    else return numberCreativeHours > avgHours ? "paleGreen" : "lightCoral"
  }

  const ratingColor = (
    rating?: number
  ): "red" | "lime" | "paleGreen" | "yellow" | "lightCoral" | "#fff" => {
    if (!rating) return "#fff"
    else if (rating === 2) return "lime"
    else if (rating === 1) return "paleGreen"
    else if (rating === 0) return "yellow"
    else if (rating === -1) return "lightCoral"
    else return "red"
  }

  return (
    <Grid container item md={7} mb={{ sm: 5 }}>
      <Box
        border="solid"
        borderRadius={2}
        p={5}
        textAlign="left"
        width="100%"
        maxHeight="500px"
        overflow="auto"
      >
        <Box component="table" width="100%" sx={{ borderCollapse: "collapse" }}>
          <Box component="thead">
            <Box component="tr">
              <TH>sentence</TH>
              <TH>offset</TH>
              <TH>score</TH>
              <TH>magnitude</TH>
              <TH>hours</TH>
              <TH>rating</TH>
              <TH>date</TH>
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
                  const foundSentence = findSentence(content)
                  return (
                    <Box
                      key={idx}
                      component="tr"
                      color={"#000"}
                      fontWeight={Math.abs(score) > 0 ? "bold" : ""}
                    >
                      <TD>{content}</TD>
                      <TD>{beginOffset}</TD>
                      <TD bgcolor={bgcolor}>{Number(score).toFixed(3)}</TD>
                      <TD>{Number(magnitude).toFixed(3)}</TD>
                      <TD bgcolor={aboveAverage(foundSentence?.numberCreativeHours)}>
                        {foundSentence?.numberCreativeHours}
                      </TD>
                      <TD bgcolor={ratingColor(foundSentence?.rating)}>
                        {foundSentence?.rating && foundSentence.rating > 0 && "+"}
                        {foundSentence?.rating}
                      </TD>
                      <TD>
                        {foundSentence?.createdAt &&
                          new Date(foundSentence?.createdAt).toLocaleDateString()}
                      </TD>
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
