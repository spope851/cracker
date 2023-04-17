import { Track } from "@/generated/graphql"
import { Box, Button, Grid, Stack, Tooltip, Typography } from "@mui/material"
import React, { useContext } from "react"
import { DashboardFilterContext } from "./context"
import { aboveAverage, ratingColor } from "./functions"

const EntityWordcloud: React.FC = () => {
  const {
    filteredEntities: entities,
    avgHours,
    findTokens: findEntities,
    hideEntity,
    sentenceTerms,
    addSentenceTerm,
  } = useContext(DashboardFilterContext)

  return (
    <Grid container item md={5} alignItems="stretch" overflow="auto">
      <Box
        border="solid"
        borderRadius={2}
        p={5}
        textAlign="left"
        width="100%"
        overflow="auto"
        maxHeight="500px"
      >
        {entities
          ? entities.map(({ entity: { name }, count, hide }, idx) => {
              if (hide || !name) return <React.Fragment key={idx}></React.Fragment>
              const foundEntities = findEntities(name)
              return (
                <Tooltip
                  key={idx}
                  title={
                    <>
                      <Stack rowGap={1}>
                        <Button
                          onClick={() => hideEntity(true, idx)}
                          variant="outlined"
                          // TODO: hover background color
                          sx={{ bgcolor: "#fff" }}
                          size="small"
                        >
                          hide
                        </Button>
                        <Button
                          onClick={() => addSentenceTerm(name)}
                          variant="outlined"
                          // TODO: hover background color
                          sx={{ bgcolor: "#fff" }}
                          size="small"
                        >
                          filter sentences
                        </Button>
                      </Stack>
                      {(foundEntities && foundEntities.length > 0
                        ? foundEntities
                        : [{ overview: "", rating: 0, id: "x" } as Track]
                      ).map((datum) => (
                        <Tooltip
                          key={datum.id}
                          placement="right"
                          title={
                            foundEntities &&
                            foundEntities.length > 0 && (
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
                                    bgcolor={ratingColor(datum.rating)}
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
                                    bgcolor={aboveAverage(
                                      avgHours,
                                      datum.numberCreativeHours
                                    )}
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
                                    .split(name)
                                    .map((part, idx, arr) => (
                                      <Typography component="span" key={idx}>
                                        {part}
                                        {idx < arr.length - 1 && (
                                          <Typography
                                            component="span"
                                            color="yellow"
                                            fontWeight="bold"
                                          >
                                            {name}
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
                          <Typography color={ratingColor(datum.rating)}>
                            {foundEntities && foundEntities.length > 0
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
                    key={idx}
                    border={sentenceTerms.includes(name) ? "solid lime" : "none"}
                    p={sentenceTerms.includes(name) ? 1 : 0}
                    m={sentenceTerms.includes(name) ? 1 : 0}
                  >
                    {` ${name} `}
                  </Typography>
                </Tooltip>
              )
            })
          : "...fetching"}
      </Box>
    </Grid>
  )
}

export default EntityWordcloud
