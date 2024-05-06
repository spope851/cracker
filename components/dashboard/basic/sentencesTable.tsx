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
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp"
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown"
import { SentenceTableSortColumn } from "@/types"
import { HoursSlider } from "@/components/hoursSlider"

export const SentencesTable: React.FC = () => {
  const {
    basicSentences: sentences,
    loadingBasicSentences: loading,
    avgHours,
    basicSentenceTerms,
    removeSentenceTerm,
    basicSentencesRating: [sentencesRating, setSentencesRating],
    basicPreQueryRating: [preQueryRating],
    basicSentenceSortColumn: [sortColumn, setSortColumn],
    basicSentenceSortDir: [sortDir, setSortDir],
    basicPostQueryMinHours,
    basicPostQueryMaxHours,
  } = useContext(DashboardFilterContext)

  const menuItemsFromRatings = (ratings: number[] | null) =>
    ratings?.map((rating) => (
      <MenuItem key={rating} value={rating}>{`${
        rating > 0 ? "+" : ""
      }${rating}`}</MenuItem>
    ))

  const sortArrow =
    sortDir === "asc" ? (
      <KeyboardDoubleArrowUpIcon />
    ) : (
      <KeyboardDoubleArrowDownIcon />
    )

  const thSx = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
  }

  const reverseDir = () =>
    setSortDir((c) => {
      if (c === "asc") return "desc"
      else return "asc"
    })

  const sort = (col: SentenceTableSortColumn) => {
    if (sortColumn === col) reverseDir()
    else setSortColumn(col)
  }

  return (
    <Grid container item md={7} sm={12} xs={12} mb={{ md: 0, sm: 5, xs: 5 }}>
      <Box
        boxShadow={
          "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;"
        }
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
            md={5}
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
            md={7}
            display="flex"
            justifyContent="flex-end"
            direction="row"
            alignItems="center"
            columnGap={5}
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
            <HoursSlider min={basicPostQueryMinHours} max={basicPostQueryMaxHours} />
          </Grid>
        </Stack>
        <Box component="table" width="100%" sx={{ borderCollapse: "collapse" }}>
          <Box component="thead">
            <Box component="tr">
              <TH sx={thSx} onClick={() => sort("sentence")}>
                sentence {sortColumn === "sentence" && sortArrow}
              </TH>
              <TH sx={thSx} onClick={() => sort("hours")}>
                hours {sortColumn === "hours" && sortArrow}
              </TH>
              <TH sx={thSx} onClick={() => sort("rating")}>
                rating {sortColumn === "rating" && sortArrow}
              </TH>
              <TH sx={thSx} onClick={() => sort("date")}>
                date {sortColumn === "date" && sortArrow}
              </TH>
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
