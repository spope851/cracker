import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Switch,
  Tab,
  Tabs,
} from "@mui/material"
import React, { useContext } from "react"
import { RunningAverage } from "@/types"
import { DashboardFilterContext } from "../context"
import { useRouter } from "next/router"
import { UserContext } from "@/context/userContext"
import { EntityTable } from "./entityTable"
import { Metrics } from "../metrics"
import { SentencesTable } from "./sentencesTable"
import { TokenTable } from "./tokenTable"
import { Wordcloud } from "../wordcloud"
import { styled } from "@mui/material/styles"

const ResponsiveSwitch: React.FC<{ onChange?: () => void; mobile?: boolean }> = ({
  onChange,
  mobile,
}) => {
  const StyledSwitch = styled(FormControlLabel)(({ theme }) => ({
    [theme.breakpoints.only("xs")]: {
      display: mobile ? "flex" : "none",
    },
    [theme.breakpoints.not("xs")]: {
      display: mobile ? "none" : "flex",
      marginLeft: "auto",
      marginRight: 1,
    },
  }))
  return (
    <StyledSwitch
      control={<Switch defaultChecked onChange={onChange} />}
      label="premium"
      labelPlacement="start"
    />
  )
}

const CALC_MAX_WIDTH = "calc(100vw - 40px)"

const maxWidth = {
  sm: CALC_MAX_WIDTH,
  xs: CALC_MAX_WIDTH,
}

const RUNNING_AVG_WIDTH = 150
const RUNNING_AVG_MR = 5

const PremiumDashboard: React.FC = () => {
  const router = useRouter()
  const { lastPost } = useContext(UserContext)
  const {
    premium: [, setPremium],
    premiumRunningAvg: [premiumRunningAvg, setPremiumRunningAvg],
    analyzeEntities,
    setAnalyzeEntities,
    daysOfUse,
    filteredEntities: entities,
    filteredTokens: tokens,
  } = useContext(DashboardFilterContext)

  if (!lastPost)
    return (
      <Button onClick={() => router.push("/track")} variant="outlined">
        no data... click to track
      </Button>
    )

  return (
    <Box m={5}>
      <Stack
        flexDirection={{ md: "row", sm: "row", xs: "column" }}
        mb={1}
        rowGap={1}
      >
        <Stack
          direction="row"
          rowGap={1}
          justifyContent="space-between"
          alignItems="center"
        >
          <FormControl
            sx={{
              width: { md: RUNNING_AVG_WIDTH, sm: RUNNING_AVG_WIDTH },
              mr: { md: RUNNING_AVG_MR, sm: RUNNING_AVG_MR },
              flexGrow: { md: 0, sm: 0, xs: 1 },
            }}
          >
            <InputLabel>running average</InputLabel>
            <Select
              value={premiumRunningAvg}
              label="Running Average"
              onChange={(e) =>
                setPremiumRunningAvg(e.target.value as RunningAverage)
              }
            >
              <MenuItem value="30">30 days</MenuItem>
              <MenuItem disabled={daysOfUse ? daysOfUse < 30 : true} value={"60"}>
                60 days
              </MenuItem>
              <MenuItem disabled={daysOfUse ? daysOfUse < 60 : true} value={"90"}>
                90 days
              </MenuItem>
            </Select>
          </FormControl>
          <ResponsiveSwitch onChange={() => setPremium(false)} mobile />
        </Stack>
        <Tabs
          scrollButtons
          variant="scrollable"
          allowScrollButtonsMobile
          value={analyzeEntities ? 0 : 1}
          onChange={(e) => {
            if (e.type === "change") setPremium(false)
            else setAnalyzeEntities(!analyzeEntities)
          }}
          sx={{ borderBottom: 1, borderColor: "divider", width: "100%" }}
        >
          <Tab label="analyze entities" />
          <Tab label="analyze tokens" />
          <ResponsiveSwitch />
        </Tabs>
      </Stack>
      <Grid
        container
        justifyContent="space-between"
        columnSpacing={5}
        maxWidth={maxWidth}
        mb={5}
      >
        <Metrics />
        {analyzeEntities ? <EntityTable /> : <TokenTable />}
      </Grid>
      <Grid container columnSpacing={5} maxWidth={maxWidth}>
        <SentencesTable />
        <Wordcloud
          words={
            analyzeEntities
              ? entities &&
                entities.map(({ entity, count, hide }, idx) => {
                  return hide
                    ? { text: "", value: 0, key: idx }
                    : { text: entity.name || "", value: count, key: idx }
                })
              : tokens &&
                tokens.map(({ token, count, hide }, idx) => {
                  return hide
                    ? { text: "", value: 0, key: idx }
                    : { text: token.text?.content || "", value: count, key: idx }
                })
          }
        />
      </Grid>
    </Box>
  )
}

export default PremiumDashboard
