import {
  Box,
  Checkbox,
  FormControl,
  Grid,
  InputLabel,
  ListItemText,
  ListSubheader,
  MenuItem,
  OutlinedInput,
  Select,
  SxProps,
  TextField,
  Typography,
} from "@mui/material"
import React, { ReactNode, useContext } from "react"
import { defaultTags } from "./constants"
import { DashboardFilterContext } from "./context"

const TH: React.FC<{ children: ReactNode; sx?: SxProps }> = ({ children, sx }) => (
  <Box component="th" whiteSpace="nowrap" p={1} sx={sx}>
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

// const ITEM_HEIGHT = 48
// const ITEM_PADDING_TOP = 8
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 250,
//     },
//   },
// }

const Tokens: React.FC = () => {
  const {
    minTokenCount: minCount,
    setMinTokenCount: setMinCount,
    filteredTokens: tokens,
    loading,
    handleTokenTagsChange: handleTagsChange,
    hideToken,
    tokenTags: tags,
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
              <TH>token</TH>
              <TH>tag</TH>
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
                <FormControl sx={{ ml: 1 }}>
                  <InputLabel id="demo-multiple-checkbox-label">
                    part of speech
                  </InputLabel>
                  <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={tags}
                    onChange={handleTagsChange}
                    input={<OutlinedInput label="part of speech" />}
                    renderValue={(selected) => selected.join(", ")}
                    // MenuProps={MenuProps}
                  >
                    <ListSubheader
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Typography>part of speech</Typography>
                      <Typography>count</Typography>
                    </ListSubheader>
                    {defaultTags.map((tag) => (
                      <MenuItem key={tag} value={tag}>
                        <Checkbox checked={tags.indexOf(tag) > -1} />
                        <ListItemText primary={tag} />
                        <Typography
                          fontWeight="bold"
                          component="span"
                          sx={{ float: "right" }}
                        >
                          {
                            tokens?.filter((i) => i.token.partOfSpeech.tag === tag)
                              .length
                          }
                        </Typography>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </TH>
            </Box>
          </Box>
          <Box component="tbody">
            {loading ? (
              <Box component="tr">
                <Box component="td">...fetching</Box>
              </Box>
            ) : (
              tokens &&
              tokens.map((filteredToken, idx) => {
                const { token, count, hide } = filteredToken
                return (
                  <Box component="tr" key={idx}>
                    <TD>
                      <Checkbox
                        sx={{ p: 0, mr: 1 }}
                        checked={!hide}
                        onChange={(e) => {
                          if (e.target.checked) hideToken(false, idx)
                          else hideToken(true, idx)
                        }}
                      />
                      {token.text.content}
                    </TD>
                    <TD>{token.partOfSpeech.tag}</TD>
                    <TD textAlign="center">{count}</TD>
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

export default Tokens
