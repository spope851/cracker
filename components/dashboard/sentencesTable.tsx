import { Box, Chip, Grid, Typography } from "@mui/material"
import { Stack } from "@mui/system"
import React, { useContext } from "react"
import { TH, TD } from "./components"
import { DashboardFilterContext } from "./context"
import { ratingColor, sentimentColor, aboveAverage } from "./functions"

const SentencesTable: React.FC = () => {
  const {
    filteredSentences: sentences,
    loading,
    findSentence,
    avgHours,
    sentenceTerms,
    removeSentenceTerm,
  } = useContext(DashboardFilterContext)

  return (
    <Grid container item md={7} mb={{ md: 0, sm: 5, xs: 5 }}>
      <Box
        border="solid"
        borderRadius={2}
        p={5}
        textAlign="left"
        width="100%"
        maxHeight="500px"
        overflow="auto"
      >
        {sentenceTerms.length > 0 && (
          <Stack flexDirection="row" alignItems="center" columnGap={1}>
            <Typography>term:</Typography>
            {sentenceTerms.map((term, idx) => (
              <Chip
                key={idx}
                label={term}
                onDelete={() => removeSentenceTerm(term)}
              />
            ))}
          </Stack>
        )}
        <Box component="table" width="100%" sx={{ borderCollapse: "collapse" }}>
          <Box component="thead">
            <Box component="tr">
              <TH>sentence</TH>
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
                ({ text: { content }, sentiment: { magnitude, score } }, idx) => {
                  const bgcolor = sentimentColor(score)
                  const foundSentence = findSentence(content)
                  return (
                    <Box
                      key={idx}
                      component="tr"
                      color={"#000"}
                      fontWeight={Math.abs(score) > 0 ? "bold" : ""}
                    >
                      <TD>
                        <Typography>{content}</Typography>
                      </TD>
                      <TD bgcolor={bgcolor}>{Number(score).toFixed(3)}</TD>
                      <TD>{Number(magnitude).toFixed(3)}</TD>
                      <TD
                        bgcolor={aboveAverage(
                          avgHours,
                          foundSentence?.numberCreativeHours
                        )}
                      >
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

export default SentencesTable
