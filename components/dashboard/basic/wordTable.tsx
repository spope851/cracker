import { Box, Checkbox, Grid, Stack, TextField } from "@mui/material"
import React, { useContext } from "react"
import { TH, TD } from "../components"
import { DashboardFilterContext } from "../context"
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp"
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown"
import { WordTableSortColumn } from "@/types"

export const WordTable: React.FC = () => {
  const {
    minWordCount: [minCount, setMinCount],
    basicWords,
    loadingBasicWords: loading,
    hideWord,
    basicWordSortColumn: [sortColumn, setSortColumn],
    basicWordSortDir: [sortDir, setSortDir],
  } = useContext(DashboardFilterContext)

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

  const sort = (col: WordTableSortColumn) => {
    if (sortColumn === col) reverseDir()
    else setSortColumn(col)
  }

  return (
    <Grid container item md={8} sm={12} xs={12}>
      <Box
        boxShadow={
          "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;"
        }
        borderRadius={2}
        p={5}
        textAlign="left"
        width="100%"
        overflow="auto"
        maxHeight="500px"
      >
        <Stack flexDirection="row" columnGap={1} justifyContent="flex-end">
          <TextField
            type="number"
            label="min count"
            defaultValue={minCount}
            inputProps={{ min: 1 }}
            onChange={(e) => setMinCount(Number(e.target.value))}
            sx={{ width: "80px" }}
          />
        </Stack>
        <Box component="table" width="100%" sx={{ borderCollapse: "collapse" }}>
          <Box component="thead">
            <Box component="tr">
              <TH sx={thSx} onClick={() => sort("word")}>
                word {sortColumn === "word" && sortArrow}
              </TH>
              <TH sx={thSx} onClick={() => sort("count")}>
                count {sortColumn === "count" && sortArrow}
              </TH>
            </Box>
          </Box>
          <Box component="tbody">
            {loading ? (
              <Box component="tr">
                <Box component="td">...fetching</Box>
              </Box>
            ) : (
              basicWords &&
              basicWords.map((filteredToken, idx) => {
                const { word, count, hide } = filteredToken
                return (
                  <Box component="tr" key={idx}>
                    <TD>
                      <Checkbox
                        sx={{ p: 0, mr: 1 }}
                        checked={!hide}
                        onChange={(e) => {
                          if (word.text?.content) {
                            if (e.target.checked) hideWord(false, word.text.content)
                            else hideWord(true, word.text.content)
                          }
                        }}
                      />
                      {word.text?.content}
                    </TD>
                    <TD textAlign="center">{count}</TD>
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
