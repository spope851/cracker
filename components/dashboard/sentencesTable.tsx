import { Box, Chip, FormControl, Grid, Typography } from "@mui/material"
import { Stack } from "@mui/system"
import React, { useContext } from "react"
import { TH, TD } from "./components"
import { DashboardFilterContext } from "./context"
import { ratingColor, sentimentColor, aboveAverage } from "./functions"
import { RatingInput } from "../forms"

const tableCellMobileSx = {
  display: {
    sm: "table-cell",
    md: "table-cell",
    xs: "none",
  },
}

const SentencesTable: React.FC = () => {
  const {
    filteredSentences: sentences,
    loading,
    findSentence,
    avgHours,
    sentenceTerms,
    removeSentenceTerm,
    sentencesRating,
    setSentencesRating,
  } = useContext(DashboardFilterContext)

  return (
    <Grid container item md={7} sm={12} xs={12} mb={{ md: 0, sm: 5, xs: 5 }}>
      <Box
        border="solid"
        borderRadius={2}
        p={5}
        textAlign="left"
        width="100%"
        maxHeight="500px"
        overflow="auto"
      >
        <Stack direction="row">
          <Grid
            container
            item
            md={9}
            display="flex"
            flexDirection="row"
            alignItems="center"
            columnGap={1}
          >
            {sentenceTerms.length > 0 && (
              <>
                <Typography>term:</Typography>
                {sentenceTerms.map((term, idx) => (
                  <Chip
                    key={idx}
                    label={term}
                    onDelete={() => removeSentenceTerm(term)}
                  />
                ))}
              </>
            )}
          </Grid>
          <Grid
            container
            item
            md={3}
            display="flex"
            justifyContent="flex-end"
            direction="row"
            alignItems="center"
            columnGap={1}
          >
            {typeof sentencesRating === "number" && (
              <Chip
                onDelete={() => setSentencesRating("")}
                sx={{
                  "& .MuiChip-label": {
                    pr: 0,
                  },
                }}
              />
            )}
            <FormControl sx={{ width: 80 }}>
              <RatingInput
                label="rating"
                value={sentencesRating}
                onChange={(e) => setSentencesRating(Number(e.target.value))}
              />
            </FormControl>
          </Grid>
        </Stack>
        <Box component="table" width="100%" sx={{ borderCollapse: "collapse" }}>
          <Box component="thead">
            <Box component="tr">
              <TH>sentence</TH>
              <TH sx={tableCellMobileSx}>score</TH>
              <TH sx={tableCellMobileSx}>magnitude</TH>
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
              sentences.map(({ text, sentiment }, idx) => {
                const bgcolor = sentimentColor(sentiment?.score)
                const foundSentence = findSentence(text?.content)
                return (
                  <Box
                    key={idx}
                    component="tr"
                    color={"#000"}
                    fontWeight={
                      sentiment?.score && Math.abs(sentiment.score) > 0 ? "bold" : ""
                    }
                  >
                    <TD>
                      <Typography>
                        {sentenceTerms.length > 0
                          ? text?.content
                              ?.split(
                                new RegExp(
                                  `(\\b)(?=${sentenceTerms.join(
                                    "|"
                                  )})|(?<=${sentenceTerms.join("|")})(\\b)`,
                                  "g"
                                )
                              )
                              .map((part, idx) => (
                                <Typography
                                  key={idx}
                                  component="span"
                                  fontWeight={
                                    sentenceTerms.includes(part) ? "bold" : "normal"
                                  }
                                >
                                  {part}
                                </Typography>
                              ))
                          : text?.content}
                      </Typography>
                    </TD>
                    <TD bgcolor={bgcolor} sx={tableCellMobileSx}>
                      {Number(sentiment?.score).toFixed(3)}
                    </TD>
                    <TD sx={tableCellMobileSx}>
                      {Number(sentiment?.magnitude).toFixed(3)}
                    </TD>
                    <TD
                      bgcolor={aboveAverage(
                        avgHours,
                        foundSentence?.numberCreativeHours
                      )}
                    >
                      {foundSentence?.numberCreativeHours}
                    </TD>
                    <TD bgcolor={ratingColor(foundSentence?.rating)}>
                      {foundSentence?.rating && foundSentence.rating > 0 ? "+" : ""}
                      {foundSentence?.rating}
                    </TD>
                    <TD>
                      {foundSentence?.createdAt &&
                        new Date(foundSentence?.createdAt).toLocaleDateString()}
                    </TD>
                  </Box>
                )
              })
            )}
          </Box>
        </Box>
      </Box>
    </Grid>
  )
}

export default SentencesTable
