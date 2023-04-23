import { Box, Grid } from "@mui/material"
import React, { useContext, useMemo, useState } from "react"
import { DashboardFilterContext } from "./context"
import ReactWordcloud, { Word } from "react-wordcloud"
import WordcloudPopover from "./wordcloudPopover"
// import { sticky } from "tippy.js"

const Wordcloud: React.FC<{ words?: Word[] }> = ({ words }) => {
  const [popoverOpen, setPopoverOpen] = useState(false)
  const [popoverEntity, setPopoverEntity] = useState("")
  const { sentenceTerms } = useContext(DashboardFilterContext)

  const size: [number, number] = useMemo(() => {
    return [800, 800]
  }, [])

  return (
    <Grid container item md={5} sm={12} xs={12} alignItems="stretch" overflow="auto">
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
              svgAttributes: { style: "transform: translate(-120px, -100px);" },
              fontFamily: "arial-black",
              // these tippy props have no effect. reaching out to the authors of react-wordcloud about this issue
              // tooltipOptions: {
              //   interactive: true,
              //   interactiveBorder: 100,
              //   interactiveDebounce: 100,
              //   appendTo: () => document.body,
              //   sticky: true,
              //   plugins: [sticky],
              // },
            }}
            callbacks={{
              getWordColor: (word) =>
                sentenceTerms.includes(word.text)
                  ? "lime"
                  : ["red", "blue", "brown", "purple"][word.value % 4],
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
