import { Box, Checkbox, Grid, TextField } from "@mui/material"
import React, { useContext } from "react"
import { TH, TD } from "./components"
import { DashboardFilterContext } from "./context"

const sentimentColor = (score: number): "lightCoral" | "paleGreen" | "#fff" => {
  if (score > 0) return "paleGreen"
  if (score < 0) return "lightCoral"
  return "#fff"
}

const EntityTable: React.FC = () => {
  const {
    loading,
    filteredEntities: entities,
    hideEntity,
    minEntityCount: minCount,
    setMinEntityCount: setMinCount,
  } = useContext(DashboardFilterContext)

  return (
    <Grid container item md={8}>
      <Box
        border="solid"
        borderRadius={2}
        p={5}
        textAlign="left"
        width="100%"
        overflow="auto"
        maxHeight="500px"
      >
        <Box component="table" width="100%" sx={{ borderCollapse: "collapse" }}>
          <Box component="thead">
            <Box component="tr">
              <TH>entity</TH>
              <TH>salience</TH>
              <TH>score</TH>
              <TH>magnitude</TH>
              <TH
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
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
                  sx={{ ml: "auto", width: "80px" }}
                />
              </TH>
            </Box>
          </Box>
          <Box component="tbody">
            {loading ? (
              <Box component="tr">
                <Box component="td">...fetching</Box>
              </Box>
            ) : (
              entities &&
              entities.map(({ entity, count, hide }, idx) => {
                const bgcolor = sentimentColor(entity.sentiment.score)
                return (
                  <Box
                    key={idx}
                    component="tr"
                    color={"#000"}
                    fontWeight={Math.abs(entity.sentiment.score) > 0 ? "bold" : ""}
                  >
                    <TD bgcolor={bgcolor}>
                      <Checkbox
                        sx={{ p: 0, mr: 1 }}
                        checked={!hide}
                        onChange={(e) => {
                          if (e.target.checked) hideEntity(false, idx)
                          else hideEntity(true, idx)
                        }}
                      />
                      {entity.name}
                    </TD>
                    <TD bgcolor={bgcolor}>{Number(entity.salience).toFixed(3)}</TD>
                    <TD bgcolor={bgcolor}>
                      {Number(entity.sentiment.score).toFixed(3)}
                    </TD>
                    <TD bgcolor={bgcolor}>
                      {Number(entity.sentiment.magnitude).toFixed(3)}
                    </TD>
                    <TD bgcolor={bgcolor} textAlign="center">
                      {count}
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

export default EntityTable
