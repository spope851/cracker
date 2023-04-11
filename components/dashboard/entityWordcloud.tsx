import { Track } from "@/generated/graphql"
import { Box, Button, Grid, Tooltip, Typography } from "@mui/material"
import React, { useContext } from "react"
import { DashboardFilterContext } from "./context"
import { sentimentColor } from "./functions"

const EntityWordcloud: React.FC = () => {
  const {
    filteredEntities: entities,
    avgHours,
    findTokens,
    hideEntity,
  } = useContext(DashboardFilterContext)

  return (
    <Grid container item md={5} alignItems="stretch">
      <Box border="solid" borderRadius={2} p={5} textAlign="left" width="100%">
        {entities
          ? entities.map(({ entity: { name }, count, hide }, idx) => {
              if (hide) return <React.Fragment key={idx}></React.Fragment>
              const foundTokens = findTokens(name)
              return (
                <Tooltip
                  key={idx}
                  title={
                    <>
                      <Button
                        onClick={() => hideEntity(true, idx)}
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
                    key={idx}
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
