import { RatingInput } from "@/components/forms"
import { Box, Chip, FormControl, Grid, Typography } from "@mui/material"
import { Stack } from "@mui/system"
import React, { useContext } from "react"
import { TH, TD } from "../components"
import { DashboardFilterContext } from "../context"
import { aboveAverage, ratingColor } from "../functions"

export const SentencesTable: React.FC = () => {
  const {
    basicSentences: sentences,
    loadingBasic: loading,
    avgHours,
    sentenceTerms,
    removeSentenceTerm,
    basicSentencesRating: [sentencesRating, setSentencesRating],
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
                ({ text, numberCreativeHours, rating, createdAt }, idx) => {
                  return (
                    <Box key={idx} component="tr" color={"#000"}>
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
                                      sentenceTerms.includes(part)
                                        ? "bold"
                                        : "normal"
                                    }
                                  >
                                    {part}
                                  </Typography>
                                ))
                            : text?.content}
                        </Typography>
                      </TD>
                      <TD bgcolor={aboveAverage(avgHours, numberCreativeHours)}>
                        {numberCreativeHours}
                      </TD>
                      <TD bgcolor={ratingColor(rating)}>
                        {rating > 0 ? "+" : ""}
                        {rating}
                      </TD>
                      <TD>
                        {createdAt && new Date(createdAt).toLocaleDateString()}
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