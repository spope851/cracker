import { Box, Grid } from "@mui/material"
import React, { ReactNode, useEffect, useState } from "react"

type Sentiment = {
  magnitude: number
  score: number
}

type Entity = {
  sentiment: Sentiment
  mentions: any[]
  name: string
  salience: number
}

const TH: React.FC<{ children: ReactNode }> = ({ children }) => (
  <Box component="th" whiteSpace="nowrap" p={1}>
    {children}
  </Box>
)

const TD: React.FC<{ children: ReactNode }> = ({ children }) => (
  <Box component="td" border={2} p={1} borderColor="black">
    {children}
  </Box>
)

const Entities: React.FC<{
  data: string
}> = ({ data }) => {
  const [entities, setEntities] = useState<Entity[]>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      const req = await fetch("/api/nlp", { method: "post", body: data })
        .then((res) => res.json())
        .then((res) => {
          setEntities(res.entities)
          setLoading(false)
        })
      return req
    })()
  }, [data])

  const sentimentColor = (score: number): "red" | "green" | "grey" => {
    if (score > 0) return "green"
    if (score < 0) return "red"
    return "grey"
  }

  return (
    <Grid container md={7} justifyContent="space-evenly">
      <Box
        border="solid"
        borderRadius={2}
        p={5}
        m={5}
        textAlign="left"
        width="100%"
        height="500px"
        sx={{ overflowY: "auto", overflowX: "hidden" }}
      >
        <Box component="table" width="100%" sx={{ borderCollapse: "collapse" }}>
          <Box component="thead">
            <TH>entity</TH>
            <TH># mentions</TH>
            <TH>salience</TH>
            <TH>sentiment score</TH>
            <TH>sentiment magnitude</TH>
          </Box>
          {loading
            ? "...fetching"
            : entities &&
              entities.map((entity, idx) => {
                return (
                  <Box
                    key={idx}
                    component="tr"
                    color={sentimentColor(entity.sentiment.score)}
                    fontWeight={Math.abs(entity.sentiment.score) > 0 ? "bold" : ""}
                  >
                    <TD>{entity.name}</TD>
                    <TD>{entity.mentions.length}</TD>
                    <TD>{Number(entity.salience).toFixed(3)}</TD>
                    <TD>{Number(entity.sentiment.score).toFixed(3)}</TD>
                    <TD>{Number(entity.sentiment.magnitude).toFixed(3)}</TD>
                  </Box>
                )
              })}
        </Box>
      </Box>
    </Grid>
  )
}

export default Entities
