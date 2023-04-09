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

const Wordcloud: React.FC<{
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
    <Grid container item md={5} alignItems="stretch">
      <Box border="solid" borderRadius={2} p={5} textAlign="left" width="100%">
        {filteredTokens
          ? filteredTokens.map(({ token, count, hide }, idx) => {
              if (hide) return <React.Fragment key={idx}></React.Fragment>
              const foundTokens = findTokens(token.text.content)
              return (
                <Tooltip
                  key={idx}
                  title={
                    <>
                      <Button
                        onClick={() => hideToken(true, idx)}
                        variant="outlined"
                        // TODO: hover background color
                        sx={{ bgcolor: "#fff" }}
                        size="small"
                      >
                        hide
                      </Button>
                      {(foundTokens.length > 0
                        ? foundTokens
                        : [{ overview: "", rating: 0 } as Track]
                      ).map((datum) => (
                        <Tooltip
                          key={datum.id}
                          placement="right"
                          title={
                            findTokens.length > 0 && (
                              <>
                                <Typography
                                  display="flex"
                                  mb={"2px"}
                                  alignItems="center"
                                >
                                  rating:{" "}
                                  <Typography
                                    p={1}
                                    ml={1}
                                    component="span"
                                    bgcolor={sentimentColor(datum.rating)}
                                    color="#000"
                                    flex={1}
                                    display="flex"
                                    justifyContent="center"
                                  >
                                    {datum.rating > 0 && "+"}
                                    {datum.rating}
                                  </Typography>
                                </Typography>
                                <Typography display="flex" alignItems="center">
                                  hours:{" "}
                                  <Typography
                                    p={1}
                                    ml={1}
                                    component="span"
                                    bgcolor={
                                      datum.numberCreativeHours > avgHours
                                        ? "lime"
                                        : "red"
                                    }
                                    color="#000"
                                    flex={1}
                                    display="flex"
                                    justifyContent="center"
                                  >
                                    {datum.numberCreativeHours}
                                  </Typography>
                                </Typography>
                                <Tooltip
                                  placement="right"
                                  title={datum.overview
                                    .split(token.text.content)
                                    .map((part, idx, arr) => (
                                      <Typography component="span" key={idx}>
                                        {part}
                                        {idx < arr.length - 1 && (
                                          <Typography
                                            component="span"
                                            color="yellow"
                                            fontWeight="bold"
                                          >
                                            {token.text.content}
                                          </Typography>
                                        )}
                                      </Typography>
                                    ))}
                                >
                                  <Typography>{`overview >`}</Typography>
                                </Tooltip>
                              </>
                            )
                          }
                        >
                          <Typography color={sentimentColor(datum.rating)}>
                            {foundTokens.length > 0
                              ? new Date(
                                  String(datum.createdAt)
                                ).toLocaleDateString()
                              : "[IGNORED]"}
                          </Typography>
                        </Tooltip>
                      ))}
                    </>
                  }
                >
                  <Typography
                    component="span"
                    fontSize={Math.sqrt(count * 100)}
                    key={token.text.content}
                  >
                    {` ${token.text.content} `}
                  </Typography>
                </Tooltip>
              )
            })
          : "...fetching"}
      </Box>
    </Grid>
  )
}

export default Wordcloud
