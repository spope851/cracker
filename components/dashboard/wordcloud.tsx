import { Box, Grid } from "@mui/material"
import React, { useContext, useMemo, useState } from "react"
import { DashboardFilterContext } from "./context"
import ReactWordcloud, { CallbacksProp, OptionsProp, Word } from "react-wordcloud"
import { WordcloudPopover } from "./wordcloudPopover"
// import { sticky } from "tippy.js"

export const Wordcloud: React.FC<{ words?: Word[] }> = ({ words: wordsProp }) => {
  const [popoverOpen, setPopoverOpen] = useState(false)
  const [popoverEntity, setPopoverEntity] = useState("")
  const { sentenceTerms } = useContext(DashboardFilterContext)

  const options: OptionsProp = useMemo(() => {
    return {
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
    }
  }, [])

  const callbacks: CallbacksProp = useMemo(() => {
    return {
      getWordColor: (word) =>
        sentenceTerms.includes(word.text)
          ? "lime"
          : ["red", "blue", "brown", "purple"][word.value % 4],
      onWordClick: (word) => {
        setPopoverOpen(true)
        setPopoverEntity(word.text)
      },
    }
  }, [sentenceTerms])

  const words: Word[] | undefined = useMemo(() => {
    return wordsProp
  }, [wordsProp])

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
        boxShadow={
          "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;"
        }
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
            options={options}
            callbacks={callbacks}
            words={words}
          />
        ) : (
          "...fetching"
        )}
      </Box>
    </Grid>
  )
}
