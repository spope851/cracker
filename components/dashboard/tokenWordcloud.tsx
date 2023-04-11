import { Track } from "@/generated/graphql"
import { Box, Button, Grid, Tooltip, Typography } from "@mui/material"
import React, { useContext } from "react"
import { DashboardFilterContext } from "./context"
import { aboveAverage, ratingColor } from "./functions"

const TokenWordcloud: React.FC = () => {
  const {
    filteredTokens: tokens,
    hideToken,
    findTokens,
    avgHours,
  } = useContext(DashboardFilterContext)

  return (
    <Grid container item md={5} alignItems="stretch">
      <Box border="solid" borderRadius={2} p={5} textAlign="left" width="100%">
        {tokens
          ? tokens.map(({ token, count, hide }, idx) => {
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
                          <Typography color={ratingColor(datum.rating)}>
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

export default TokenWordcloud
