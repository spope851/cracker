import { Track } from "@/generated/graphql"
import {
  Box,
  Checkbox,
  Grid,
  Input,
  Stack,
  SxProps,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material"
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

type Text = {
  content: string
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

const Tokens: React.FC<{
  tokens?: Token[]
  loading: boolean
  rawData: Track[]
  avgHours: number
}> = ({ tokens, loading, rawData, avgHours }) => {
  const [filteredTokens, setFilteredTokens] = useState<FilteredToken[]>()
  const [tags, setTags] = useState<Tag[]>(defaultTags.slice(0, 4))
  const [minCount, setMinCount] = useState(2)

  useEffect(() => {
    ;(async () => {
      await fetch("/api/getCachedTokens", { method: "get" })
        .then((res) => res.json())
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
  console.log(rawData)

  const sentimentColor = (
    score: number
  ): "red" | "lime" | "paleGreen" | "yellow" | "lightCoral" => {
    if (score === 2) return "lime"
    else if (score === 1) return "paleGreen"
    else if (score === 0) return "yellow"
    else if (score === -1) return "lightCoral"
    else return "red"
  }

  return (
    <>
      <Grid container columnSpacing={5} justifyContent="space-between">
        <Grid container item md={9} mb={{ md: 0, sm: 5 }}>
          <Grid
            flex={1}
            border="solid"
            borderRadius={2}
            p={5}
            textAlign="left"
            height="500px"
            sx={{ overflowY: "auto", overflowX: "hidden" }}
          >
            {filteredTokens &&
              (loading ? (
                <Box component="tr">
                  <Box component="td">"...fetching"</Box>
                </Box>
              ) : (
                <Box
                  component="table"
                  width="100%"
                  sx={{ borderCollapse: "collapse" }}
                >
                  <Box component="thead">
                    <Box component="tr">
                      <TH>token</TH>
                      <TH>tag</TH>
                      <TH
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
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
                        />
                      </TH>
                    </Box>
                  </Box>
                  <Box component="tbody">
                    {filteredTokens.map((filteredToken) => {
                      const { token, count, hide } = filteredToken
                      return (
                        <Box component="tr" key={token.text.content}>
                          <TD>
                            <Checkbox
                              sx={{ p: 0, mr: 1 }}
                              defaultChecked={!hide}
                              onChange={(e) => {
                                const addOrRemove = (remove: boolean) =>
                                  setFilteredTokens([
                                    { token, count, hide: remove },
                                    ...filteredTokens.filter(
                                      (t) => t !== filteredToken
                                    ),
                                  ])
                                e.target.checked
                                  ? addOrRemove(false)
                                  : addOrRemove(true)
                              }}
                            />
                            {token.text.content}
                          </TD>
                          <TD>{token.partOfSpeech.tag}</TD>
                          <TD textAlign="center">{count}</TD>
                        </Box>
                      )
                    })}
                  </Box>
                </Box>
              ))}
          </Grid>
        </Grid>
        <Grid container item md={3}>
          <Grid
            container
            flex={1}
            border="solid"
            borderRadius={2}
            p={5}
            textAlign="left"
            height="500px"
            sx={{ overflowY: "auto", overflowX: "hidden" }}
            flexDirection="column"
            justifyContent="space-evenly"
          >
            <Box component="thead">
              <Stack component="tr" justifyContent="space-between" direction="row">
                <Box component="th">part of speech</Box>
                <Box component="th">count</Box>
              </Stack>
            </Box>
            {loading ? (
              "...fetching"
            ) : (
              <>
                {defaultTags.map((tag) => (
                  <React.Fragment key={tag}>
                    <Typography>
                      <Checkbox
                        sx={{ p: 0, mr: 1 }}
                        defaultChecked={tags.indexOf(tag) > -1}
                        onChange={(e) =>
                          e.target.checked
                            ? setTags([...tags, tag])
                            : setTags(tags.filter((t) => t !== tag))
                        }
                      />
                      {tag}
                      <Typography
                        fontWeight="bold"
                        component="span"
                        sx={{ float: "right" }}
                      >
                        {tokens?.filter((i) => i.partOfSpeech.tag === tag).length}
                      </Typography>
                    </Typography>
                  </React.Fragment>
                ))}
                <Typography variant="h6">
                  total:
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    component="span"
                    sx={{ float: "right" }}
                  >
                    {tokens?.length}
                  </Typography>
                </Typography>
              </>
            )}
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        md={12}
        border="solid"
        borderRadius={2}
        p={5}
        textAlign="left"
        my={5}
      >
        {filteredTokens &&
          filteredTokens.map(({ token, count, hide }) => {
            const foundTokens = rawData.filter((datum) =>
              new RegExp(`(\\b)${token.text.content}(\\b)`, "g").test(datum.overview)
            )
            if (hide) return <></>
            return (
              <Tooltip
                title={
                  <>
                    {(foundTokens.length > 0
                      ? foundTokens
                      : [{ overview: "", rating: 0 } as Track]
                    ).map((datum) => (
                      <Tooltip
                        key={datum.id}
                        placement="right"
                        title={
                          foundTokens.length > 0 && (
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
                            ? new Date(String(datum.createdAt)).toLocaleDateString()
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
          })}
      </Grid>
    </>
  )
}

export default Tokens
