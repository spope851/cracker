import { Track } from "@/generated/graphql"
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  Grid,
  InputLabel,
  ListItemText,
  ListSubheader,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Stack,
  SxProps,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material"
import { Text } from "./types"
import React, { ReactNode, useEffect, useState } from "react"

const TH: React.FC<{ children: ReactNode; sx?: SxProps }> = ({ children, sx }) => (
  <Box component="th" whiteSpace="nowrap" p={1} sx={sx}>
    {children}
  </Box>
)

const TD: React.FC<{ children: ReactNode; textAlign?: "center" }> = ({
  children,
  textAlign,
}) => (
  <Box component="td" border={2} p={1} borderColor="black" textAlign={textAlign}>
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

const defaultTags: Tag[] = [
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

type PartOfSpeech = {
  tag: Tag
}

export type Token = {
  partOfSpeech: PartOfSpeech
  text: Text
}

type FilteredToken = {
  token: Token
  count: number
  hide: boolean
}

// const ITEM_HEIGHT = 48
// const ITEM_PADDING_TOP = 8
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 250,
//     },
//   },
// }

const Tokens: React.FC<{
  tokens?: Token[]
  loading: boolean
  rawData: Track[]
  avgHours: number
}> = ({ tokens, loading, rawData, avgHours }) => {
  const [filteredTokens, setFilteredTokens] = useState<FilteredToken[]>()
  const [tags, setTags] = useState<string[]>(defaultTags.slice(0, 4))
  const [minCount, setMinCount] = useState(2)

  useEffect(() => {
    ;(async () => {
      await fetch("/api/getCachedTokens", { method: "get" })
        .then((res) => res.json())
        // TODO: implement token caching
        .then((res) => {
          setFilteredTokens(
            tokens
              // filter by tag
              ?.filter((i) => tags.indexOf(i.partOfSpeech.tag) > -1)
              // get counts
              .reduce((p: any[], c) => {
                const r = p
                const exists = p.find(
                  (i) =>
                    i.token.text.content.toLowerCase() ===
                    c.text.content.toLowerCase()
                )
                if (!exists)
                  r.push({
                    token: c,
                    count: 1,
                    hide:
                      // filteredTokens?.find((t) => t.token === c)?.hide ||
                      // res[c.text.content].hide ||
                      false,
                  })
                else r[p.indexOf(exists)].count += 1
                return r
              }, [])
              // filter by minCount
              .filter((i) => i.count >= minCount)
              .sort((a, b) => (a.count < b.count ? 1 : -1))
          )
        })
        .finally(
          async () =>
            await fetch("/api/cacheTokens", {
              method: "post",
              body: JSON.stringify(
                filteredTokens?.reduce((p, c) => {
                  return { ...p, [c.token.text.content]: { hide: c.hide } }
                }, {})
              ),
            })
        )
    })()
  }, [tokens, tags, minCount])

  const sentimentColor = (
    score: number
  ): "red" | "lime" | "paleGreen" | "yellow" | "lightCoral" => {
    if (score === 2) return "lime"
    else if (score === 1) return "paleGreen"
    else if (score === 0) return "yellow"
    else if (score === -1) return "lightCoral"
    else return "red"
  }

  const hideToken = (hide: boolean, idx: number) => {
    setFilteredTokens((oldTokens) => {
      let newTokens
      if (oldTokens) {
        newTokens = [...oldTokens]
        newTokens[idx].hide = hide
      }
      return newTokens
    })
  }

  const findTokens = (content: string) =>
    rawData.filter((datum) =>
      new RegExp(`(\\b)${content}(\\b)`, "g").test(datum.overview)
    )

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event
    setTags(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    )
  }

  return (
    <Grid container item md={8} columnSpacing={5} justifyContent="space-between">
      <Grid container item mb={{ md: 0, sm: 5 }}>
        <Grid
          flex={1}
          border="solid"
          borderRadius={2}
          p={5}
          textAlign="left"
          maxHeight="500px"
          sx={{ overflowY: "auto", overflowX: "hidden" }}
        >
          <Box component="table" width="100%" sx={{ borderCollapse: "collapse" }}>
            <Box component="thead">
              <Box component="tr">
                <TH>token</TH>
                <TH>tag</TH>
                <TH
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  count{" "}
                  <TextField
                    type="number"
                    label="min count"
                    defaultValue={minCount}
                    inputProps={{ min: 1 }}
                    onChange={(e) => setMinCount(Number(e.target.value))}
                    sx={{ ml: "auto", width: "80px" }}
                  />
                  <FormControl sx={{ ml: 1 }}>
                    <InputLabel id="demo-multiple-checkbox-label">
                      part of speech
                    </InputLabel>
                    <Select
                      labelId="demo-multiple-checkbox-label"
                      id="demo-multiple-checkbox"
                      multiple
                      value={tags}
                      onChange={handleChange}
                      input={<OutlinedInput label="part of speech" />}
                      renderValue={(selected) => selected.join(", ")}
                      // MenuProps={MenuProps}
                    >
                      <ListSubheader
                        sx={{ display: "flex", justifyContent: "space-between" }}
                      >
                        <Typography>part of speech</Typography>
                        <Typography>count</Typography>
                      </ListSubheader>
                      {defaultTags.map((tag) => (
                        <MenuItem key={tag} value={tag}>
                          <Checkbox checked={tags.indexOf(tag) > -1} />
                          <ListItemText primary={tag} />
                          <Typography
                            fontWeight="bold"
                            component="span"
                            sx={{ float: "right" }}
                          >
                            {
                              tokens?.filter((i) => i.partOfSpeech.tag === tag)
                                .length
                            }
                          </Typography>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </TH>
              </Box>
            </Box>
            <Box component="tbody">
              {loading ? (
                <Box component="tr">
                  <Box component="td">...fetching</Box>
                </Box>
              ) : (
                filteredTokens &&
                filteredTokens.map((filteredToken, idx) => {
                  const { token, count, hide } = filteredToken
                  return (
                    <Box component="tr" key={idx}>
                      <TD>
                        <Checkbox
                          sx={{ p: 0, mr: 1 }}
                          checked={!hide}
                          onChange={(e) => {
                            if (e.target.checked) hideToken(false, idx)
                            else hideToken(true, idx)
                          }}
                        />
                        {token.text.content}
                      </TD>
                      <TD>{token.partOfSpeech.tag}</TD>
                      <TD textAlign="center">{count}</TD>
                    </Box>
                  )
                })
              )}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Tokens
