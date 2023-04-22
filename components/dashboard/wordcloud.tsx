import { Box, Grid } from "@mui/material"
import React, { useContext, useMemo, useState } from "react"
import { DashboardFilterContext } from "./context"
import ReactWordcloud, { Word } from "react-wordcloud"
import WordcloudPopover from "./wordcloudPopover"

const Wordcloud: React.FC<{ words?: Word[] }> = ({ words }) => {
  const [popoverOpen, setPopoverOpen] = useState(false)
  const [popoverEntity, setPopoverEntity] = useState("")
  const { sentenceTerms, maxWidth } = useContext(DashboardFilterContext)

  const size: [number, number] = useMemo(() => {
    return [800, 800]
  }, [])

  return (
    <Grid
      container
      item
      md={5}
      alignItems="stretch"
      overflow="auto"
      maxWidth={{ sm: maxWidth, xs: maxWidth }}
    >
      <WordcloudPopover
        word={popoverEntity}
        open={popoverOpen}
        setOpen={setPopoverOpen}
      />
      <Box
        border="solid"
        borderRadius={2}
        p={5}
        textAlign="left"
        width="100%"
        overflow="auto"
        maxHeight="500px"
      >
        {words ? (
          <ReactWordcloud
            size={size}
            options={{
              deterministic: true,
              fontSizes: [24, 72],
              svgAttributes: { style: "transform: translate(-180px, -130px);" },
            }}
            callbacks={{
              getWordColor: (word) =>
                sentenceTerms.includes(word.text)
                  ? "lime"
                  : ["red", "blue", "brown", ""][word.value % 4],
              onWordClick: (word) => {
                setPopoverOpen(true)
                setPopoverEntity(word.text)
              },
            }}
            words={words}
          />
        ) : (
          "...fetching"
        )}
      </Box>
    </Grid>
  )
}

export default Wordcloud
