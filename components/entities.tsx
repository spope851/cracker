import { Box, Grid } from "@mui/material"
import React, { ReactNode } from "react"

type Sentiment = {
  magnitude: number
  score: number
}

export type Entity = {
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

const TD: React.FC<{ children: ReactNode; bgcolor?: string }> = ({
  children,
  bgcolor = "#fff",
}) => (
  <Box component="td" border={2} p={1} borderColor="black" bgcolor={bgcolor}>
    {children}
  </Box>
)

const Entities: React.FC<{
  entities?: Entity[]
  loading: boolean
}> = ({ entities, loading }) => {
  const sentimentColor = (score: number): "lightCoral" | "paleGreen" | "#fff" => {
    if (score > 0) return "paleGreen"
    if (score < 0) return "lightCoral"
    return "#fff"
  }

  return (
    <Grid container item md={6} justifyContent="space-evenly">
      <Box
        border="solid"
        borderRadius={2}
        p={5}
        textAlign="left"
        width="100%"
        overflow="auto"
        height="500px"
      >
        <Box component="table" width="100%" sx={{ borderCollapse: "collapse" }}>
          <Box component="thead">
            <Box component="tr">
              <TH>entity</TH>
              <TH># mentions</TH>
              <TH>salience</TH>
              <TH>sentiment score</TH>
              <TH>sentiment magnitude</TH>
            </Box>
          </Box>
          <Box component="tbody">
            {loading ? (
              <Box component="tr">
                <Box component="td">...fetching</Box>
              </Box>
            ) : (
              entities &&
              entities.map((entity, idx) => {
                const bgcolor = sentimentColor(entity.sentiment.score)
                return (
                  <Box
                    key={idx}
                    component="tr"
                    color={"#000"}
                    fontWeight={Math.abs(entity.sentiment.score) > 0 ? "bold" : ""}
                  >
                    <TD bgcolor={bgcolor}>{entity.name}</TD>
                    <TD bgcolor={bgcolor}>{entity.mentions.length}</TD>
                    <TD bgcolor={bgcolor}>{Number(entity.salience).toFixed(3)}</TD>
                    <TD bgcolor={bgcolor}>
                      {Number(entity.sentiment.score).toFixed(3)}
                    </TD>
                    <TD bgcolor={bgcolor}>
                      {Number(entity.sentiment.magnitude).toFixed(3)}
                    </TD>
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

export default Entities
