import {
  Box,
  Checkbox,
  FormControl,
  Grid,
  InputLabel,
  ListItemText,
  ListSubheader,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material"
import React, { useContext } from "react"
import { TH, TD } from "./components"
import { DashboardFilterContext } from "./context"

export const TokenTable: React.FC = () => {
  const {
    minTokenCount: minCount,
    setMinTokenCount: setMinCount,
    filteredTokens: tokens,
    loading,
    handleTokenTagsChange: handleTagsChange,
    hideToken,
    tokenTags: tags,
    tokenTagCounts: tagCounts,
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
          <FormControl>
            <InputLabel>part of speech</InputLabel>
            <Select
              multiple
              value={tags as string[]}
              onChange={handleTagsChange}
              input={<OutlinedInput label="part of speech" />}
              renderValue={(selected) => selected.join(", ")}
            >
              <ListSubheader
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <Typography>part of speech</Typography>
                <Typography>count</Typography>
              </ListSubheader>
              {tagCounts &&
                tagCounts.map(({ tag, count }) => (
                  <MenuItem key={tag} value={tag || ""}>
                    <Checkbox checked={tag ? tags.indexOf(tag) > -1 : false} />
                    <ListItemText primary={tag} />
                    <Typography
                      fontWeight="bold"
                      component="span"
                      sx={{ float: "right" }}
                    >
                      {count}
                    </Typography>
                  </MenuItem>
                ))}
              <ListSubheader
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <Typography variant="h6">total:</Typography>
                <Typography variant="h6">
                  {tagCounts?.reduce((p, c) => p + c.count, 0)}
                </Typography>
              </ListSubheader>
            </Select>
          </FormControl>
        </Stack>
        <Box component="table" width="100%" sx={{ borderCollapse: "collapse" }}>
          <Box component="thead">
            <Box component="tr">
              <TH>token</TH>
              <TH>tag</TH>
              <TH>count</TH>
            </Box>
          </Box>
          <Box component="tbody">
            {loading ? (
              <Box component="tr">
                <Box component="td">...fetching</Box>
              </Box>
            ) : (
              tokens &&
              tokens.map((filteredToken, idx) => {
                const { token, count, hide } = filteredToken
                return (
                  <Box component="tr" key={idx}>
                    <TD>
                      <Checkbox
                        sx={{ p: 0, mr: 1 }}
                        checked={!hide}
                        onChange={(e) => {
                          if (token.text?.content) {
                            if (e.target.checked)
                              hideToken(false, token.text.content)
                            else hideToken(true, token.text.content)
                          }
                        }}
                      />
                      {token.text?.content}
                    </TD>
                    <TD>{token.partOfSpeech?.tag}</TD>
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
