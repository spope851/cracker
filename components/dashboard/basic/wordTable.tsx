import { Box, Checkbox, Grid, Stack, TextField } from "@mui/material"
import React, { useContext } from "react"
import { TH, TD } from "../components"
import { DashboardFilterContext } from "../context"

export const WordTable: React.FC = () => {
  const {
    minWordCount: [minCount, setMinCount],
    basicWords,
    loadingBasic: loading,
    hideWord,
  } = useContext(DashboardFilterContext)

  return (
    <Grid container item md={8} sm={12} xs={12}>
      <Box
        border="solid"
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
              <TH>word</TH>
              <TH>count</TH>
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
