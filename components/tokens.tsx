import { Track } from "@/generated/graphql"
import { Box, Grid, Tooltip, Typography } from "@mui/material"
import React, { ReactNode, useEffect, useState } from "react"

const TH: React.FC<{ children: ReactNode }> = ({ children }) => (
  <Box component="th" whiteSpace="nowrap" p={1}>
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

const tags = [
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

const Tokens: React.FC<{
  data: string
  rawData: Track[]
  avgHours: number
}> = ({ data, rawData, avgHours }) => {
  const [tokens, setTokens] = useState<any[]>()
  const [filteredTokens, setFilteredTokens] = useState<any[]>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      const req = await fetch("/api/nlp", { method: "post", body: data })
        .then((res) => res.json())
        .then((res) => {
          console.log(res)
          setTokens(res.tokens)
          setFilteredTokens(
            Array.from(res.tokens)
              .filter((i) => tags.indexOf(i.partOfSpeech.tag) < 4)
              .reduce((p: any[], c) => {
                const r = p
                const exists = p.find(
                  (i) =>
                    i.token.text.content.toLowerCase() ===
                    c.text.content.toLowerCase()
                )
                if (!exists) r.push({ token: c, count: 1 })
                else r[p.indexOf(exists)].count += 1
                return r
              }, [])
              .filter((i) => i.count !== 1)
              .sort((a, b) => (a.count < b.count ? 1 : -1))
          )
          setLoading(false)
        })
      return req
    })()
  }, [data])

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
    <Grid container justifyContent="space-evenly" display="flex" width="100%" mb={5}>
      <Grid
        item
        border="solid"
        borderRadius={2}
        p={5}
        textAlign="left"
        height="500px"
        sx={{ overflowY: "auto", overflowX: "hidden" }}
        md={9}
      >
        {filteredTokens &&
          (loading ? (
            <Box component="tr">
              <Box component="td">"...fetching"</Box>
            </Box>
          ) : (
            <Box component="table" width="100%" sx={{ borderCollapse: "collapse" }}>
              <Box component="thead">
                <Box component="tr">
                  <TH>token</TH>
                  <TH>tag</TH>
                  <TH>count</TH>
                </Box>
              </Box>
              <Box component="tbody">
                {filteredTokens.map(({ token, count }) => (
                  <Box component="tr" key={token.text.content}>
                    <TD>{token.text.content}</TD>
                    <TD>{token.partOfSpeech.tag}</TD>
                    <TD textAlign="center">{count}</TD>
                  </Box>
                ))}
              </Box>
            </Box>
          ))}
      </Grid>
      <Grid
        item
        md={2}
        border="solid"
        borderRadius={2}
        p={5}
        textAlign="left"
        sx={{ overflowY: "auto", overflowX: "hidden" }}
      >
        {loading ? (
          "...fetching"
        ) : (
          <>
            {tags.map((tag) => (
              <React.Fragment key={tag}>
                <Typography>
                  {tag}:{" "}
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
            <Typography variant="h6">total: {tokens?.length}</Typography>
          </>
        )}
      </Grid>
      <Grid
        item
        md={12}
        border="solid"
        borderRadius={2}
        p={5}
        m={5}
        textAlign="left"
      >
        {filteredTokens &&
          filteredTokens.map(({ token, count }) => (
            <Tooltip
              title={
                <>
                  {rawData
                    .filter((datum) => datum.overview.includes(token.text.content))
                    .map((datum) => (
                      <Tooltip
                        placement="right"
                        title={
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
                            <Tooltip placement="right" title={datum.overview}>
                              <Typography>{`overview >`}</Typography>
                            </Tooltip>
                          </>
                        }
                      >
                        <Typography color={sentimentColor(datum.rating)}>
                          {new Date(String(datum.createdAt)).toLocaleDateString()}
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
          ))}
      </Grid>
    </Grid>
  )
}

export default Tokens
