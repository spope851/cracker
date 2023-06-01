import {
  Box,
  Chip,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material"
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
    basicSentenceTerms,
    removeSentenceTerm,
    basicSentencesRating: [sentencesRating, setSentencesRating],
    basicPreQueryRating: [preQueryRating],
  } = useContext(DashboardFilterContext)

  const menuItemsFromRatings = (ratings: number[] | null) =>
    ratings?.map((rating) => (
      <MenuItem key={rating} value={rating}>{`${
        rating > 0 ? "+" : ""
      }${rating}`}</MenuItem>
    ))

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
            {basicSentenceTerms.length > 0 && (
              <>
                <Typography>term:</Typography>
                {basicSentenceTerms.map((term, idx) => (
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
            <FormControl sx={{ width: 150 }}>
              <InputLabel>rating(s)</InputLabel>
              <Select
                multiple
                value={sentencesRating || []}
                label="rating(s)"
                onChange={(e) => {
                  setSentencesRating(
                    e.target.value.length > 0 ? (e.target.value as number[]) : null
                  )
                }}
              >
                {preQueryRating === null
                  ? menuItemsFromRatings([-2, -1, 0, 1, 2])
                  : menuItemsFromRatings(preQueryRating)}
              </Select>
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
                          {basicSentenceTerms.length > 0
                            ? text?.content
                                ?.split(
                                  new RegExp(
                                    `(\\b)(?=${basicSentenceTerms.join(
                                      "|"
                                    )})|(?<=${basicSentenceTerms.join("|")})(\\b)`,
                                    "g"
                                  )
                                )
                                .map((part, idx) => (
                                  <Typography
                                    key={idx}
                                    component="span"
                                    fontWeight={
                                      basicSentenceTerms.includes(part)
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
